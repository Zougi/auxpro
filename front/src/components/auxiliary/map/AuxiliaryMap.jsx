import React from 'react'
import { Row, Col, Panel, Button } from 'react-bootstrap'
// Core modules
import StoreRegistry from 'core/StoreRegistry'
import Utils from 'utils/Utils.js'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import AuxiliaryGeoPanel from './AuxiliaryGeoPanel.jsx'
import AuxiliaryMapInformation from './AuxiliaryMapInformation.jsx'
import GoogleMap from 'components-lib/Map/GoogleMap.jsx'

var MARKER_TYPE = {
	HOME: 'H',
	GEOZONE: 'G',
	CUSTOMER: 'C',
	OFFER: 'O',
	SERVICE: 'S',
}

var MODES = {
	SELECT: 'SELECT',
	NONE: 'NONE'
}

class AuxiliaryMap extends AuxiliaryBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
		this.state.info = null;
		this.state.mode = MODES.NONE;
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
		if (this.state.mode === MODES.NONE) {
			this.setState({ info: marker });
		}
	}

	onMapClicked(event) {
		if (this.state.mode === MODES.SELECT) {
			console.log(event);
		} else {
			this.setState({ info: null });
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

	
	switchMode() {
		if (this.state.mode === MODES.NONE) {
			this.setState({ mode: MODES.SELECT });
		} else {
			this.setState({ mode: MODES.NONE });
		}
	}

	render() {
		return (
			<div>
				<br/>
				<Col sm={4}>
					<AuxiliaryGeoPanel onToggleSelect={this.switchMode.bind(this)}/>
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
			</div>
		);
	}
}

export default AuxiliaryMap;