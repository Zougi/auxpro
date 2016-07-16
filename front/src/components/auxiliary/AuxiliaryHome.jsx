// react modules
import React from 'react';
// react-bootstrap modules
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal, Button } from 'react-bootstrap'
// core modules
import Dispatcher from '../../core/Dispatcher';
import StoreRegistry from '../../core/StoreRegistry';
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
		this.user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		this.state = {
			user: this.user,
			data: StoreRegistry.getStore('AUXILIARY_STORE').getData('/auxiliary/' + this.user.id),
			showTuto: !this.user.tutoSkipped,
			showProfilePrompt: false
		};
	}

	componentDidMount() {
        let args = {
    		auxiliaryId: this.user.id,
			token: this.user.token
    	}

 		Dispatcher.issue('GET_AUXILIARY', args).
        then(function() {
        	var promises = []
        	promises.push(Dispatcher.issue('GET_AUXILIARY_GEOZONES', args));
        	promises.push(Dispatcher.issue('GET_AUXILIARY_CUSTOMERS', args));
        	return Promise.all(promises);
        }).
        then(function() {
        	return Dispatcher.issue('GET_AUXILIARY_INTERVENTIONS', args);
        }).
        then(function() {
        	return Dispatcher.issue('GET_AUXILIARY_OFFERS', args);
        }).
        then(function() {
        	StoreRegistry.register('AUXILIARY_STORE', this, this.onStoreUpdate.bind(this));
			StoreRegistry.register('AUXILIARY_STORE/auxiliary/geoZones', this, this.onAuxiliaryGeoZonesUpdate.bind(this));
			this.onStoreUpdate();
        	console.log(StoreRegistry.getStore('SERVICE_STORE').getData('/auxiliary/' + StoreRegistry.getStore('LOGIN_STORE').getData('/id')));
        }.bind(this)).
        catch(function() {
        	console.log('erreur au chargement du service');
        });	
    }
    
    componentWillUnmount() {
        StoreRegistry.unregister('AUXILIARY_STORE', this);   
    }
	
	onStoreUpdate(first) {
    	let data = StoreRegistry.getStore('AUXILIARY_STORE').getData('/auxiliary/' + this.user.id);
		this.setState({
			user: this.user,
			data: data,
			showTuto: first?!this.user.tutoSkipped:this.state.showTuto,
			showProfilePrompt: first?true:this.state.showProfilePrompt
		});
    }
	
	onAuxiliaryGeoZonesUpdate() {
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		let data = StoreRegistry.getStore('AUXILIARY_STORE').getData('/auxiliary/' + user.id);
		this.setState({data: data});
    }
	
	// data : {lattitude: "48.862919", longitude: "2.292004", radius: "500"}
	sendGeoZone(geoZone){
		let params = { 
			id: this.state.user.id,
			token: this.state.user.token,
			data : geoZone
		};
		Dispatcher.issue('POST_AUXILIARY_GEOZONE', params);
	}
	
	deleteGeoZone(geoZone) {
		let params = { 
			id: this.state.user.id,
			token: this.state.user.token,
			data : geoZone
		};
		Dispatcher.issue('DELETE_AUXILIARY_GEOZONE', params);
	}	

    _tutoClose() {
    	this.state.showTuto = false;
    	this.setState(this.state);
    }
    _tutoSkip() {
    	this.state.showTuto = false;
    	this.setState(this.state);
    }
    _profilePromptClose() {
    	this.state.showProfilePrompt = false;
    	this.setState(this.state);
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
				<br/>
				<Grid>
					<Row>
						<AuxiliaryHeader data={this.state.data}/>
					</Row>
					<Row>
						<Tabs defaultActiveKey={this.props.defaultTab || 0} id="auxTabs">
							<Tab eventKey={0} title="Mon Planning"><br/>
								<AuxiliaryPlaning 
									user={this.state.user} 
									data={this.state.data}/>
							</Tab>
							<Tab eventKey={1} title="Ma Zone"><br/>
								<AuxiliaryMap 
									user={this.state.user} 
									geoZones={this.state.data.geoZones} 
									sendGeoZone={this.sendGeoZone.bind(this)} 
									deleteGeoZone={this.deleteGeoZone.bind(this)}/>
							</Tab>
							<Tab eventKey={2} title="Mes Informations"><br/>
								<AuxiliaryProfile 
									data={this.state.data}/>
							</Tab>
							<Tab eventKey={3} title="Les Offres"><br/>
								<AuxiliaryOffers 
									interventions={this.state.data.interventions}
									offers={this.state.data.offers}/>
							</Tab>
						</Tabs>
					</Row>
				</Grid>
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

export default AuxiliaryHome;
