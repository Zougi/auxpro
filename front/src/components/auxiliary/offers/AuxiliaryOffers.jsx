import React from 'react';
import { Panel } from 'react-bootstrap';
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';
// custom components
import OfferSummary from './OfferSummary.jsx'
import Utils from '../../../utils/Utils.js'
import DialogConfirmation from '../../common/dialog/DialogConfirmation.jsx';

let STATES = {
	LIST: 'LIST',
	VIEW: 'VIEW'
}

class AuxiliaryOffers extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { 
			state: STATES.LIST
		};
	}

	onOfferAccept(offer) {
		this.setState({
			confirmAccept: true,
			offerStatus: 'ACCEPTED',
			offer: offer
		});
	}
	onOfferReject(offer) {
		this.setState({
			confirmReject: true,
			offerStatus: 'REJECTED',
			offer: offer
		});
	}
	onOfferView(offer) {
		
	}

	onCancel() {
		this.setState({
			confirmAccept: false,
			confirmReject: false,
			offer: null
		});	
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
			token: StoreRegistry.getStore('LOGIN_STORE').getData('/token')
		}
        Dispatcher.issue('PUT_OFFER', params).
        then(function () {
        	return Dispatcher.issue('GET_AUXILIARY_OFFERS', { 
        		token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
        		auxiliaryId: StoreRegistry.getStore('LOGIN_STORE').getData('/id')
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

	_buildOffers() {
		return Utils.map(this.props.offers || [], this._buildOffer.bind(this));
	}
	_buildOffer(offer) {
		return (
			<OfferSummary 
				key={offer.id} 
				service={this.props.services[offer.serviceId]}
				customer={this.props.customers[offer.customerId]}
				intervention={this.props.interventions[offer.interventionId]}
				offer={offer}
				onAccept={this.onOfferAccept.bind(this)}
				onReject={this.onOfferReject.bind(this)}
				onView={this.onOfferView.bind(this)} />
		);
	}

	render() { 
		return (
			<div>
				<Panel title='Offres en cours'>
	            	{this._buildOffers()}
	        	</Panel>
	        	<DialogConfirmation
                    show={this.state.confirmAccept}
                    title="Accepter l'offre"
                    onConfirm={this.acceptOffer.bind(this)}
                    confirmStyle='success'
                    confirmText='Accepter'
                    onCancel={this.onCancel.bind(this)}
                    cancelStyle='default'
                    cancelText='Annuler' />
                <DialogConfirmation
                    show={this.state.confirmReject}
                    title="Rejeter l'offre"
                    onConfirm={this.rejectOffer.bind(this)}
                    confirmStyle='danger'
                    confirmText='Rejeter'
                    onCancel={this.onCancel.bind(this)}
                    cancelStyle='default'
                    cancelText='Annuler' />
	        </div>
		);
	}
}

export default AuxiliaryOffers;