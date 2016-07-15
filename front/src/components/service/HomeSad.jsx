// react modules
import React from 'react';
// react-bootstrap modules
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal, Button } from 'react-bootstrap'
// core modules
import Dispatcher from '../../core/Dispatcher';
import StoreRegistry from '../../core/StoreRegistry';
// custom components
import HomeSadHead from './HomeSadHead.jsx'
import ServicesTuto from './ServicesTuto.jsx'
import ServiceProfile from './profile/ServiceProfile.jsx'
import ServiceCustomers from './customers/ServiceCustomers.jsx'
import ServiceInterventions from './interventions/ServiceInterventions.jsx'
import ServicesMap from './map/ServicesMap.jsx'

class HomeSad extends React.Component {

	constructor(props) {
		super(props);
		this.user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		this.state = {
			user: this.user,
			showTuto: !this.user.tutoSkipped,
			showProfilePrompt: false,
			data: StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + user.id)
		};
		console.log(JSON.stringify(this.state));
	}

	componentDidMount() {
        StoreRegistry.register('SERVICE_STORE', this, this.onStoreUpdate.bind(this));
    	
    	let args = {
    		serviceId: this.user.id,
			token: this.user.token
    	}

        Dispatcher.issue('GET_SERVICE', args).
        then(function() {
        	return Dispatcher.issue('GET_SERVICE_CUSTOMERS', args);
        }).
        then(function() {
        	return Dispatcher.issue('GET_SERVICE_INTERVENTIONS', args);
        }).
        then(function() {
        	return Dispatcher.issue('GET_SERVICE_OFFERS', args);
        }).
        then(function() {
        	console.log(StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + StoreRegistry.getStore('LOGIN_STORE').getData('/id')));
        }).
        catch(function() {
        	console.log('erreur au chargement du service');
        });
    }
    componentWillUnmount() {
        StoreRegistry.unregister('SERVICE_STORE', this);   
    }
	
    onStoreUpdate(first) {
    	let data = StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + this.user.id);
    	this.state = {
			user: this.user,
			data: data,
			showTuto: first?!this.user.tutoSkipped:this.state.showTuto,
			showProfilePrompt: first?true:this.state.showProfilePrompt
		};
		this.setState(this.state);
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
					<ServicesTuto onClose={this._tutoClose.bind(this)} onNeverShow={this._tutoSkip.bind(this)}/>
					<br/>
				</div>
			);
		}
		return(
			<div className='container'>
				<br/>
				<Grid>
					<Row>
						<HomeSadHead sad={this.state.service}/>
					</Row>
					<Row>
					{ this.state.data ? 
						<Tabs defaultActiveKey={this.props.defaultTab || 0} id="sadTabs">
							<Tab eventKey={0} title="Mes Informations">
								<br/><ServiceProfile service={this.state.data.service}/>
							</Tab>
							<Tab eventKey={1} title="Ma Zone">
								<br/><ServicesMap/>
							</Tab>							
							<Tab eventKey={2} title="Mes Clients">
								<br/><ServiceCustomers customers={this.state.data.customers}/>
							</Tab>
							<Tab eventKey={3} title="Mes Interventions">
								<br/><ServiceInterventions 
										customers={this.state.data.customers} 
										interventions={this.state.data.interventions}
										offers={this.state.data.offers} />
							</Tab>
						</Tabs>
					:
						''
					}
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

HomeSad.contextTypes = {
	router: React.PropTypes.object
}

export default HomeSad;
