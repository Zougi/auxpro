import React from 'react'
import { Row, Col, Panel, Button } from 'react-bootstrap'
// Core modules
import StoreRegistry from 'core/StoreRegistry'
import Utils from 'utils/Utils.js'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import AuxiliaryGeozoneEdit from './AuxiliaryGeozoneEdit.jsx'
import AuxiliaryAddZone from './AuxiliaryAddZone.jsx'
import GoogleMap from 'components-lib/Map/GoogleMap.jsx'
import APButton from 'lib/Button/ApButton.jsx'

var MARKER_TYPE = {
	HOME: 'H',
	GEOZONE: 'G',
	CUSTOMER: 'C',
	OFFER: 'O',
	SERVICE: 'S',
}

var GEO_MODES = {
	VIEW: 'VIEW',
	ZONE: 'ZONE',
	CITY: 'CITY'
}

class AuxiliaryMap extends AuxiliaryBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
		this.state.info = null;
		this.state.geozone = null;
		this.state.geoMode = GEO_MODES.VIEW;
	}

	componentDidMount() {
		StoreRegistry.register('AUXILIARY_STORE/data', this, this._onStoreUpdate.bind(this));
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

	_buildCenter() {
		return {
			lattitude: Number(this.state.auxiliary.contact.address.lattitude),
			longitude: Number(this.state.auxiliary.contact.address.longitude)
		};
	}
	
	onMarkerClicked(marker) {
		this.setState({ 	info: marker,
								geoMode: GEO_MODES.VIEW
							});
	}

	onMapClicked(event) {
		if (this.state.geoMode == GEO_MODES.ZONE) {
			this.setState({ 
				geozone: {
					lattitude: Number(event.lattitude),
					longitude: Number(event.longitude)
				}	 
			});
		}
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
			address2: auxiliary.contact.address.postalCode + ' ' + auxiliary.contact.address.city,
			onClick: this.onMarkerClicked.bind(this)
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
				address2: gz.radius ? 'Zone de ' + (Number(gz.radius)/1000) + 'km' : gz.city,
				onClick: this.onMarkerClicked.bind(this)
			};
		}.bind(this)));
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
				address2: c.contact.address.postalCode + ' ' + c.contact.address.city,
				onClick: this.onMarkerClicked.bind(this)
			};
		}.bind(this)));
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
				address2: s.contact.address.postalCode + ' ' + s.contact.address.city,
				onClick: this.onMarkerClicked.bind(this)
			};
		}.bind(this)));
		// Add temporary marker
		if (this.state.geozone) {
			result.push({
				id: 'temp',
				lattitude: Number(this.state.geozone.lattitude),
				longitude: Number(this.state.geozone.longitude),
				title: 'Nouvelle zone',
				onClick: this.onMarkerClicked.bind(this)
			});
		}
		console.log(result);
		return result;
	}

	_buildCircle(geozone, result, id) {
		if (geozone.radius && geozone.radius  != 0) {
			result.push({
				id: 'gz' + id,
				lattitude: Number(geozone.lattitude),
				longitude: Number(geozone.longitude),
				radius: parseFloat(geozone.radius)
			});
		}
	}
	
	_buildCircles() {
		let result = [];
		// Add geo zones
		let l = (this.state.geoZones || []).length;
		for (let i = 0; i < l; i++) {
			let gz = this.state.geoZones[i];
			this._buildCircle(gz, result, i);
		}
		if (this.state.geozone)
			this._buildCircle(this.state.geozone, result, "current");
		return result;	
	}

	resetGeozone() {
		this.setState({ geozone: null });
	}

	onGeozoneChanged(geozone) {
		this.setState({ geozone: geozone });
	}
	onCreateGeozone(geozone) {
		this.createGeozone(geozone).
		then(function () {
			this.resetGeozone();
		}.bind(this)).
		catch(function () {
			console.log('ERROR WHILE CREATING GEOZONE')
		})
	}
	
	onChangeZonePanel(change) {
		this.setState({ 
			geozone: {
				lattitude: Number(change.address.lattitude),
				longitude: Number(change.address.longitude),
				radius: change.radius
			} 
		});
	}
	
	validZone(change) {
		console.log(change)
		this.createGeozone({
			lattitude: change.address.lattitude,
			longitude: change.address.lattitude,
			radius: change.radius
		});
	}
	
	getZonePanel() {
		return (
			<AuxiliaryAddZone 
			onChange={this.onChangeZonePanel.bind(this)}
			defaultLocation={this.state.geozone}
			valid={this.validZone.bind(this)} />
		);
	}
	
	getCityPanel() {
		return (
			<AuxiliaryGeozoneEdit
				geozone={this.state.geozone}
				onLiveChange={this.onGeozoneChanged.bind(this)}
				onCreate={this.onCreateGeozone.bind(this)}
				onCancel={this.resetGeozone.bind(this)}/>
		);
	}
	
	getInformationsPanel() {		
		if (this.state.info) {
			 return (
				<Panel bsStyle={this.state.info.bsStyle} header={this.state.info.header}>
					{this.state.info.name}
					<br/>
					{this.state.info.address1}
					<br/>
					{this.state.info.address2}
					<br/>
				</Panel>
			);
		}
	}
	
	getPanel() {
		if(this.state.geoMode == GEO_MODES.CITY) {
			return this.getCityPanel();
		} else if(this.state.geoMode == GEO_MODES.ZONE) {
			return this.getZonePanel();
		} else if(this.state.geoMode == GEO_MODES.VIEW) {
			return this.getInformationsPanel();
		}
	}
	
	changeCityMode() {
		if (this.state.geoMode != GEO_MODES.VIEW)
			this.setState({ geozone: null });
		if (this.state.geoMode == GEO_MODES.CITY)
			this.setState({ geoMode: GEO_MODES.VIEW });
		else
			this.setState({ geoMode: GEO_MODES.CITY });
	}
	
	changeZoneMode() {
		if (this.state.geoMode != GEO_MODES.VIEW)
			this.setState({ geozone: null });
		if (this.state.geoMode == GEO_MODES.ZONE)
			this.setState({ geoMode: GEO_MODES.VIEW });
		else
			this.setState({ geoMode: GEO_MODES.ZONE });
	}
	
	render() {
		return (
			<Panel header="Mes zones d'intervention">
				<Row>
					<Col xs={4}>
					<APButton block
						bsStyle='warning'
						onClick={this.changeZoneMode.bind(this)}>
						Ajouter une zone
					</APButton>
					<APButton block
						bsStyle='warning'
						onClick={this.changeCityMode.bind(this)}>
						Ajouter une ville
					</APButton>
					</Col>
					<Col sm={8}>
						{this.getPanel()}
					</Col>
				</Row>
				<Row>
					<Col sm={12}>
						<GoogleMap 
							center={this._buildCenter()} 
							onMapClicked={this.onMapClicked.bind(this)}
							markers={this._buildMarkers()} 
							circles={this._buildCircles()} />
					</Col>
				</Row>
			</Panel>
		);
	}
}

export default AuxiliaryMap;