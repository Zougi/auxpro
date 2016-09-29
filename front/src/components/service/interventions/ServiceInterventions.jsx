// lib modules
import React from 'react';
import { Panel, Button, Row, Col, Modal } from 'react-bootstrap';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
import Utils from 'utils/Utils.js'
// custom components
import CustomerDetails from 'components/common/customers/CustomerDetails.jsx';
import InterventionDetails from 'components/common/interventions/InterventionDetails.jsx';
import InterventionMatch from 'components/common/interventions/InterventionMatch.jsx';
import InterventionOffers from 'components/common/interventions/InterventionOffers.jsx';
import ServiceHeader from '../ServiceHeader.jsx';
import ServiceCustomerInterventions from './ServiceCustomerInterventions.jsx';

import DialogConfirmation from 'components-lib/DialogConfirmation/DialogConfirmation.jsx';

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
        this.state = { state: STATES.LIST };		
    }

    onCancel() {
        this.setState({ 
            intervention: null,
            state: STATES.LIST 
        });
    }   
    onViewIntervention(intervention) {
        this.setState({ 
            intervention: intervention,
            state: STATES.VIEW 
        });
    }
    onAddIntervention(intervention) {
        this.setState({ state: STATES.ADD });
    }
    onEditIntervention(intervention) {
        this.setState({ 
            intervention: intervention,
            state: STATES.EDIT 
        });
    }
    onMatchIntervention(intervention) {
        this.interventionId = intervention.id
		Dispatcher.issue('GET_INTERVENTION_MATCH', {
            token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
            interventionId: intervention.id
        }).then(function() {
            this.setState({ state: STATES.MATCH });
        }.bind(this)).
        catch(function (error) {
            console.log('Unable to load matches:');
            console.log(error);
        });
		
		
    }
    onDeleteIntervention(intervention) {
        this.setState({ 
            intervention: intervention,
            showDeleteConfirm: true 
        });
    }
    hideDeleteConfirmation() {
    	this.setState({ showDeleteConfirm: false });
    }

    createIntervention(intervention) {
        this._issueInterventionAction('POST_INTERVENTION', intervention);
    }
    saveIntervention(intervention) {
    	this._issueInterventionAction('PUT_INTERVENTION', intervention);
    }
    deleteIntervention() {
        this._issueInterventionAction('DELETE_INTERVENTION', this.state.intervention);
    }
    sendIntervention(intervention) {
		var promises = [];
        for (let i = 0; i < intervention.matches.length; i++) {
            let params = {
                token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
                data: {
                    serviceId: intervention.serviceId,
                    customerId: intervention.customerId,
                    interventionId: intervention.id,
                    auxiliaryId: intervention.matches[i].id,
                    status: "PENDING"
                }
            }
            promises.push(Dispatcher.issue('POST_OFFER', params));
		}
        Promise.all(promises).
        then(function () {
            return Dispatcher.issue('GET_SERVICE_AUXILIARIES', {
                token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
                serviceId: StoreRegistry.getStore('LOGIN_STORE').getData('/id')
            });
        }).
        then(function () {
            return Dispatcher.issue('GET_SERVICE_OFFERS', {
                token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
                serviceId: StoreRegistry.getStore('LOGIN_STORE').getData('/id')
            });
        }).
        then(this.onCancel.bind(this));
    }

    _issueInterventionAction(action, intervention) {
    	Dispatcher.issue(action, {
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

    _buildCustomers() {
        let customers = Utils.filter(this.props.customers || [], this._filterCustomer.bind(this));
        return customers.map(this._buildCustomer.bind(this));
    }
    _filterCustomer(customer) {
        return customer.interventions && customer.interventions.length;
    }
    _buildCustomer(customer) {
        let interventions = Utils.filter(this.props.interventions, function(intervention) {
            return intervention.customerId === customer.id;
        });
        let offers = Utils.filter(this.props.offers, function(offer) {
            return offer.customerId === customer.id;
        });
        return (
            <ServiceCustomerInterventions 
                key={customer.id} 
                customer={customer} 
                interventions={interventions}
                offers={offers}
                onEdit={this.onEditIntervention.bind(this)}
                onMatch={this.onMatchIntervention.bind(this)}
                onDelete={this.onDeleteIntervention.bind(this)}
                onViewOffers={this.onViewIntervention.bind(this)} />
        );
    }

	render() {
        var content;
		switch (this.state.state) {
            case STATES.ADD: content = (
                <InterventionDetails 
                    edit={true}
                    customers={Utils.map(this.props.customers)}
                    onCancel={this.onCancel.bind(this)} 
                    onCreate={this.createIntervention.bind(this)} />
            );
            case STATES.EDIT: content = (
                <InterventionDetails 
                    edit={true}
                    customers={Utils.map(this.props.customers)}
                    intervention={this.state.intervention}
                    onCancel={this.onCancel.bind(this)} 
                    onCreate={this.saveIntervention.bind(this)} />
            );
            case STATES.MATCH:
                let intervention = this.props.interventions[this.interventionId];
                content = (
                    <InterventionMatch
                        customer={this.props.customers[intervention.customerId]}
                        intervention={intervention}
                        matches={intervention.matches}
                        onCancel={this.onCancel.bind(this)}
                        onSend={this.sendIntervention.bind(this)} />
                );
            case STATES.VIEW:
                let offers = Utils.filter(this.props.offers, function(offer) {
                    return offer.interventionId === this.state.intervention.id;
                }.bind(this));
                content = (
                    <InterventionOffers
                        customer={this.props.customers[this.state.intervention.customerId]}
                        intervention={this.state.intervention}
                        offers={offers}
                        onCancel={this.onCancel.bind(this)} />
                );
            default:
                let customers = this._buildCustomers();
        		content = (
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
        return (
            <div>
                <ServiceHeader service={this.props.service}/>
                <div>
                    {content}
                </div>
            </div>
        );
	}
}

export default ServiceInterventions;