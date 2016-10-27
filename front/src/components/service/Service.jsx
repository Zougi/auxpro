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
	}


	// State management functions //
	// --------------------------------------------------------------------------------

	componentWillMount() {
		if (!this.getLoginData('/logged')) {
			Dispatcher.issue('NAVIGATE', { path: '/login' });
			return;
		}
		if (!this.getServiceData('/data/service/user/tutoSkipped')) {
			Dispatcher.issue('NAVIGATE', { path: '/sad/tuto' });
			return;
		}
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