import React from 'react';
import { Panel, Row, Clearfix, ButtonGroup } from 'react-bootstrap';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
import Utils from 'utils/Utils.js'
// custom components
import { APButton } from 'lib/Lib.jsx';
import OfferSummary from './OfferSummary.jsx'
import OfferDetails from './OfferDetails.jsx'
import DialogConfirmation from 'components-lib/DialogConfirmation/DialogConfirmation.jsx';

let STATES = {
	LIST: 'LIST',
	VIEW: 'VIEW'
}

class AuxiliaryOffers extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { 
			state: STATES.LIST,
			offersFilter: ''
		};
	}

	onOffersFilter(status) {
		return function() {
			this.setState({ offersFilter: status });
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
		this.setState({
			state: STATES.VIEW,
			offer: offer
		});	
	}

	onCancel() {
		this.setState({
			state: STATES.LIST,
			offerStatus: null,
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
		let offers = Utils.filter(this.props.offers || [], this._filterOffer.bind(this));
		return offers.map(this._buildOffer.bind(this));
	}
	_filterOffer(offer) {
		if (this.state.offersFilter) {
			return (this.state.offersFilter === offer.status);
		}
		return true;
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
		switch (this.state.state) {
		case STATES.VIEW:
			return(
				<div>
					<br/>
					<OfferDetails
						offer={this.state.offer}
						service={this.props.services[this.state.serviceId]}
						customer={this.props.customers[this.state.customerId]}
						intervention={this.props.interventions[this.state.interventionId]}
						onClose={this.onCancel.bind(this)} />
				</div>
			);
		default:
			return (
				<div>
					<br/>
					<Panel header='Offres en cours'>
						<Row style={{textAlign:'center'}}>
							<ButtonGroup>
							    <APButton bsStyle='primary' onClick={this.onOffersFilter('').bind(this)} text='Toutes' />
							    <APButton bsStyle='info' onClick={this.onOffersFilter('PENDING').bind(this)} text='En attente' />
							    <APButton bsStyle='success' onClick={this.onOffersFilter('ACCEPTED').bind(this)} text='Acceptées' />
							    <APButton bsStyle='danger' onClick={this.onOffersFilter('REJECTED').bind(this)} text='Rejetées' />
							    <APButton onClick={this.onOffersFilter('EXPIRED').bind(this)} text='Expirées' />
							</ButtonGroup>
						</Row>
						<br/>
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
}

export default AuxiliaryOffers;