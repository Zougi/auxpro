import React from 'react'
import { Row, Col, Panel, Button } from 'react-bootstrap'
// Core modules
import StoreRegistry from 'core/StoreRegistry'
import Dispatcher from 'core/Dispatcher'
import Utils from 'utils/Utils.js'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import AuxiliaryGeozoneEdit from './AuxiliaryGeozoneEdit.jsx'
import AuxiliaryAddZone from './AuxiliaryAddZone.jsx'
import AuxiliaryAddCity from './AuxiliaryAddCity.jsx'
import GoogleMap from 'components-lib/Map/GoogleMap.jsx'
import APButton from 'lib/Button/APButton.jsx'
import APPanelHeaderAction from 'components-lib/Panel/APPanelHeaderAction'

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
		this.state.showServices = true;
		this.state.showOffers = true;
		this.state.showInterventions = true;
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

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
			geozones: this.getGeozones(),
			info: null
		}
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------
	
	onMarkerClicked(marker) {
		this.setState({
			info: marker,
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

	resetGeozone() {
		this.setState({ geozone: null });
	}

	onGeozoneChanged(geozone) {
		this.setState({ geozone: geozone });
	}
	onCreateGeozone(geozone) {
		this.createGeozone(geozone).
		then(function () {
			this.loadGeozones();
		}.bind(this)).
		catch(function () {
			console.log('ERROR WHILE CREATING GEOZONE')
		})
	}
	
	onChangeZonePanel(change) {
		this.setState({ 
			geozone: {
				lattitude: Number(change.lattitude),
				longitude: Number(change.longitude),
				radius: change.radius
			} 
		});
	}
	
	validZone(change) {
		this.onCreateGeozone({
			lattitude: change.lattitude,
			longitude: change.longitude,
			radius: change.radius
		});
		this.changeZoneMode();
	}
	
	getZonePanel() {
		return (
			<AuxiliaryAddZone 
				onChange={this.onChangeZonePanel.bind(this)}
				location={this.state.geozone}
				valid={this.validZone.bind(this)} />
		);
	}
	
	onChangeCirtyPanel(change) {
		this.setState({ 
			geozone: {
				lattitude: Number(change.lattitude),
				longitude: Number(change.longitude),
				postalCode: change.postalCode,
				city:  change.city
			} 
		});
	}
	
	validCity(change) {
		this.onCreateGeozone({
			lattitude: change.lattitude,
			longitude: change.longitude,
			postalCode: change.postalCode,
			city:  change.city
		});
		this.changeCityMode();
	}
	
	getCityPanel() {
		return (
			<AuxiliaryAddCity 
				onChange={this.onChangeCirtyPanel.bind(this)}
				valid={this.validCity.bind(this)} />
		);
	}
	
	deleteZone() {
		this.deleteGeozone(this.state.info.id).
		then(function () {
			this.loadGeozones();			
		}.bind(this)).
		catch(function () {
			console.log('ERROR WHILE DELETING GEOZONE')
		})
	}
	
	getInformationsPanel() {
		if (this.state.info) {
			var actions = [];
			if (this.state.info.type == "G")
				actions.push({ tooltip: 'Supprimer zone',	bsStyle: 'danger', glyph: 'remove', callback: this.deleteZone.bind(this) });
			return (			
				<APPanelHeaderAction bsStyle={this.state.info.bsStyle} title={this.state.info.header} actions={actions}>
					{this.state.info.name}
					<br/>
					{this.state.info.address1}
					<br/>
					{this.state.info.address2}
					<br/>
				</APPanelHeaderAction>
			);
		}
	}
	
	getPanel() {
		if(this.state.geoMode === GEO_MODES.CITY) {
			return this.getCityPanel();
		} else if(this.state.geoMode === GEO_MODES.ZONE) {
			return this.getZonePanel();
		} else if(this.state.geoMode === GEO_MODES.VIEW) {
			return this.getInformationsPanel();
		}
	}
	
	changeCityMode() {
		if (this.state.geoMode !== GEO_MODES.VIEW) {
			this.setState({ geozone: null });
		}
		if (this.state.geoMode === GEO_MODES.CITY) {
			this.setState({ geoMode: GEO_MODES.VIEW });
		} else {
			this.setState({ geoMode: GEO_MODES.CITY });
		}
	}
	
	changeZoneMode() {
		if (this.state.geoMode !== GEO_MODES.VIEW) {
			this.setState({ geozone: null });
		}
		if (this.state.geoMode === GEO_MODES.ZONE) {
			this.setState({ geoMode: GEO_MODES.VIEW });
		} else {
			this.setState({ geoMode: GEO_MODES.ZONE });
		}
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildCenter() {
		return {
			lattitude: Number(this.state.auxiliary.lattitude),
			longitude: Number(this.state.auxiliary.longitude)
		};
	}

	interventionFilter(customer) {
		if (customer._type === 'intervention') 
			return false;
		else 
			return true;
	}
	
	offerFilter(customer) {
		if (customer._type === 'offer') 
			return false;
		else 
			return true;
	}
	
	_buildMarkers() {
		let result = [];
		// Add map center
		let auxiliary = this.state.auxiliary;
		result.push({
			id: 'home',
			lattitude: Number(auxiliary.lattitude),
			longitude: Number(auxiliary.longitude),
			color: 'D9534F',
			title: 'Mon domicile',

			type: MARKER_TYPE.HOME,
			bsStyle: 'danger',
			header: 'Mon domicile',
			name: auxiliary.civility + ' ' + auxiliary.lastName + ' ' + auxiliary.firstName,
			address1: auxiliary.address,
			address2: auxiliary.postalCode + ' ' + auxiliary.city,
			onClick: this.onMarkerClicked.bind(this)
		})
		// Add geo zones 
		result.push(...Utils.map(this.state.geozones, function (gz) {
			return {
				id: gz.id,
				lattitude: Number(gz.lattitude),
				longitude: Number(gz.longitude),
				title: "Zone d'intervention",
				infowindow: gz.radius ? null : '<div>' + gz.postalCode + ' ' + gz.city + '</div>',

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
		let customers = this.state.customers;
		if (!this.state.showInterventions)
			customers = Utils.filter(customers || [],  this.interventionFilter);
		if (!this.state.showOffers)
			customers = Utils.filter(customers || [],  this.offerFilter);
		result.push(...Utils.map(customers, function (c) {
			let mode = (c._type === 'intervention');
			return {
				id: c.id,
				lattitude: c.lattitude,
				longitude: c.longitude,
				color: mode ? '5CB85C' : '5BC0DE',
				title: c.civility + ' ' + c.lastName + ' ' + c.firstName,
				
				type: mode ? MARKER_TYPE.CUSTOMER : MARKER_TYPE.OFFER,
				bsStyle: mode ? 'success' : 'info',
				header: mode ? 'Client' : 'Offre en attente',
				name: c.civility + ' ' + c.lastName + ' ' + c.firstName,
				address1: c.address,
				address2: c.postalCode + ' ' + c.city,
				onClick: this.onMarkerClicked.bind(this)
			};
		}.bind(this)));
		// Add services
		if (this.state.showServices)
			result.push(...Utils.map(this.state.services, function (s) {
				return {
					id: s.id,
					lattitude: s.lattitude,
					longitude: s.longitude,
					color: '337AB7',
					title: s.socialReason, 
					
					type: MARKER_TYPE.SERVICE,
					bsStyle: 'primary',
					header: 'Service',
					name: s.socialReason,
					address1: s.address,
					address2: s.postalCode + ' ' + s.city,
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
		
		result.push(...Utils.map(this.state.geozones, function (gz) {
			return {
				id: gz.id,
				lattitude: Number(gz.lattitude),
				longitude: Number(gz.longitude),
				radius: parseFloat(gz.radius)
			};
		}.bind(this)));
		
		if (this.state.geozone)
			this._buildCircle(this.state.geozone, result, "current");
		return result;	
	}

	hideService(event) {
		this.setState({showServices: !event.target.checked})
	}
	
	hideOffers(event) {
		this.setState({showOffers: !event.target.checked})
	}
	
	hideInterventions(event) {
		this.setState({showInterventions: !event.target.checked})
	}
	
	showAllServices(event) {
		if (event.target.checked)
			this.loadAllServices()
		else
			this.loadServices()
	}
	
	getAddButtons() {
		if (Object.keys(this.state.geozones).length >= 3)
			return (
				<Col xs={4}>
					<div>Maximum 3 Zones</div>
				</Col>
			);
		else
			return (	
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
			);
	}
	
	render() {
		return (
			<Panel header="Mes zones d'intervention">
				<Row>
					<Col sm={3}>
						<div className="checkbox">
							<label><input type="checkbox" value="" onClick={this.hideService.bind(this)} />Masquer Services</label>
						</div>
					</Col>
					<Col sm={3}>
						<div className="checkbox">
							<label><input type="checkbox" value="" onClick={this.hideOffers.bind(this)} />Masquer Offres</label>
						</div>
					</Col>
					<Col sm={3}>
						<div className="checkbox">
							<label><input type="checkbox" value="" onClick={this.hideInterventions.bind(this)} />Masquer Interventions</label>
						</div>
					</Col>
					<Col sm={3}>
						<div className="checkbox">
							<label><input type="checkbox" value="" onClick={this.showAllServices.bind(this)} />Afficher tous les Services</label>
						</div>
					</Col>
				</Row>
				<Row>
					{this.getAddButtons()}
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