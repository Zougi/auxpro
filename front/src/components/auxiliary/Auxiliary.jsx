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
	}
	

	// State management functions //
	// --------------------------------------------------------------------------------

	componentWillMount() {
		if (!this.getLoginData('/logged')) {
			Dispatcher.issue('NAVIGATE', { path: '/login' });
			return;
		}
		if (!this.getAuxiliaryData('/data/auxiliary/profileCompleted')) {
			Dispatcher.issue('NAVIGATE', { path: '/aux/infos/edit' });
			return;
		}
		if (!this.getAuxiliaryData('/data/auxiliary/user/tutoSkipped')) {
			Dispatcher.issue('NAVIGATE', { path: '/aux/tuto' });
			return;
		}
	}
	componentDidMount() {
	 	StoreRegistry.register('AUXILIARY_STORE/display/home/showUserHeader', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('AUXILIARY_STORE', this);
	}
	_onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		return {
			showUserHeader: this._getAuxiliaryData('/display/home/showUserHeader'),
		}
	}
	

	// Callback functions //
	// --------------------------------------------------------------------------------

	onTutoClose() {
		this.setState({ showTuto: false });
	}
	onTutoSkip() {
		this.setState({ showTuto: false });
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { 
		return (
			<div className='container'>
				{this.state.showUserHeader ? 
					<Row>
						<AuxiliaryHeader />
					</Row>
				:
					''
				}
				<Row>
					{this.props.children}
				</Row>
			</div>
		);
	}
}
export default Auxiliary;