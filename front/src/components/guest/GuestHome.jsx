import React from 'react';
// Core module
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// Custom components
import GuestBaseComponent from 'components/guest/GuestBaseComponent.jsx';
import ServicesBox from 'components/common/services/ServicesBox.jsx';
// Lib modules
import Utils from 'utils/Utils.js';

class GuestHome extends GuestBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
		this.state.dataLoaded = false;
	}


	// State management functions //
	// --------------------------------------------------------------------------------

	componentWillMount() {
		this.loadServices().
		then(function () {
			this.setState({ dataLoaded: true });
			console.log('==== DONNES INITIALE GUEST ====');
			console.log(this.getGuestData());
		}.bind(this)).
		catch(function (error) {
			console.error('erreur au chargement des données invité');
			console.error(error);
		});
	}
	componentDidMount() {
	 	StoreRegistry.register('GUEST_STORE/display/postalCode', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('GUEST_STORE', this);
	}
	_onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		console.log('notify')
		return {
			postalCode: this.getGuestData('/display/postalCode'),
		}
	}

	// Rendering functions //
	// --------------------------------------------------------------------------------	

	_buildServices() {
		return Utils.map(this.getServices()).filter(function(service) {
			if (this.state.postalCode) {
				return service.contact.address.postalCode === Number(this.state.postalCode);
			}
			return true;
		}.bind(this));
	}

	render() {
		if (!this.state.dataLoaded) {
			return ( <div className='container'/> );
		}
		return(
			<div className='container'>
				<ServicesBox services={this._buildServices()} />
			</div>
		);
	}
}
export default GuestHome;