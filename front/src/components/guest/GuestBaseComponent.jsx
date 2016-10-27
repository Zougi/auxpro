import React from 'react'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Lib modules
import Utils from 'utils/Utils'

class GuestBaseComponent extends React.Component {

	// Constructor //
	// --------------------------------------------------------------------------------

	constructor(props) {
		super(props);
		this.guestStore = StoreRegistry.getStore('GUEST_STORE');
	}


	// Basic sotre access //
	// --------------------------------------------------------------------------------

	_getGuestData(path) {
		return this.guestStore.getData(path);
	}
	_getBaseArgs() {
		return {
			token: Utils.encode('guest', 'guest')
		}
	}


	// Guest //
	// --------------------------------------------------------------------------------

	getGuestData(path) {
		return this._getGuestData(path ? path : '/');
	}


	// Services //
	// --------------------------------------------------------------------------------

	loadServices() {
		return Dispatcher.issue('GET_SERVICES', this._getBaseArgs());
	}
	getServices() {
		return this._getGuestData('/data/services');
	}
	getService(id) {
		return this._getGuestData('/data/services/' + id);
	}


	// Dummy renderer //

	render() {
		return('');
	}
}
export default GuestBaseComponent;
