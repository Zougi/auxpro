import React from 'react'
import moment from 'moment'
import { Panel, Button, Row, Col, ListGroup, ListGroupItem, Clearfix } from 'react-bootstrap'
// core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import CustomerSummary from 'components/common/customers/CustomerSummary'
import SkillSummaryList from 'components/common/skills/SkillSummaryList'
import APPanelBasic from 'components-lib/Panel/APPanelBasic'
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog'
import DialogConfirmation from 'components-lib/DialogConfirmation/DialogConfirmation'
import AsyncImage from 'lib/image/AsyncImage'
import { APButton } from 'lib/Lib'
// Lib modules
import Utils from 'utils/Utils'
import MathUtils from 'utils/MathUtils'
import GeoHelper from 'utils/geo/GeoHelper'
import OfferStatus from 'utils/constants/OfferStatus'
import InterventionHelper from 'utils/entities/InterventionHelper'

moment.locale('fr');

class ServiceIntervention extends ServiceBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
		this.state.showConfirm = false;
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
			return Promise.all(promises);
		}.bind(this)).
		then(this.onCancel.bind(this));
	}
	onConfirmOffer(offer) {
		this.setState({ 
			currentOffer: offer,
			showConfirm: true 
		});
		
	}
	doConfirmOffer() {
		this.state.intervention.auxiliaryId = this.state.currentOffer.auxiliaryId;
		this.updateIntervention(this.state.intervention).
		then(function () {
			var promises = [];
			promises.push(this.loadInterventions());
			promises.push(this.loadOffers());
			promises.push(this.loadMissions());
			return Promise.all(promises);
		}.bind(this)).
		then(this.onCancel.bind(this));
	}
	cancelConfirmOffer() {
		this.setState({ 
			currentOffer: null,
			showConfirm: false 
		});
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
						<Col xs={5} sm={3}>
							{auxiliary.firstName + ' ' + auxiliary.lastName}
							<br/>
							{auxiliary.city + ' - ' + distance + ' km'}
							<br/>
							{OfferStatus.getStatus(offer.status).value}
						</Col>
						<Col xs={5} sm={5}>
							<SkillSummaryList skills={auxiliary}/>
						</Col>
						<Col xsOffset={2} xs={10} smOffset={0} sm={2}>
						{ OfferStatus.getStatus(offer.status) === OfferStatus.ACCEPTED ?
							<APButton
								block
								bsStyle='success'
								text='Confirmer'
								onClick={this.onConfirmOffer.bind(this, offer)} />
						: <div/> }
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
						<APPanelBasic
							title='Prestation'
							bsStyle='primary'
							text={InterventionHelper.getInitialText(this.state.intervention)} />
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
				<APButton
					block
					bsStyle='info'
					text='Retour'
					onClick={this.onCancel.bind(this)} />
				}
			</Panel>
			<DialogConfirmation
				show={this.state.showConfirm}
				title="Confimer l'auxiliaire ?"
				onConfirm={this.doConfirmOffer.bind(this)}
				confirmStyle='success'
				confirmText='Confirmer'
				onCancel={this.cancelConfirmOffer.bind(this)}
				cancelStyle='default'
				cancelText='Annuler'
				body={(
					<div>
						<p>En confirmant cet auxiliaire de vie, vous refuserez les autres offres acceptées.</p>
						<p>L'offre sera cloturée et assignée a l'auxiliaire de vie choisi.</p>
					</div>
				)}/>
		</Row>
	);}
}
export default ServiceIntervention;