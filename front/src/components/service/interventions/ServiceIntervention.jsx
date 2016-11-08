import React from 'react';
import { Panel, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
import Utils from 'utils/Utils.js'
// custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import InterventionSummaryOneTime from 'components/common/interventions/InterventionSummaryOneTime.jsx'
import InterventionSummaryRecurence from 'components/common/interventions/InterventionSummaryRecurence.jsx'
import CustomerSummary from 'components/common/customers/CustomerSummary.jsx';
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog.jsx';

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

class ServiceInterventions extends ServiceBaseComponent {
    
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
        let intervention = this.getIntervention(this.props.params.interventionId);
        return {
            customer: this.getCustomer(intervention.customerId),
            interventionMode: intervention.oneTime ? INTERVENTION_MODES.ONE_TIME : INTERVENTION_MODES.RECURENCE,
            intervention: intervention
        };
    }


    // Callbacks functions //
    // --------------------------------------------------------------------------------
    
    onCancel() {
        Dispatcher.issue('NAVIGATE', {path: '/sad/interventions'});
    }   
    onModify() {
        Dispatcher.issue('NAVIGATE', {path: '/sad/interventions/' + intervention.id});
    }
    onSendOffers() {
        var promises = [];
        let l = this.state.intervention.matches.length
        for (let i = 0; i < l; i++) {
            let offer = {
                serviceId: this.state.intervention.serviceId,
                customerId: this.state.intervention.customerId,
                interventionId: this.state.intervention.id,
                auxiliaryId: this.state.intervention.matches[i].id,
                status: "PENDING"
            }
            promises.push(this.createOffer(offer));
        }
        Promise.all(promises).
        then(function () {
            this.loadInterventions();
        }.bind(this)).
        then(function () {
            this.loadAuxiliaries();
        }.bind(this)).
        then(function () {
            this.loadOffers();
        }.bind(this)).
        then(this.onCancel.bind(this));
    }
    

    // Rendering functions //
    // --------------------------------------------------------------------------------

    _buildMatches() {
        return (this.state.intervention.matches || []).map(function(auxiliary, i) {
            return (
                <ListGroupItem key={i}>
                    {auxiliary.firstName + ' ' + auxiliary.lastName}
                </ListGroupItem>
            );
        });
    }

    render() { return (
        <Row>
            <Panel header={(<strong>{"Envoyer offres de prestations"}</strong>)}>
                <Row>
                    <Col sm={6}>
                        <Panel header='Information usager' bsStyle='info'>
                            <CustomerSummary customer={this.state.customer}/>
                        </Panel>
                    </Col>
                    <Col sm={6}>
                        <Panel header='Prestation' bsStyle='info'>
                        { this.state.interventionMode === INTERVENTION_MODES.ONE_TIME ?
                            <InterventionSummaryOneTime oneTime={this.state.intervention.oneTime}/>
                        :
                            <InterventionSummaryRecurence recurence={this.state.intervention.recurence}/>
                        }
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} >
                        <Panel header={'Résultats Matching'} bsStyle='warning'>
                            <ListGroup fill>
                                {this._buildMatches()}
                            </ListGroup>
                        </Panel>
                    </Col>
                </Row>
                <ButtonsEndDialog 
                    onOk={this.onSendOffers.bind(this)} 
                    okTitle='Envoyer'
                    onCancel={this.onCancel.bind(this)} 
                    cancelTitle='Annuler'/>
            </Panel>
        </Row>
    );}
}

export default ServiceInterventions;