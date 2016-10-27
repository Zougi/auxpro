import React from 'react';
import { Panel, Col } from 'react-bootstrap';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import { APButton } from 'lib/Lib.jsx';
//
import OfferHelper from 'utils/entities/OfferHelper.js'
import MomentHelper from 'utils/moment/MomentHelper.js'

class AuxiliaryOffer extends AuxiliaryBaseComponent {
	
	constructor(props) {
		super(props);
		this.state = this._buildState();
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
	 	StoreRegistry.register('AUXILIARY_STORE', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('AUXILIARY_STORE', this);
	}
	
	_onStoreUpdate(first) {
		this.setState(this._buildState());
	}

	_buildState() {
		let offer = this.getOffer(this.props.params.offerId);
		return {
			offer: offer,
			service: this.getService(offer.serviceId),
			customer: this.getCustomer(offer.customerId),
			intervention: this.getIntervention(offer.interventionId)
		}
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	acceptOffer() {
		this.state.offer.status = 'ACCEPTED';
		this._updateOffer();
	}
	rejectOffer() {
		this.state.offer.status = 'REJECTED';
		this._updateOffer();
	}

	_updateOffer() {
		this.updateOffer(this.state.offer).
		then(function () {
			this._onClose();
		}.bind(this)).
		catch(function (error) {
			this.state.offer.status = 'PENDING';
			console.log(error);
		}.bind(this));;
	}

	_onClose() {
		Dispatcher.issue('NAVIGATE', { path: '/aux/offers' });
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { 
		return (
		<div>
			<br/>
			<Panel>
				<APButton block onClick={this._onClose.bind(this)}>
					Retour
				</APButton>
				<br/>
				<br/>
				<Panel bsStyle={OfferHelper.getBsStyle(this.state.offer.status)} header="Détails de l'offre">
					{ this.state.intervention.oneTime ?
						<div>{'Intervention le ' + MomentHelper.localDateToHumanDate(this.state.intervention.oneTime.date)}</div>
					:
						<div>{'Intervention du ' + MomentHelper.localDateToHumanDate(this.state.intervention.recurence.startDate) + ' au ' + MomentHelper.localDateToHumanDate(this.state.intervention.recurence.endDate)}</div>
					}
				</Panel>
				{this.state.offer.status === 'PENDING' ?
				<div>
					<Col xs={6}>
						<APButton block bsStyle='danger' onClick={this.rejectOffer.bind(this)}>
							Refuser
						</APButton>
					</Col>
					<Col xs={6}>
						<APButton block bsStyle='success' onClick={this.acceptOffer.bind(this)}>
							Accepter
						</APButton>
					</Col>
				</div>
				: '' }
			</Panel>
		</div>
	);}
}
export default AuxiliaryOffer;