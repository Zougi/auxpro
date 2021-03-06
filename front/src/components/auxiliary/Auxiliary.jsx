import React from 'react'
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent'
import AuxiliaryHeader from 'components/auxiliary/AuxiliaryHeader'

import Navbar from 'components-lib/Navbar/Navbar.jsx'

import HeaderData from './HeaderData.js'

class Auxiliary extends AuxiliaryBaseComponent {

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

		this.loadAuxiliary().
		then(function () {
			var promises = [];
		 	promises.push(this.loadGeozones());
		 	promises.push(this.loadIndisponibilities());
		 	promises.push(this.loadCustomers());
		 	promises.push(this.loadServices());
		 	promises.push(this.loadInterventions());
		 	promises.push(this.loadOffers());
		 	promises.push(this.loadMissions());
			return Promise.all(promises);
		}.bind(this)).
		then(function () {
			this.setState({ dataLoaded: true });
			console.log('==== DONNES INITIALE AUXILIAIRE ====');
			console.log(this.getAuxiliaryData());
			if (!this.getAuxiliaryData('/data/auxiliary/profileCompleted')) {
				Dispatcher.issue('NAVIGATE', { path: '/aux/infos/edit' });
				return;
			}
			if (!this.getAuxiliaryData('/data/auxiliary/tutoSkipped')) {
				Dispatcher.issue('NAVIGATE', { path: '/aux/tuto' });
				return;
			}
		}.bind(this)).
		catch(function (error) {
			console.error("erreur au chargement de l'auxiliare");
			console.error(error);
		});
	}
	componentDidMount() {
	 	StoreRegistry.register('AUXILIARY_STORE/display/home/showUserHeader', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('AUXILIARY_STORE', this);
	}
	_onStoreUpdate() {
		this.setState({ showUserHeader: this.getAuxiliaryData('/display/home/showUserHeader') });
	}
	_buildState() {
		return {
			showUserHeader: this.getAuxiliaryData('/display/home/showUserHeader'),
		}
	}
	
	// Rendering functions //
	// --------------------------------------------------------------------------------
	
	render() { 
		if (!this.state.dataLoaded) {
			return ( <div className='container'/> );
		}
		return (
			<div>
				<header className='no-print'>
					<Navbar {...HeaderData} />
				</header>
				<div className='container'>
					{this.state.showUserHeader ? 
						<Row>
							<AuxiliaryHeader />
						</Row>
					: '' }
					<Row>
						{this.props.children}
					</Row>
				</div>
			</div>
		);
	}
}
export default Auxiliary;