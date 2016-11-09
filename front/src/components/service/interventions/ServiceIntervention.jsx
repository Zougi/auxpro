import React from 'react';
import moment from 'moment';
import { Panel, Button, Row, Col, ListGroup, ListGroupItem, Clearfix } from 'react-bootstrap';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import InterventionSummaryOneTime from 'components/common/interventions/InterventionSummaryOneTime.jsx'
import InterventionSummaryRecurence from 'components/common/interventions/InterventionSummaryRecurence.jsx'
import CustomerSummary from 'components/common/customers/CustomerSummary.jsx';
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog.jsx';
import AsyncImage from 'lib/image/AsyncImage.jsx'
import SkillSummaryList from 'components/common/skills/SkillSummaryList.jsx'
// Lib modules
import Utils from 'utils/Utils'
import MathUtils from 'utils/MathUtils'
import GeoHelper from 'utils/geo/GeoHelper'
import OfferStatus from 'utils/constants/OfferStatus'

moment.locale('fr');

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

class ServiceIntervention extends ServiceBaseComponent {
    
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
            intervention: intervention,
            selected: []
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
        let l = this.state.selected.length
        for (let i = 0; i < l; i++) {
            let offer = {
                serviceId: this.state.intervention.serviceId,
                customerId: this.state.intervention.customerId,
                interventionId: this.state.intervention.id,
                auxiliaryId: this.state.selected[i].id,
                status: "PENDING"
            }
            promises.push(this.createOffer(offer));
        }
        Promise.all(promises).
        then(function () {
            promises = [];
            promises.push(this.loadInterventions());
            promises.push(this.loadAuxiliaries());
            promises.push(this.loadOffers());
            Promise.all(promises);
        }.bind(this)).
        then(this.onCancel.bind(this));
    }
    
    onAuxiliaryClick(auxiliary) {
        let i = this.state.selected.indexOf(auxiliary);
        if (i === -1) {
            this.state.selected.push(auxiliary);
        } else {
            this.state.selected.splice(i, 1);
        }
        this.forceUpdate();
    }


    // Rendering functions //
    // --------------------------------------------------------------------------------

    _buildMatches() {
        return (this.state.intervention.matches || []).map(function(auxiliary, i) {
            let age = moment(auxiliary.birthDate).toNow(true);
            let distance = MathUtils.round(GeoHelper.getDistanceFromLatLonInKm(auxiliary.lattitude, auxiliary.longitude, this.state.customer.lattitude, this.state.customer.longitude), 1);
            return (
                <ListGroupItem bsStyle={this.state.selected.indexOf(auxiliary) !== -1 ? 'info' : null} key={i} onClick={this.onAuxiliaryClick.bind(this, auxiliary)}>
                    <Row>
                        <Col xs={2}>
                            <AsyncImage src={auxiliary.avatar} width={50} height={50}/>
                        </Col>
                        <Col xs={10} sm={4}>
                            {auxiliary.firstName + ' ' + auxiliary.lastName}
                            <br/>
                            {auxiliary.city + ' - ' + distance + ' km'}
                        </Col>
                        <Clearfix visibleXsBlock />
                        <Col xsOffset={2} xs={10} smOffset={0} sm={6}>
                            <SkillSummaryList skills={auxiliary}/>
                        </Col>
                    </Row>
                </ListGroupItem>
            );
        }.bind(this));
    }
    _buildOffers() {
        return (this.state.intervention.offers || []).map(function(offerId, i) {
            let offer = this.getOffer(offerId);
            let auxiliary = this.getAuxiliary(offer.auxiliaryId);
            let age = moment(auxiliary.birthDate).toNow(true);
            let distance = MathUtils.round(GeoHelper.getDistanceFromLatLonInKm(auxiliary.lattitude, auxiliary.longitude, this.state.customer.lattitude, this.state.customer.longitude), 1);
            return (
                <ListGroupItem bsStyle={OfferStatus.getStatus(offer.status).bsStyle} key={i}>
                    <Row>
                        <Col xs={2}>
                            <AsyncImage src={auxiliary.avatar} width={50} height={50}/>
                        </Col>
                        <Col xs={10} sm={4}>
                            {auxiliary.firstName + ' ' + auxiliary.lastName}
                            <br/>
                            {auxiliary.city + ' - ' + distance + ' km'}
                            <br/>
                            {OfferStatus.getStatus(offer.status).value}
                        </Col>
                        <Clearfix visibleXsBlock />
                        <Col xsOffset={2} xs={10} smOffset={0} sm={6}>
                            <SkillSummaryList skills={auxiliary}/>
                        </Col>
                    </Row>
                </ListGroupItem>
            );
        }.bind(this));
    }

    render() { return (
        <Row>
            <Panel header={(<strong>{this.state.intervention.matches ? 'Envoyer offres de prestation' : 'Statut des offres de prestation'}</strong>)}>
                <Row>
                    <Col sm={6}>
                        <Panel header='Information usager' bsStyle='primary'>
                            <CustomerSummary customer={this.state.customer}/>
                        </Panel>
                    </Col>
                    <Col sm={6}>
                        <Panel header='Prestation' bsStyle='primary'>
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
                        <Panel header={this.state.intervention.matches ? 'Sélectionner les auxiliaires de vie' : 'Offres envoyées'} bsStyle='primary'>
                            <ListGroup fill>
                            {this.state.intervention.matches ?
                                this._buildMatches()
                            :
                                this._buildOffers()
                            }
                            </ListGroup>
                        </Panel>
                    </Col>
                </Row>
                {this.state.intervention.matches ?
                <ButtonsEndDialog 
                    onOk={this.onSendOffers.bind(this)} 
                    okTitle={'Envoyer (' + this.state.selected.length + ')'}
                    okDisabled={this.state.selected.length === 0}
                    onCancel={this.onCancel.bind(this)} 
                    cancelTitle='Annuler'/>
                :
                <Button
                    bsStyle='info'
                    onClick={this.onCancel.bind(this)} 
                    block>
                    Retour
                </Button>
                }
            </Panel>
        </Row>
    );}
}
export default ServiceIntervention;