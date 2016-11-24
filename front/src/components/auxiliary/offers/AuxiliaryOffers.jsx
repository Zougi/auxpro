import React from 'react'
import { Panel, Row, Col, Clearfix, ButtonGroup } from 'react-bootstrap'
// core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent'
import APPanelBasic from 'components-lib/Panel/APPanelBasic'
import { APButton } from 'lib/Lib';
import DialogConfirmation from 'components-lib/DialogConfirmation/DialogConfirmation'
// Lib modules
import Utils from 'utils/Utils'
import Period from 'utils/constants/Period'
import MomentHelper from 'utils/moment/MomentHelper'
import InterventionHelper from 'utils/entities/InterventionHelper'
import OfferStatus from 'utils/constants/OfferStatus'

class AuxiliaryOffers extends AuxiliaryBaseComponent {
	
	constructor(props) {
		super(props);
		this.state = this._buildState();
		this.state.offersFilter = '';
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('AUXILIARY_STORE', this, this.onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('AUXILIARY_STORE', this);
	}
	onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		return {
			customers: this.getCustomers(),
			interventions: this.getInterventions(),
			offers: this.getOffers(),
			services: this.getServices()
		}
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onOffersFilter(status) {
		this.setState({ offersFilter: status });
	}

	onOfferAccept(offer) {
		this.setState({
			confirmAccept: true,
			offerStatus: 'ACCEPTED',
			hideToAux: false,
			offer: offer
		});
	}
	onOfferDecline(offer) {
		this.setState({
			confirmReject: true,
			offerStatus: 'DECLINED',
			hideToAux: true,
			offer: offer
		});
	}
	onOfferView(offer) {
		Dispatcher.issue('NAVIGATE', { path: '/aux/offers/' + offer.id});
	}
	onOfferHide(offer) {
		offer.hideToAux = true;
		this.updateOffer(offer).
		catch(function (error) {
			console.log(error);
		});
	}

	onAccept() {
		this._updateOffer(this.state.offer);
	}
	onCancel() {
		this.setState({
			confirmAccept: false,
			confirmReject: false,
			offerStatus: 'PENDING',
			hideToAux: false,
			offer: null
		});
	}

	_updateOffer(offer) {
		offer.status = this.state.offerStatus;
		offer.hideToAux = this.state.hideToAux;
		this.updateOffer(offer).
		then(function () {
			this.onCancel();
		}.bind(this)).
		catch(function (error) {
			offer.status = 'PENDING';
			console.log(error);
		});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildOffers() {
		let offers = Utils.filter(this.state.offers || [], this._filterOffer.bind(this));
		let l = offers.length;
		let result = [];
		for (let i = 0; i < l; i++) {
			let offer = offers[i];
			let status = OfferStatus.getStatus(offer.status);
			let service = this.state.services[offer.serviceId];
			let customer = this.state.customers[offer.customerId];
			let intervention = this.state.interventions[offer.interventionId];
			let text = [
				'Recue le : ' + MomentHelper.localDateToHumanDate(offer.creationDate),
				'Service : ' + service.socialReason,
				'Usager : ' + customer.lastName + ' ' + customer.firstName
			];
			let period = Period.getPeriod(intervention.period)
			switch (period) {
				case Period.ONE:
					text.push('Prestation le ' + MomentHelper.localDateToHumanDate(intervention.startDate));
					break;
				case Period.P1W:
				case Period.P2W:
				case Period.P3W:
				case Period.P4W:
					text.push('Prestation du ' + MomentHelper.localDateToHumanDate(intervention.startDate) + ' au ' + MomentHelper.localDateToHumanDate(intervention.endDate));
					break;
			}
			result.push(
				<Col key={'o' + offer.id} sm={6} md={4}>
					<APPanelBasic
						bsStyle={status.bsStyle}
						title={'Offre ' + status.value.toLowerCase()}
						actions={this._buildOfferActions(offer)}
						text={text}
					/>
				</Col>
			);
			if (i%2 === 1) {
				result.push( <Clearfix key={'c2' + offer.id} visibleSmBlock/>);
			}
			if (i%3 === 2) {
				result.push( <Clearfix key={'c3' + offer.id} visibleMdBlock/>);
			}
		}
		return result;
	}
	_buildOfferActions(offer) {
		let actions = [];
		actions .push({
			tooltip: 'Voir offre',
			bsStyle: 'default',
			glyph: 'search', 
			callback: this.onOfferView.bind(this, offer)
		});
		if (offer.status === 'PENDING') {
			actions .push({
				tooltip: 'Accepter offre',
				bsStyle: 'success',
				glyph: 'ok',
				callback: this.onOfferAccept.bind(this, offer)
			});
			actions .push({
				tooltip: 'Décliner offre',
				bsStyle: 'danger',
				glyph: 'remove',
				callback: this.onOfferDecline.bind(this, offer)
			});
		}
		if (offer.status === 'CONFIRMED' || offer.status === 'REJECTED') {
			actions .push({
				tooltip: 'Masquer offre',
				bsStyle: 'danger',
				glyph: 'remove',
				callback: this.onOfferHide.bind(this, offer)
			});
		}
		return actions;
	}
	_filterOffer(offer) {
		if (this.state.offersFilter) {
			return (this.state.offersFilter === OfferStatus.getStatus(offer.status));
		}
		return true;
	}
	_buildTitle() {
		if (this.state.offersFilter) {
			return 'Offres ' + this.state.offersFilter.value.toLowerCase() + 's';
		}
		return 'Toutes mes offres'
	}

	render() { return (
		<div>
			<Panel header={(<strong>{this._buildTitle()}</strong>)} bsStyle='info'>
				<Row style={{textAlign:'center'}}>
					<ButtonGroup>
						<APButton bsStyle='primary' onClick={this.onOffersFilter.bind(this, null)} text='Toutes' />
						<APButton bsStyle='info' onClick={this.onOffersFilter.bind(this, OfferStatus.PENDING)} text='En attente' />
						<APButton bsStyle='success' onClick={this.onOffersFilter.bind(this, OfferStatus.ACCEPTED)} text='Acceptées' />
						<APButton bsStyle='danger' onClick={this.onOffersFilter.bind(this, OfferStatus.REJECTED)} text='Rejetées' />
						<APButton onClick={this.onOffersFilter.bind(this, OfferStatus.EXPIRED)} text='Expirées' />
					</ButtonGroup>
				</Row>
			<br/>
			{this._buildOffers()}
			</Panel>
			<DialogConfirmation
				show={this.state.confirmAccept}
				title="Accepter l'offre"
				onConfirm={this.onAccept.bind(this)}
				confirmStyle='success'
				confirmText='Accepter'
				onCancel={this.onCancel.bind(this)}
				cancelStyle='default'
				cancelText='Annuler' />
			<DialogConfirmation
				show={this.state.confirmReject}
				title="Décliner l'offre"
				onConfirm={this.onAccept.bind(this)}
				confirmStyle='danger'
				confirmText='Décliner'
				onCancel={this.onCancel.bind(this)}
				cancelStyle='default'
				cancelText='Annuler' />
		</div>
	);}
}
export default AuxiliaryOffers;