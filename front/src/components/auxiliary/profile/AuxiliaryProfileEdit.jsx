import React from 'react';
import { Button, Form, FormGroup, Panel, Grid, Row, Col } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import AuxiliaryInfos from './AuxiliaryInfos.jsx'
import AuxiliaryHeader from '../AuxiliaryHeader.jsx'
import Person from 'components/common/entity/Person.jsx'
import Contact from 'components/common/entity/Contact.jsx'
import SkillSummaryList from 'components/common/skills/SkillSummaryList.jsx'
import APGauge from 'components-lib/charts/APGauge.jsx'
import AsyncImage from 'lib/image/AsyncImage.jsx'
import ImageUploader from 'lib/image/ImageUploader.jsx'

class AuxiliaryProfileEdit extends AuxiliaryBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('AUXILIARY_STORE', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('AUXILIARY_STORE', this);
	}
	_onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		let auxiliary = this.getAuxiliary();
		auxiliary.contact = auxiliary.contact || {};
		auxiliary.person = auxiliary.person || {};
		auxiliary.infos = auxiliary.infos || {};
		auxiliary.user = auxiliary.user || {};
		return { auxiliary: auxiliary };
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onAvatarChanged(avatar) {
		this.state.auxiliary.user.avatar = avatar;
		this.forceUpdate();
	}
	onPersonChanged(person) {
		this.state.auxiliary.person = person;
		this.forceUpdate();
	}
	onContactChanged(contact) {
		this.state.auxiliary.contact = contact;
		this.forceUpdate();
	}
	onInfosChanged(infos) {
		this.state.auxiliary.infos = infos;
		this.forceUpdate();
	}

	onSaveProfile() {
		this.updateAuxiliary(this.state.auxiliary).
		then(function() {
			return this.loadAuxiliary();
		}.bind(this)).
		then(function() {
			Dispatcher.issue('NAVIGATE', { path: '/aux/infos' });
		});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { return (
		<Form horizontal>
		{ !(this.state.auxiliary.profileCompleted) ?
			<Row>
				<Col sm={12}>
					<Panel bsStyle='danger' header='Statut profil'>
						<p>Votre profil est incomplet.</p>
						<p>Vous devez compléter votre profil afin de pouvoir utiliser nos services.</p>
						<p>Veuillez remplir les informations obligatoires ci-dessous.</p>
					</Panel>
				</Col>
			</Row>
		: '' }
			<Row>
				<Col sm={12}>
					<Button bsStyle='success' onClick={this.onSaveProfile.bind(this)} block>Enregistrer modifications</Button>
				</Col>
			</Row>
			<br/>
			<Row>
				<Col sm={9}>
					<Panel header='Ma photo' bsStyle='info'>
						<AsyncImage 
							src={this.state.auxiliary.user.avatar} 
							width={200} 
							height={200}/>
						<ImageUploader onUploadComplete={this.onAvatarChanged.bind(this)}/>
					</Panel>
					<Panel header='Informations personnelles' bsStyle='info'>
						<Col md={6}>
							<Person 
								edit={true}
								civility={this.state.auxiliary.person.civility}
								lastName={this.state.auxiliary.person.lastName}
								firstName={this.state.auxiliary.person.firstName}
								birthDate={this.state.auxiliary.person.birthDate}
								birthCity={this.state.auxiliary.person.birthPlace.city}
								birthCountry={this.state.auxiliary.person.birthPlace.country}
								nationality={this.state.auxiliary.person.nationality}
								socialNumber={this.state.auxiliary.person.socialNumber}
								ciNumber={this.state.auxiliary.person.ciNumber}
								onChange={this.onPersonChanged.bind(this)}/>
						</Col>
						<Col md={6}>
							<Contact 
								edit={true}
								address={this.state.auxiliary.contact.address}
								phone={this.state.auxiliary.contact.phone}
								email={this.state.auxiliary.contact.email}
								onChange={this.onContactChanged.bind(this)}/>
						</Col>
					</Panel>
					<AuxiliaryInfos
						edit={true}
						entrepreneur={this.state.auxiliary.infos.entrepreneur}
						diploma={this.state.auxiliary.infos.diploma}
						description={this.state.auxiliary.infos.description}
						onChange={this.onInfosChanged.bind(this)}/>
				</Col>
				<Col sm={3} className='hidden-xs'>
					<Panel>
						<APGauge value={75} title='Profil complété à :'/>
					</Panel>
				</Col>
			</Row>
		</Form>
		);
	}
}
export default AuxiliaryProfileEdit;