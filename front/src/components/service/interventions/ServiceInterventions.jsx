// lib modules
import React from 'react';
import { Panel, Button, Row, Col, Modal } from 'react-bootstrap';
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';
// custom components
import CustomerDetails from '../../common/customers/CustomerDetails.jsx';
import InterventionDetails from '../../common/interventions/InterventionDetails.jsx';
import InterventionMatch from '../../common/interventions/InterventionMatch.jsx';
import ServiceCustomerInterventions from './ServiceCustomerInterventions.jsx';
import DialogConfirmation from '../../common/dialog/DialogConfirmation.jsx';

let STATES = {
	LIST: 'LIST',
	ADD: 'ADD',
	VIEW: 'VIEW',
	EDIT: 'EDIT',
    MATCH: 'MATCH'
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
    onMatchIntervention(intervention) {
        this.setState({ intervention: intervention });
        this.setState({ state: STATES.MATCH });
    }
    onDeleteIntervention(intervention) {
        this.setState({ intervention: intervention });
        this.setState({ showDeleteConfirm: true });
    }
    hideDeleteConfirmation() {
    	this.setState({ showDeleteConfirm: false });
    }

    createIntervention(intervention) {
        this._issueInterventionAction('POST_SERVICE_CUSTOMER_INTERVENTION', intervention);
    }
    saveIntervention(intervention) {
    	this._issueInterventionAction('PUT_SERVICE_CUSTOMER_INTERVENTION', intervention);
    }
    deleteIntervention() {
        this._issueInterventionAction('DELETE_SERVICE_CUSTOMER_INTERVENTION', this.state.intervention);
    }
    sendIntervention(intervention) {
        console.log('not implemented');
    }

    _issueInterventionAction(action, intervention) {
    	Dispatcher.issue(action, {
            serviceId: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
            customerId: intervention.customerId,
            interventionId: intervention.id,
            token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
            data: intervention
        }).
    	then(function () {
    		Dispatcher.issue('GET_SERVICE_INTERVENTIONS', {
                serviceId: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
                token: StoreRegistry.getStore('LOGIN_STORE').getData('/token')
            });
    	}).
    	then(function() {
            this.hideDeleteConfirmation();
    		this.onCancel();
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
				<ServiceCustomerInterventions 
                    key={customer.id} 
                    customer={customer} 
                    interventions={this.props.interventions[customer.id]}
                    onEdit={this.onEditIntervention.bind(this)}
                    onMatch={this.onMatchIntervention.bind(this)}
                    onDelete={this.onDeleteIntervention.bind(this)} />
			);
		}.bind(this));
		switch (this.state.state) {
            case STATES.ADD:
                return (
                    <InterventionDetails 
                        edit={true}
                        customers={this.props.customers}
                        onCancel={this.onCancel.bind(this)} 
                        onCreate={this.createIntervention.bind(this)} />
                );
            case STATES.EDIT:
                return (
                    <InterventionDetails 
                        edit={true}
                        customers={this.props.customers}
                        intervention={this.state.intervention}
                        onCancel={this.onCancel.bind(this)} 
                        onCreate={this.saveIntervention.bind(this)} />
                );
            case STATES.MATCH:
                return (
                    <InterventionMatch 
                        onCancel={this.onCancel.bind(this)}
                        onSend={this.sendIntervention.bind(this)} />
                );
            default:
        		return (
        			<div>
        				<Panel header={(<strong>Interventions en cours</strong>)}>
        					<Button block bsStyle='info' onClick={this.onAddIntervention.bind(this)}>
                                Saisir nouvelle intervention
                            </Button>
        					<br/>
        					{customers}
        				</Panel>				
                        <DialogConfirmation
                            show={this.state.showDeleteConfirm}
                            title='Supprimer intervention ?'
                            onConfirm={this.deleteIntervention.bind(this)}
                            confirmStyle='danger'
                            confirmText='Supprimer'
                            onCancel={this.hideDeleteConfirmation.bind(this)}
                            cancelStyle='default'
                            cancelText='Annuler' />
        			</div>
        		);
        }
	}
}

export default ServiceInterventions;