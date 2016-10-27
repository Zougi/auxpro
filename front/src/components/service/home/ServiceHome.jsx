import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap'
// Core modules
import StoreRegistry from 'core/StoreRegistry.js'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
// Custom libs
import Utils from 'utils/Utils.js'

class ServiceHome extends ServiceBaseComponent {
	
	constructor(props) {
		super(props);
		this.state = this._buildState();
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('SERVICE_STORE', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);
	}
	_onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		return {
			profileCompleted: this.getService().profileCompleted,
			service: this.getService(),
			auxiliaries: Utils.map(this.getAuxiliaries()),
			customers: Utils.map(this.getCustomers()),
			interventions: Utils.map(this.getInterventions())
		};
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------



	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { return(
		<Row>
		{ (this.state.profileCompleted) ?
			<Panel bsStyle='success' header='Statut profil'>
				Votre profil est actif.
			</Panel>
		:
			<Panel bsStyle='danger' header='Statut profil'>
				Votre profil est incomplet.
			</Panel>
		}
			<Panel>
				<Col sm={6} md={4}>
					<Panel header='Clients'>
						<strong><b>{this.state.customers.length}</b></strong>{' clients.'}
					</Panel>
				</Col>
				<Col sm={6} md={4}>
					<Panel header='Interventions'>
						<strong><b>{this.state.interventions.length}</b></strong>{' interventions.'}
					</Panel>
				</Col>
				<Col sm={6} md={4}>
					<Panel header='Auxiliaires'>
						<strong><b>{this.state.auxiliaries.length}</b></strong>{' auxiliaries.'}
					</Panel>
				</Col>
			</Panel>
		</Row>
	);}
}

export default ServiceHome;