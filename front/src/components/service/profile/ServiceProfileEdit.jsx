import React from 'react'
import { Row, Col, Panel, Button, Form } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher.js'
import StoreRegistry from 'core/StoreRegistry.js'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import AsyncImage from 'lib/image/AsyncImage.jsx'
import ImageUploader from 'lib/image/ImageUploader.jsx'
import ServiceDetails from './ServiceDetails.jsx'
import Contact from 'components/common/entity/Contact.jsx'

class ServiceProfileEdit extends ServiceBaseComponent {

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

	onAvatarChanged(avatar) {
		this.state.service.user.avatar = avatar;
		this.forceUpdate();
	}
	onServiceChanged(service) {
		this.state.service.society = service.society;
		this.state.service.socialReason = service.socialReason;
		this.state.service.siret = service.siret;
		this.forceUpdate();
	}
	onContactChanged(contact) {
		this.state.service.contact = contact;
		this.forceUpdate();
	}

	onSaveProfile() {
		this.updateService(this.state.service).
		then(function() {
			return this.loadService();
		}.bind(this)).
		then(function() {
			Dispatcher.issue('NAVIGATE', { path: '/sad/infos' });
		});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { return(
		<Form horizontal>
			<Row>
				<Button block bsStyle='success' onClick={this.onSaveProfile.bind(this)}>Enregistrer modifications</Button>
			</Row>
			<br/>
			<Row>
				<Panel header='Ma photo' bsStyle='info'>
					<AsyncImage
						src={this.state.service.user.avatar}
						width={200}
						height={200}/>
					<ImageUploader onUploadComplete={this.onAvatarChanged.bind(this)}/>
				</Panel>
					<Panel header='Mes informations'>
					<Col sm={6}>
						<ServiceDetails
							edit={true}
							society={this.state.service.society}
							socialReason={this.state.service.socialReason}
							siret={this.state.service.siret}
							onChange={this.onServiceChanged.bind(this)}/>
					</Col>
					<Col sm={6}>
						<Contact
							edit={true}
							address={this.state.service.contact.address}
							phone={this.state.service.contact.phone}
							email={this.state.service.contact.email}
							onChange={this.onContactChanged.bind(this)}/>
					</Col>
				</Panel>
			</Row>
		</Form>
	);}
}

export default ServiceProfileEdit;
