import React from 'react';
import { Panel, Button } from 'react-bootstrap';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import { APButton } from 'lib/Lib.jsx';

/*
function getLoginData() {
	return StoreRegistry.getStore('LOGIN_STORE').getData('/');
}
function getOffer(id) {
	return StoreRegistry.getStore('AUXILIARY_STORE').getData('/data/offers/' + id);
}
function getCustomer(id) {
	return StoreRegistry.getStore('AUXILIARY_STORE').getData('/data/customers/' + id);
}
function getService(id) {
	return StoreRegistry.getStore('AUXILIARY_STORE').getData('/data/services/' + id);
}
function getIntervention(id) {
	return StoreRegistry.getStore('AUXILIARY_STORE').getData('/data/interventions/' + id);
}
*/

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
		let offer = this.getOffer(this.props.offerId);
		return {
			offer: offer,
			service: this.getService(offer.serviceId),
			customer: this.getCustomer(offer.customerId),
			intervention: this.getIntervention(offer.interventionId)
		}
	}

	acceptOffer() {
		this._updateOffer(this.state.offer);
	}
	rejectOffer() {
		this._updateOffer(this.state.offer);
	}

	_updateOffer(offer) {
		offer.status = this.state.offerStatus;
		let params = {
			data: offer,
			offerId: offer.id,
			token: this.getLoginData().token
		}
		Dispatcher.issue('PUT_OFFER', params).
		then(function () {
			return Dispatcher.issue('GET_AUXILIARY_OFFERS', { 
				token: this.getLoginData().token,
				auxiliaryId: this.getLoginData().id
			})
		}).
		then(function () {
			this.onCancel();
		}.bind(this)).
		catch(function (error) {
			offer.status = 'PENDING';
			console.log(error);
		});
	}

	render() { return (
		<div>
			<br/>
			<Panel>
				<Button block bsStyle='info' onClick={this.props.onClose}>
					Retour
				</Button>
				<br/>
				<Panel header="Détails de l'offre">
				</Panel>
			</Panel>
		</div>
	);}
}

export default AuxiliaryOffer;