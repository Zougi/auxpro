import React from 'react'
import { Row, Col, Panel, Button } from 'react-bootstrap'
// Core modules
import StoreRegistry from 'core/StoreRegistry'
import Utils from 'utils/Utils.js'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import AuxiliaryGeozoneEdit from './AuxiliaryGeozoneEdit.jsx'
import AuxiliaryMapInformation from './AuxiliaryMapInformation.jsx'
import GoogleMap from 'components-lib/Map/GoogleMap.jsx'
import APButton from 'lib/Button/ApButton.jsx'

var MARKER_TYPE = {
	HOME: 'H',
	GEOZONE: 'G',
	CUSTOMER: 'C',
	OFFER: 'O',
	SERVICE: 'S',
}

var MAP_MODES = {
	SELECT: 'SELECT',
	NONE: 'NONE'
}

class AuxiliaryMap extends AuxiliaryBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
		this.state.info = null;
		this.state.geozone = null;
		this.state.mapMode = MAP_MODES.NONE;
	}

	componentDidMount() {
		StoreRegistry.register('AUXILIARY_STORE', this, this._onStoreUpdate.bind(this));
	}

	componentWillUnmount() {
		StoreRegistry.unregister('AUXILIARY_STORE', this);
	}

	_onStoreUpdate() {
		this.setState(this._buildState());
	}

	_buildState() {
		return {
			auxiliary: this.getAuxiliary(),
			customers: this.getCustomers(),
			services: this.getServices(),
			geoZones: this.getGeoZones()
		}
	}

	onMarkerClicked(marker) {
		if (this.state.mapMode === MAP_MODES.NONE) {
			this.setState({ info: marker });
		}
	}

	onMapClicked(event) {
		this.setState({ info: null });
		if (this.state.mapMode === MAP_MODES.SELECT) {
			console.log(event);
		}
	}

	_buildCenter() {
		return {
			lattitude: Number(this.state.auxiliary.contact.address.lattitude),
			longitude: Number(this.state.auxiliary.contact.address.longitude)
		};
	}

	_buildMarkers() {
		let result = [];
		// Add map center
		let auxiliary = this.state.auxiliary;
		result.push({
			id: 'home',
			lattitude: Number(auxiliary.contact.address.lattitude),
			longitude: Number(auxiliary.contact.address.longitude),
			color: 'D9534F',
			title: 'Mon domicile',

			type: MARKER_TYPE.HOME,
			bsStyle: 'danger',
			header: 'Mon domicile',
			name: auxiliary.person.civility + ' ' + auxiliary.person.lastName + ' ' + auxiliary.person.firstName,
			address1: auxiliary.contact.address.address,
			address2: auxiliary.contact.address.postalCode + ' ' + auxiliary.contact.address.city
		})
		// Add geo zones 
		result.push(...(this.state.geoZones || []).map(function (gz, i) {
			return {
				id: 'gz' + i,
				lattitude: Number(gz.lattitude),
				longitude: Number(gz.longitude),
				title: "Zone d'intervention",
				infowindow: gz.radius ? null : '<div>' + gz.city + '</div>',

				type: MARKER_TYPE.GEOZONE,
				bsStyle: 'danger',
				header: "Zone d'intervention",
				name: gz.radius ? 'Par proximité' : 'Par ville',
				address1: gz.radius ? 'Autour de' : gz.postalCode,
				address2: gz.radius ? 'Zone de ' + (Number(gz.radius)/1000) + 'km' : gz.city
			};
		}));
		// Add customers
		result.push(...Utils.map(this.state.customers, function (c) {
			let mode = (c.type === 'intervention');
			return {
				id: c.id,
				lattitude: c.contact.address.lattitude,
				longitude: c.contact.address.longitude,
				color: mode ? '5CB85C' : '5BC0DE',
				title: c.person.civility + ' ' + c.person.lastName + ' ' + c.person.firstName,
				
				type: mode ? MARKER_TYPE.CUSTOMER : MARKER_TYPE.OFFER,
				bsStyle: mode ? 'success' : 'info',
				header: mode ? 'Client' : 'Offre en attente',
				name: c.person.civility + ' ' + c.person.lastName + ' ' + c.person.firstName,
				address1: c.contact.address.address,
				address2: c.contact.address.postalCode + ' ' + c.contact.address.city
			};
		}));
		// Add services
		result.push(...Utils.map(this.state.services, function (s) {
			return {
				id: s.id,
				lattitude: s.contact.address.lattitude,
				longitude: s.contact.address.longitude,
				color: '337AB7',
				title: s.society, 
				
				type: MARKER_TYPE.SERVICE,
				bsStyle: 'primary',
				header: 'Service',
				name: s.society,
				address1: s.contact.address.address,
				address2: s.contact.address.postalCode + ' ' + s.contact.address.city
			};
		}));
		return result;
	}

	_buildCircles() {
		let result = [];
		// Add geo zones
		let l = (this.state.geoZones || []).length;
		for (let i = 0; i < l; i++) {
			let gz = this.state.geoZones[i];
			if (gz.radius) {
				result.push({
					lattitude: Number(gz.lattitude),
					longitude: Number(gz.longitude),
					radius: parseFloat(gz.radius)
				});
			}
		}
		return result;
	}

	toMapNoneMode() {
		this.setState({ mapMode: MAP_MODES.NONE });
	}
	toMapSelectMode() {
		this.setState({ mapMode: MAP_MODES.SELECT });
	}

	initGeozone() {
		this.setState({ geozone: { postal: '' } });
	}
	resetGeozone() {
		this.setState({ geozone: null });
	}

	render() {
		return (
			<Panel header="Mes zones d'intervention">
				<Row>
					<Col xs={12}>
					{this.state.geozone ?
						<AuxiliaryGeozoneEdit/>
					:
						<APButton block
	                        bsStyle='warning'
	                        onClick={this.initGeozone.bind(this)}>
	                        Ajouter une zone
	                    </APButton>
					}
					</Col>
				</Row>
				<Row>
					<Col sm={4}>
						<AuxiliaryMapInformation info={this.state.info}/>
					</Col>
					<Col sm={8}>
						<GoogleMap 
							center={this._buildCenter()} 
							onMapClicked={this.onMapClicked.bind(this)}
							markers={this._buildMarkers()} 
							circles={this._buildCircles()}
							onMarkerClicked={this.onMarkerClicked.bind(this)} />
					</Col>
				</Row>
			</Panel>
		);
	}
}

export default AuxiliaryMap;