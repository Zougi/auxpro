import React from 'react'
import { Panel, Col } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent'
import { APButton } from 'lib/Lib'
// Lib mosules
import OfferStatus from 'utils/constants/OfferStatus'
import MomentHelper from 'utils/moment/MomentHelper'

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
	declineOffer() {
		this.state.offer.status = 'DECLINED';
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
				<Panel bsStyle={OfferStatus.getStatus(this.state.offer.status).bsStyle} header="Détails de l'offre">
					{ this.state.intervention.period === 'ONE' ?
						<div>{'Intervention le ' + MomentHelper.localDateToHumanDate(this.state.intervention.startDate)}</div>
					:
						<div>{'Intervention du ' + MomentHelper.localDateToHumanDate(this.state.intervention.startDate) + ' au ' + MomentHelper.localDateToHumanDate(this.state.intervention.endDate)}</div>
					}
				</Panel>
				{this.state.offer.status === 'PENDING' ?
				<div>
					<Col xs={6}>
						<APButton block bsStyle='danger' onClick={this.declineOffer.bind(this)}>
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