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
        this.state = {};
    }

    onCancel() {
        this.setState({ intervention: null });
        this.setState({ state: STATES.LIST });
    }   
    onViewIntervention(intervention) {
        this.setState({ intervention: intervention });
        this.setState({ state: STATES.VIEW });
    }
    onAddIntervention(intervention) {
        this.setState({ state: STATES.ADD });
    }
    onEditIntervention(intervention) {
        this.setState({ intervention: intervention });
        this.setState({ state: STATES.EDIT });
    }
    onDeleteIntervention(intervention) {
        this.setState({ intervention: intervention });
        this.setState({ showDeleteConfirm: true });
    }
    hideDeleteConfirmation() {
    	this.setState({ showDeleteConfirm: false });
    }

    onCreateIntervention(intervention) {
        this._issueInterventionAction('POST_SERVICE_CUSTOMER_INTERVENTION', intervention);
    }
    onSaveIntervention(intervention) {
    	this._issueInterventionAction('PUT_SERVICE_CUSTOMER_INTERVENTION', intervention);
    }
    onDeleteIntervention(intervention) {
        this._issueInterventionAction('DELETE_SERVICE_CUSTOMER_INTERVENTION', intervention);
    }

    _issueInterventionAction(action, intervention) {
    	let args = {
            serviceId: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
            customerId: intervention.customerId,
            token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
            data: intervention
        }
    	Dispatcher.issue(action, args).
    	then(function () {
    		Dispatcher.issue('GET_SERVICE_INTERVENTIONS', args);	
    	}).
    	then(function() {
    		this.setState({ state: STATES.LIST });
    	}.bind(this)).
    	catch(function(error) {
    		console.log(error);
    	});    	
    }

	render() {
		let customers = (this.props.customers || []).
		filter(function(customer) {
			return this.props.interventions && this.props.interventions[customer.id] && this.props.interventions[customer.id].length;
		}.bind(this)).
		map(function(customer) {
			return (
				<CustomerInterventionList key={customer.id} customer={customer} interventions={this.props.interventions[customer.id]}/>
			);
		}.bind(this));
		switch (this.state.state) {
            case STATES.ADD:
                return (
                    <InterventionCreate 
                        customers={this.props.customers || []}
                        onCancel={this.onCancel.bind(this)} 
                        onCreate={this.onCreateIntervention.bind(this)}/>
                );
            default:
        		return (
        			<div>
        				<Panel header={(<strong>Interventions en cours</strong>)}>
        					<Button block bsStyle='info' onClick={this.onAddIntervention.bind(this)}>Saisir nouvelle intervention</Button>
        					<br/>
        					{customers}
        				</Panel>				
        			</div>
        		);
        }
	}
}

export default ServiceInterventions;