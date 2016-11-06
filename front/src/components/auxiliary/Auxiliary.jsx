import React from 'react'
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal, Button } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent'
import AuxiliaryHeader from 'components/auxiliary/AuxiliaryHeader'

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
		 	return Promise.all(promises);
		}.bind(this)).
		then(function () {
			return this.loadInterventions();
		}.bind(this)).
		then(function () {
			return this.loadOffers();
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
		);
	}
}
export default Auxiliary;