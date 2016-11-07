// lib modules
import React from 'react';
import { Panel, Button, Row, Col, Modal } from 'react-bootstrap';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
import Utils from 'utils/Utils.js'
// custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import CustomerDetails from 'components/common/customers/CustomerDetails.jsx';
import InterventionDetails from 'components/common/interventions/InterventionDetails.jsx';
import InterventionMatch from 'components/common/interventions/InterventionMatch.jsx';
import InterventionOffers from 'components/common/interventions/InterventionOffers.jsx';
import ServiceHeader from '../ServiceHeader.jsx';
import ServiceInterventionsCustomer from './ServiceInterventionsCustomer.jsx';
import FormSelect from 'components-lib/Form/FormSelect.jsx'
import InterventionDetailsOneTime from 'components/common/interventions/InterventionDetailsOneTime.jsx'
import InterventionDetailsRecurence from 'components/common/interventions/InterventionDetailsRecurence.jsx'
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog.jsx';

let MODES = {
    CREATE: 'CREATE',
    EDIT: 'EDIT'
}

let INTERVENTION_MODES = {
    ONE_TIME: { 
        key: 'ONE_TIME',
        value: 'Intervention unique'
    },
    RECURENCE: {
        key: 'RECURENCE',
        value: 'Intervention récurente'
    }
}

class ServiceInterventionEdit extends ServiceBaseComponent {
	
	constructor(props) {
		super(props);
        this.state = this._buildState();
	}
	

    // State Management functions //
    // --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('SERVICE_STORE', this, this.onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);   
	}
	onStoreUpdate() {
		this.setState(this._buildState());
    }
    _buildState() {
        if (this.props.params.interventionId) {
            let intervention = this.getIntervention(this.props.params.interventionId);
            return {
                mode: MODES.EDIT,
                customers: Utils.map(this.getCustomers()),
                interventionMode: intervention.oneTime ? INTERVENTION_MODES.ONE_TIME : INTERVENTION_MODES.RECURENCE,
                intervention: intervention
            };
        } else {
            let customers = Utils.map(this.getCustomers());
            return {
                mode: MODES.CREATE,
                customers: customers,
                interventionMode: INTERVENTION_MODES.ONE_TIME,
                intervention: {
                    serviceId: this.getLoginData('/id'),
                    customerId: customers[0].id
                }
            };
        }
    }


    // Callbacks functions //
    // --------------------------------------------------------------------------------
	
    onSaveIntervention() {
        if (this.state.mode === MODES.CREATE) {
            this.createIntervention(this.state.intervention).
            then(function () {
                Dispatcher.issue('NAVIGATE', {path: '/sad/interventions'});
            });
        } else {
            this.updateIntervention(this.state.intervention).
            then(function () {
                Dispatcher.issue('NAVIGATE', {path: '/sad/interventions'});
            });
        }
    }
    onCancel() {
        Dispatcher.issue('NAVIGATE', {path: '/sad/interventions'});
    }   
    
    onCustomerChanged(customerId) {
        this.state.intervention.customerId = customerId;
        this.forceUpdate();
    }
    onInterventionModeChanged(modeId) {
        this.setState({ interventionMode: INTERVENTION_MODES[modeId] });
    }
    onOneTimeChanged(oneTime) {
        this.state.intervention.oneTime = oneTime;
        this.forceUpdate();
    }
    onRecurenceChanged(recurence) {
        this.state.intervention.recurence = recurence;
        this.forceUpdate();
    }

    // Rendering functions //
    // --------------------------------------------------------------------------------

    _buildCustomers() {
        return (this.state.customers || []).map(function(customer) {
            return {
                key: customer.id,
                value: customer.lastName + ' ' + customer.firstName
            };
        }.bind(this))
    }

	render() {
        let mode = (this.state.mode === MODES.CREATE);
        return (
        <Row>
            <Panel header={mode ? 'Saisir une nouvelle demande' : 'Modifier demande'}>
                <Row>
                    <Col sm={8} md={7} lg={6}>
                        <FormSelect 
                            edit={mode}
                            title={mode ? 'Choisir client' : 'Client'}
                            defaultValue={this.state.intervention.customerId}
                            values={this._buildCustomers()}
                            onChange={this.onCustomerChanged.bind(this)}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={8} md={7} lg={6}>
                        <FormSelect 
                            edit={true}
                            title='Type de demande'
                            defaultValue={this.state.interventionMode.key} 
                            values={[ INTERVENTION_MODES.ONE_TIME, INTERVENTION_MODES.RECURENCE ]}
                            onChange={this.onInterventionModeChanged.bind(this)}/>
                    </Col>
                </Row>
                <br/>
                {this.state.interventionMode === INTERVENTION_MODES.ONE_TIME ?
                <InterventionDetailsOneTime
                    edit={true}
                    onChange={this.onOneTimeChanged.bind(this)}
                    oneTime={this.state.intervention.oneTime}/>
                :
                <InterventionDetailsRecurence
                    edit={true}
                    onChange={this.onRecurenceChanged.bind(this)}
                    recurence={this.state.intervention.recurence}/>
                }
                <br/>
                <ButtonsEndDialog 
                    onOk={this.onSaveIntervention.bind(this)} okTitle='Enregistrer modifications' 
                    onCancel={this.onCancel.bind(this)} cancelTitle='Annuler'/>
            </Panel>
        </Row>
	);}
}

export default ServiceInterventionEdit;