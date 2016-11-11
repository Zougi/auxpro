import React from 'react';
import { Panel, Clearfix } from 'react-bootstrap'
// Core modules
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import { Col, Row } from 'lib/Lib'
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent'
// Lib modules
import Utils from 'utils/Utils'
import OfferStatus from 'utils/constants/OfferStatus'

class AuxiliaryHome extends AuxiliaryBaseComponent {
	
	constructor(props) {
		super(props);
		this.state = this._buildState();
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
		let offers = Utils.map(this.getOffers());
		return {
			profileCompleted: this.getAuxiliary().profileCompleted,
			auxiliary: this.getAuxiliary(),
			missions: Utils.map(this.getMissions()),
			customers: Utils.map(this.getCustomers()),
			offersPending: offers.filter(function(offer) { return OfferStatus.getStatus(offer.status) === OfferStatus.PENDING }),
			offersAccepted: offers.filter(function(offer) { return OfferStatus.getStatus(offer.status) === OfferStatus.ACCEPTED }),
			offersConfirmed: offers.filter(function(offer) { return OfferStatus.getStatus(offer.status) === OfferStatus.CONFIRMED }),
			offersRejected: offers.filter(function(offer) { return OfferStatus.getStatus(offer.status) === OfferStatus.REJECTED })
		}
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildConfirmedOffers() {
		return this.state.offers.filter(function(offer) {
			return OfferStatus.getStatus(offer.status) === OfferStatus.CONFIRMED
		})
	}

	render() { return(
		<Panel header={(<strong>Bienvenue</strong>)} bsStyle='info'>
			<Col sm={6} md={4}>
			{ (this.state.profileCompleted) ?
				<Panel bsStyle='success' header='Statut profil'>
					Votre profil est actif.
				</Panel>
			:
				<Panel bsStyle='danger' header='Statut profil'>
					Votre profil est incomplet.
				</Panel>
			}
			</Col>
			<Clearfix/>
			<Col sm={6} md={4}>
				<Panel header='Offres' bsStyle='info'>
					<div><strong><b>{this.state.offersPending.length}</b></strong>{' nouvelle' + (this.state.offersPending.length > 1 ? 's' : '') + ' offre' + (this.state.offersPending.length > 1 ? 's' : '')}</div>
					<div><strong><b>{this.state.offersAccepted.length}</b></strong>{' offre' + (this.state.offersAccepted.length > 1 ? 's' : '') + ' en attente'}</div>
					<div><strong><b>{this.state.offersConfirmed.length}</b></strong>{' offre' + (this.state.offersConfirmed.length > 1 ? 's' : '') + ' confirmées'}</div>
					<div><strong><b>{this.state.offersRejected.length}</b></strong>{' offre' + (this.state.offersRejected.length > 1 ? 's' : '') + ' rejetées'}</div>
				</Panel>
			</Col>
			<Col sm={6} md={4}>
				<Panel header='Interventions' bsStyle='info'>
					<strong><b>{this.state.missions.length}</b></strong>{' intervention' + (this.state.missions.length > 1 ? 's' : '') + '.'}
				</Panel>
			</Col>
			<Col sm={6} md={4}>
				<Panel header='Usagers' bsStyle='info'>
					<strong><b>{this.state.customers.length}</b></strong>{' usager' + (this.state.customers.length > 1 ? 's' : '') + '.'}
				</Panel>
			</Col>
		</Panel>
	);}
}
export default AuxiliaryHome;