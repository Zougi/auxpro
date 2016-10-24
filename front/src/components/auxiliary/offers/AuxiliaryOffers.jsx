import React from 'react';
import { Panel, Row, Clearfix, ButtonGroup } from 'react-bootstrap';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
import Utils from 'utils/Utils.js'
// custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import { APButton } from 'lib/Lib.jsx';
import AuxiliaryOfferSummary from './AuxiliaryOfferSummary.jsx'
import DialogConfirmation from 'components-lib/DialogConfirmation/DialogConfirmation.jsx';

class AuxiliaryOffers extends AuxiliaryBaseComponent {
	
	constructor(props) {
		super(props);
		this.state = this._buildState();
		this.state.offersFilter = '';
	}
	
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
		this.context.router.push('/aux/offres/' + offer.id);
	}

	onAccept() {
		this._updateOffer(this.state.offer);
	}
	onCancel() {
		this.setState({
			confirmAccept: false,
			confirmReject: false,
			offerStatus: 'PENDING',
			offer: null
		});
	}

	_updateOffer(offer) {
		offer.status = this.state.offerStatus;
        this.updateOffer(offer).
        then(function () {
        	this.onCancel();
        }.bind(this)).
        catch(function (error) {
        	offer.status = 'PENDING';
        	console.log(error);
        });
	}

	_buildOffers() {
		let offers = Utils.filter(this.state.offers || [], this._filterOffer.bind(this));
		let l = offers.length;
		let result = [];
		for (let i = 0; i < l; i++) {
			let offer = offers[i];
			result.push(
				<AuxiliaryOfferSummary 
					key={offer.id} 
					service={this.state.services[offer.serviceId]}
					customer={this.state.customers[offer.customerId]}
					intervention={this.state.interventions[offer.interventionId]}
					offer={offer}
					onAccept={this.onOfferAccept.bind(this)}
					onReject={this.onOfferReject.bind(this)}
					onView={this.onOfferView.bind(this)} />
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
	_filterOffer(offer) {
		if (this.state.offersFilter) {
			return (this.state.offersFilter === offer.status);
		}
		return true;
	}

	render() { 
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
                    onConfirm={this.onAccept.bind(this)}
                    confirmStyle='success'
                    confirmText='Accepter'
                    onCancel={this.onCancel.bind(this)}
                    cancelStyle='default'
                    cancelText='Annuler' />
                <DialogConfirmation
                    show={this.state.confirmReject}
                    title="Rejeter l'offre"
                    onConfirm={this.onAccept.bind(this)}
                    confirmStyle='danger'
                    confirmText='Rejeter'
                    onCancel={this.onCancel.bind(this)}
                    cancelStyle='default'
                    cancelText='Annuler' />
	        </div>
		);
	}
}

AuxiliaryOffers.contextTypes = {
	router: React.PropTypes.object
}

export default AuxiliaryOffers;