// react modules
import React from 'react';
// react-bootstrap modules
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal, Button } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// custom components
import AuxiliaryMap from './map/AuxiliaryMap.jsx'
import AuxiliaryPlaning from './planing/AuxiliaryPlaning.jsx'
import AuxiliaryHeader from './AuxiliaryHeader.jsx'
import AuxiliaryOffers from './offers/AuxiliaryOffers.jsx'
import AuxiliaryProfile from './profile/AuxiliaryProfile.jsx'
import AuxiliaryTuto from './AuxiliaryTuto.jsx'

class AuxiliaryHome extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: StoreRegistry.getStore('AUXILIARY_STORE').getData('/auxiliary/' + StoreRegistry.getStore('LOGIN_STORE').getData('/id')),
			showTuto: !StoreRegistry.getStore('LOGIN_STORE').getData('/tutoSkipped'),
			showProfilePrompt: false
		};
		
		this.content = {
			infos: this.getInfos.bind(this),
			planning: this.getPlanning.bind(this),
			zone: this.getZone.bind(this),
			offres: this.getOffers.bind(this)
			
		}
	}

	componentDidMount() {
	 	StoreRegistry.register('AUXILIARY_STORE', this, this.onStoreUpdate.bind(this));
    }
    
    componentWillUnmount() {
        StoreRegistry.unregister('AUXILIARY_STORE', this);   
    }
	
	onStoreUpdate(first) {
		this.setState({ data: StoreRegistry.getStore('AUXILIARY_STORE').getData('/auxiliary/' + StoreRegistry.getStore('LOGIN_STORE').getData('/id')) });
		console.log(this.state.data);
    }
	
	// data : {lattitude: "48.862919", longitude: "2.292004", radius: "500"}
	sendGeoZone(geoZone){
		let params = { 
			id: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
			token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
			data : geoZone
		};
		Dispatcher.issue('POST_AUXILIARY_GEOZONE', params);
	}
	
	deleteGeoZone(geoZone) {
		let params = { 
			id: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
			token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
			data : geoZone
		};
		Dispatcher.issue('DELETE_AUXILIARY_GEOZONE', params);
	}	

    _tutoClose() {
    	this.setState({ showTuto: false });
    }
    _tutoSkip() {
    	this.setState({ showTuto: false });
    }
    _profilePromptClose() {
    	this.setState({ showProfilePrompt: false });
    }

	getNavBar() {
		return (
			<Row>
				<Col sm={3} md={3} lg={3}>
					<LinkContainer to="/home/infos">
						<p>Info</p>
					</LinkContainer>
				</Col>
				<Col sm={3} md={3} lg={3}>
					<LinkContainer to="/home/planning">
						<p>planning</p>
					</LinkContainer>
				</Col>
				<Col sm={3} md={3} lg={3}>
					<LinkContainer to="/home/zone">
						<p>zone</p>
					</LinkContainer>
				</Col>
				<Col sm={3} md={3} lg={3}>
					<LinkContainer to="/home/offres">
						<p>offre</p>
					</LinkContainer>
				</Col>
			</Row>	
		);
	}

	getContent(nav) {
		if (nav) {
			return (this.content[nav]());
		}
	}
	
	getInfos() {
		return (
			<AuxiliaryProfile auxiliary={this.state.data.auxiliary || {}}/>
		);
	}
	
	getPlanning() {
		return (
			<AuxiliaryPlaning 
				auxiliary={this.state.data.auxiliary}
				customers={this.state.data.customers}
				indisponibilities={this.state.data.indisponibilities}
				interventions={this.state.data.interventions}
				offers={this.state.data.offers}
				services={this.state.data.services} />
		);
	}
	
	getZone() {
		return (
			<AuxiliaryMap 
				auxiliary={this.state.data.auxiliary}
				offers={this.state.data.offers}
				interventions={this.state.data.interventions}
				customers={this.state.data.customers}
				geoZones={this.state.data.geoZones} 
				sendGeoZone={this.sendGeoZone.bind(this)} 
				deleteGeoZone={this.deleteGeoZone.bind(this)}/>
		);
	}
	
	getOffers() {
		return (
			<AuxiliaryOffers
				auxiliary={this.state.data.auxiliary}
				customers={this.state.data.customers}
				interventions={this.state.data.interventions}
				offers={this.state.data.offers}
				services={this.state.data.services} />
		);
	}
	
	render() { 
		if (this.state.showTuto) {
			return(
				<div className='container'>
					<br/>
					<AuxiliaryTuto onClose={this._tutoClose.bind(this)} onNeverShow={this._tutoSkip.bind(this)}/>
					<br/>
				</div>
			);
		}
		return(
			<div className='container'>
				{this.getNavBar()}
				<Row>
					{this.getContent(this.props.nav)}
				</Row>
				<br/>
				<Modal show={this.state.showProfilePrompt}>
					<Modal.Header>
						<Modal.Title>Completez votre profil</Modal.Title>
					</Modal.Header>
					<Modal.Footer>
						<Button className='btn btn-success' onClick={this._profilePromptClose.bind(this)}>Continuer</Button>
						<Button className='btn btn-primary' onClick={this._profilePromptClose.bind(this)}>Pas Maintenant</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

/*

							
					
*/

export default AuxiliaryHome;



// <Tabs defaultActiveKey={this.props.defaultTab || 0} id="auxTabs">
// <Tab eventKey={0} title="Mon Planning"><br/>
	// <AuxiliaryPlaning 
		// customers={this.state.data.customers}
		// indisponibilities={this.state.data.indisponibilities}
		// interventions={this.state.data.interventions}
		// offers={this.state.data.offers}
		// services={this.state.data.services} />
// </Tab>
// <Tab eventKey={1} title="Ma Zone"><br/>
	// <AuxiliaryMap 
		// geoZones={this.state.data.geoZones} 
		// sendGeoZone={this.sendGeoZone.bind(this)} 
		// deleteGeoZone={this.deleteGeoZone.bind(this)}/>
// </Tab>
// <Tab eventKey={2} title="Mes Informations"><br/>
	// <AuxiliaryProfile 
		// auxiliary={this.state.data.auxiliary || {}}/>
// </Tab>							
// <Tab eventKey={3} title="Mes Offres"><br/>
	// <AuxiliaryOffers
		// customers={this.state.data.customers}
		// interventions={this.state.data.interventions}
		// offers={this.state.data.offers}
		// services={this.state.data.services} />
// </Tab>
// </Tabs>
