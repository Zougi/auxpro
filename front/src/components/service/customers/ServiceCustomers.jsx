// lib modules
import React from 'react';
import { Panel, Button, Row, Col, Modal } from 'react-bootstrap';
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';
// custom components
import CustomerDetails from '../../common/customers/CustomerDetails.jsx';
import CustomerSummaryList from '../../common/customers/CustomerSummaryList.jsx';
import DialogConfirmation from '../../common/dialog/DialogConfirmation.jsx';
import ButtonsEndDialog from '../../common/ButtonsEndDialog.jsx';

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
    	this._issueCustomerAction('DELETE_SERVICE_CUSTOMER');
    }
    editCustomer() {
    	this._issueCustomerAction('PUT_SERVICE_CUSTOMER');
    }
    saveCustomer() {
    	this._issueCustomerAction('POST_SERVICE_CUSTOMER');
    }

    _issueCustomerAction(action) {
    	this.state.currentCustomer.serviceId = this.state.user.id;
    	let args = {
    		sId: this.state.user.id,
    		cId: this.state.currentCustomer.id,
			token: this.state.user.token,
			data: this.state.currentCustomer
    	}
    	Dispatcher.issue(action, args).
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
					<ButtonsEndDialog 
						onOk={this.saveCustomer.bind(this)} okTitle='Creer client' 
						onCancel={this.onCancel.bind(this)} cancelTitle='Annuler'/>
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
					<ButtonsEndDialog 
						onOk={this.editCustomer.bind(this)} okTitle='Enregistrer modifications' 
						onCancel={this.onCancel.bind(this)} cancelTitle='Annuler'/>
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
						<DialogConfirmation
							show={this.state.showDeleteConfirm}
							title='Supprimer client ?'
							onConfirm={this.deleteCustomer.bind(this)}
							confirmStyle='danger'
							confirmText='Supprimer'
							onCancel={this.hideDeleteConfirmation.bind(this)}
							cancelStyle='default'
							cancelText='Annuler'/>
						
					</div>
				);
		}
	}
}

export default ServiceCustomers;