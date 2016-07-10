// lib modules
import React from 'react';
import { Panel, Button, Row, Col, Modal } from 'react-bootstrap';
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';
// custom components
import CustomerDetails from '../../common/customers/CustomerDetails.jsx';
import InterventionCreate from '../../common/interventions/InterventionCreate.jsx';
import CustomerInterventionList from '../../common/customers/CustomerInterventionList.jsx';
import DialogConfirmation from '../../common/dialog/DialogConfirmation.jsx';

let STATES = {
	LIST: 'LIST',
	ADD: 'ADD',
	VIEW: 'VIEW',
	EDIT: 'EDIT'
}

class ServiceInterventions extends React.Component {
	
	constructor(props) {
		super(props);
		this.prepareState();
		var args = {
			sId: this.state.user.id,
			token: this.state.user.token
		}
		Dispatcher.issue('GET_SERVICE_CUSTOMERS', args).
		then(function () {
			Dispatcher.issue('GET_SERVICE_INTERVENTIONS', args);	
		}).
		catch(function () {
			console.log('erreur chargement données');
		});        
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

    onCreateIntervention(data) {
    	console.log(data.intervention);
        let args = {
            sId: data.intervention.serviceId,
            cId: data.intervention.customerId,
            token: this.state.user.token,
            data: data.intervention
        }
        Dispatcher.issue('POST_SERVICE_CUSTOMER_INTERVENTION', args).
        then(function () {
            Dispatcher.issue('GET_SERVICE_INTERVENTIONS', args);    
        }).
        then(function() {
            this.switchState(STATES.LIST)();
        }.bind(this)).
        catch(function(error) {
            console.log(error);
        });     
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
		let customers = (this.state.data.customers || []).
		filter(function(customer) {
			return this.state.data.interventions && this.state.data.interventions[customer.id] && this.state.data.interventions[customer.id].length;
		}.bind(this)).
		map(function(customer) {
			return (
				<CustomerInterventionList key={customer.id} customer={customer} interventions={this.state.data.interventions[customer.id]}/>
			);
		}.bind(this));
		switch (this.state.state) {
            case STATES.ADD:
                return (
                    <InterventionCreate onCancel={this.onCancel.bind(this)} onCreate={this.onCreateIntervention.bind(this)}/>
                );
            default:
        		return (
        			<div>
        				<Panel header={(<strong>Interventions en cours</strong>)}>
        					<Button block bsStyle='info' onClick={this.switchState(STATES.ADD)}>Saisir nouvelle intervention</Button>
        					<br/>
        					{customers}
        				</Panel>				
        			</div>
        		);
        }
	}
}

export default ServiceInterventions;