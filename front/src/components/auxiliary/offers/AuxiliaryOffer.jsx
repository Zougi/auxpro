import React from 'react';
import { Panel, Button } from 'react-bootstrap';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import { APButton } from 'lib/Lib.jsx';
//
import MomentHelper from 'utils/moment/MomentHelper.js'

class AuxiliaryOffer extends AuxiliaryBaseComponent {
	
	constructor(props) {
		super(props);
		this.state = this._buildState();
	}

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
		});;
	}

	_onClose() {
		this.context.router.push('/aux/offres');
	}

	render() { 
		return (
		<div>
			<br/>
			<Panel>
				<APButton block bsStyle='info' onClick={this._onClose.bind(this)}>
					Retour
				</APButton>
				<br/>
				<br/>
				<Panel header="Détails de l'offre">
					{ this.state.intervention.oneTime ?
						<div>{'Intervention le ' + MomentHelper.localDateToHumanDate(this.state.intervention.oneTime.date)}</div>
					:
						<div>{'Intervention du ' + MomentHelper.localDateToHumanDate(this.state.intervention.recurence.startDate) + ' au ' + MomentHelper.localDateToHumanDate(this.state.intervention.recurence.endDate)}</div>
					}
				</Panel>
			</Panel>
		</div>
	);}
}

AuxiliaryOffer.contextTypes = {
	router: React.PropTypes.object
}

export default AuxiliaryOffer;