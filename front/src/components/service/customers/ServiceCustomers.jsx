// lib modules
import React from 'react';
import { Panel, Button, ListGroup, ListGroupItem, Row, Col, Modal } from 'react-bootstrap';
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';
// custom components
import CustomerDetails from '../../common/customers/CustomerDetails.jsx';
import CustomerSummaryList from '../../common/customers/CustomerSummaryList.jsx';
import DialogConfirmation from '../../common/dialog/DialogConfirmation.jsx';

let STATES = {
	LIST: 'LIST',
	ADD: 'ADD',
	VIEW: 'VIEW',
	EDIT: 'EDIT'
}

class ServiceCustomers extends React.Component {
	
	constructor(props) {
		super(props);
		this.prepareState();
		var args = {
			sId: this.state.user.id,
			token: this.state.user.token
		}
        Dispatcher.issue('GET_SERVICE_CUSTOMERS', args);
	}

	componentDidMount() {
		this.switchState()();
        StoreRegistry.register('SERVICE_STORE', this, this.onServiceUpdate.bind(this));
    }
    componentWillUnmount() {
        StoreRegistry.unregister('SERVICE_STORE', this);   
    }

    onServiceUpdate() {
    	this.setState(this.prepareState());
    }

    switchState(state) {
    	return function() {
			this.state.state = state || STATES.LIST;
			this.setState(this.state);
		}.bind(this);
    }

    prepareState() {
    	let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
    	let data = StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + user.id);
    	this.state = {
			user: user,
			data: data,
			showDeleteConfirm: false
		};
		return this.state;
    }

	customerChanged(cust) {
		this.state.currentCustomer = cust;
	}

    onCancel() {
    	this.state.currentCustomer = null;
    	this.switchState()();
    }

    onEditCustomer(customer) {
    	this.state.currentCustomer = customer;
    	this.switchState(STATES.EDIT)();
    }
    onViewCustomer(customer) {
    	this.state.currentCustomer = customer;
    	this.switchState(STATES.VIEW)();
    }
    onDeleteCustomer(customer) {
    	this.state.currentCustomer = customer;
    	this.state.showDeleteConfirm = true;
    	this.setState(this.state);
    }

    hideDeleteConfirmation() {
    	this.state.showDeleteConfirm = false;
    	this.setState(this.state);
    }
    
    deleteCustomer() {
    	this.hideDeleteConfirmation();
    	let args = {
    		sId: this.state.user.id,
    		cId: this.state.currentCustomer.id,
			token: this.state.user.token
    	}
    	Dispatcher.issue('DELETE_SERVICE_CUSTOMER', args).
    	then(function () {
    		Dispatcher.issue('GET_SERVICE_CUSTOMERS', args);	
    	}).
    	then(function() {
    		this.switchState(STATES.LIST)();
    	}.bind(this)).
    	catch(function(error) {
    		console.log(error);
    	});    	
    }
    editCustomer() {
    	this.state.currentCustomer.serviceId = this.state.user.id;
    	let args = {
    		sId: this.state.user.id,
    		data: this.state.currentCustomer,
			token: this.state.user.token
    	}
    	Dispatcher.issue('PUT_SERVICE_CUSTOMER', args).
    	then(function () {
    		Dispatcher.issue('GET_SERVICE_CUSTOMERS', args);	
    	}).
    	then(function() {
    		this.switchState(STATES.LIST)();
    	}.bind(this)).
    	catch(function(error) {
    		console.log(error);
    	});
    }
    saveCustomer() {
    	this.state.currentCustomer.serviceId = this.state.user.id;
    	let args = {
    		sId: this.state.user.id,
    		data: this.state.currentCustomer,
			token: this.state.user.token
    	}
    	Dispatcher.issue('POST_SERVICE_CUSTOMER', args).
    	then(function () {
    		Dispatcher.issue('GET_SERVICE_CUSTOMERS', args);	
    	}).
    	then(function() {
    		this.switchState(STATES.LIST)();
    	}.bind(this)).
    	catch(function(error) {
    		console.log(error);
    	});    	
    }

	render() {
		switch (this.state.state) {
			case STATES.ADD: return (
				<Panel header={(<strong>Saisir nouveau client</strong>)}>
					<CustomerDetails edit={true} onChange={this.customerChanged.bind(this)}/>
					<br/>
					<Row>
						<Col sm={6}>
							<Button bsStyle='primary' onClick={this.onCancel.bind(this)} block>Annuler</Button>
						</Col>
						<br className='hidden-sm hidden-md hidden-lg'/>
						<Col sm={6}>
							<Button bsStyle='success' onClick={this.saveCustomer.bind(this)} block>Créer client</Button>
						</Col>
					</Row>
				</Panel>
			);
			case STATES.VIEW: return (
				<Panel header={(<strong>Détails client</strong>)}>
					<CustomerDetails edit={false} data={this.state.currentCustomer}/>
					<br/>
					<Row>
						<Col lg={12}>
							<Button bsStyle='primary' onClick={this.onCancel.bind(this)} block>Retour</Button>
						</Col>
					</Row>
				</Panel>
			);
			case STATES.EDIT: return (
				<Panel header={(<strong>Saisir nouveau client</strong>)}>
					<CustomerDetails edit={true} data={this.state.currentCustomer} onChange={this.customerChanged.bind(this)}/>
					<br/>
					<Row>
						<Col sm={6}>
							<Button bsStyle='primary' onClick={this.onCancel.bind(this)} block>Annuler</Button>
						</Col>
						<br className='hidden-sm hidden-md hidden-lg'/>
						<Col sm={6}>
							<Button bsStyle='success' onClick={this.editCustomer.bind(this)} block>Enregistrer modifications</Button>
						</Col>
					</Row>
				</Panel>
			);
			default: 
				return (
					<div>
						<Panel header={(<strong>Clients enregistrés</strong>)}>
							<Button block bsStyle='info' onClick={this.switchState(STATES.ADD)}>Saisir nouveau client</Button>
							<br/>
							<CustomerSummaryList 
								customers={this.state.data.customers} 
								onEdit={this.onEditCustomer.bind(this)}
								onView={this.onViewCustomer.bind(this)}
								onDelete={this.onDeleteCustomer.bind(this)}/>
						</Panel>
						<Modal show={this.state.showDeleteConfirm}>
							<Modal.Header>
								<Modal.Title>Supprimer client ?</Modal.Title>
							</Modal.Header>
							<Modal.Footer>
								<Button bsStyle='danger' onClick={this.deleteCustomer.bind(this)}>Supprimer</Button>
								<Button className='default' onClick={this.hideDeleteConfirmation.bind(this)}>Annuler</Button>
							</Modal.Footer>
						</Modal>
					</div>
				);
		}
	}
}

export default ServiceCustomers;