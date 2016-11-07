import React from 'react'
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal, Button } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import ServiceHeader from 'components/service/ServiceHeader'

class Service extends ServiceBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
		this.state.dataLoaded = false;
	}


	// State management functions //
	// --------------------------------------------------------------------------------

	componentWillMount() {
		if (!this.getLoginData('/logged')) {
			Dispatcher.issue('NAVIGATE', { path: '/login' });
			return;
		}

		this.loadService().
		then(function () {
			return this.loadCustomers();
		}.bind(this)).
		then(function () {
			return this.loadInterventions();
		}.bind(this)).
		then(function () {
			return this.loadOffers();
		}.bind(this)).
		then(function () {
			return this.loadAuxiliaries();
		}.bind(this)).
		then(function () {
			this.setState({ dataLoaded: true });
			console.log('==== DONNES INITIALE DU SERVICE ====');
			console.log(StoreRegistry.getStore('SERVICE_STORE').getData());
			if (!this.getServiceData('/data/service/profileCompleted')) {
				Dispatcher.issue('NAVIGATE', { path: '/sad/infos/edit' });
				return;
			}
			if (!this.getServiceData('/data/service/tutoSkipped')) {
				Dispatcher.issue('NAVIGATE', { path: '/sad/tuto' });
				return;
			}
		}.bind(this)).
		catch(function (error) {
			console.error("erreur au chargement de l'auxiliare");
			console.error(error);
		});
	}
	componentDidMount() {
		StoreRegistry.register('SERVICE_STORE/display/home/showUserHeader', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);
	}	
	_onStoreUpdate() {
		this.setState(this._buildState());
	}

	_buildState() {
		return {
			showUserHeader: this.getServiceData('/display/home/showUserHeader'),
		}
	}

	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() {
		if (!this.state.dataLoaded) {
			return ( <div className='container'/> );
		}
		return(
			<div className='container'>
				{this.state.showUserHeader ? 
					<Row>
						<ServiceHeader />
					</Row>
				: '' }
				<Row>
					{this.props.children}
				</Row>
			</div>
		);
	}
}
export default Service;