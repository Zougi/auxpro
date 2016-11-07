import React from 'react'
import { Row, Col, Panel, Button, Form } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher.js'
import StoreRegistry from 'core/StoreRegistry.js'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import ServiceDetails from './ServiceDetails.jsx'
import Contact from 'components/common/entity/Contact.jsx'
// Custom libs
import Utils from 'utils/Utils.js'

class ServiceProfile extends ServiceBaseComponent {

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
			service: this.getService()
		};
	}

	// Callbacks functions //
	// --------------------------------------------------------------------------------



	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { return(
		<Form horizontal>
			<Row>
				<Panel header='Mes informations'>
					<Col sm={6}>
						<ServiceDetails
							edit={false}
							society={this.state.service.society}
							socialReason={this.state.service.socialReason}
							siret={this.state.service.siret} />
					</Col>
					<Col sm={6}>
						<Contact
							edit={false}
							address={this.state.service.address}
							phone={this.state.service.phone}
							email={this.state.service.email} />
					</Col>
				</Panel>
			</Row>
		</Form>
	);}
}

export default ServiceProfile;
