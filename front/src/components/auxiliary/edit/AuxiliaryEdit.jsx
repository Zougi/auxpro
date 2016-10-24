import React from 'react';
import { Button, Form, FormGroup, Panel, Grid, Row, Col } from 'react-bootstrap'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import AuxiliaryInfos from './AuxiliaryInfos.jsx'
import AuxiliaryHeader from '../AuxiliaryHeader.jsx'
import Person from 'components/common/entity/Person.jsx'
import Contact from 'components/common/entity/Contact.jsx'
import SkillSummaryList from 'components/common/skills/SkillSummaryList.jsx'
import APGauge from 'components-lib/charts/APGauge.jsx'
import AsyncImage from 'lib/image/AsyncImage.jsx'
import ImageUploader from 'lib/image/ImageUploader.jsx'


class AuxiliaryEdit extends React.Component {

	constructor(props) {
		super(props);
		this.auxiliary = {};
		this.state = {
			auxiliary: StoreRegistry.getStore('AUXILIARY_STORE').getData('/data/auxiliary')
		};
	}

	componentDidMount() {
	 	StoreRegistry.register('AUXILIARY_STORE', this, this.onStoreUpdate.bind(this));
    }
    
    componentWillUnmount() {
        StoreRegistry.unregister('AUXILIARY_STORE', this);
    }
	
	onStoreUpdate() {
		this.setState({ 
			auxiliary: StoreRegistry.getStore('AUXILIARY_STORE').getData('/data/auxiliary')
		});
    }
	
	componentWillReceiveProps() {
		this.auxiliary = {};
	}

	onAvatarChanged(avatar) {
		this.auxiliary.avatar = avatar;
		this.setState({});
	}
	onPersonChanged(person) {
		this.auxiliary.person = person;
	}
	onContactChanged(contact) {
		this.auxiliary.contact = contact;
	}
	onInfosChanged(infos) {
		this.auxiliary.infos = infos;
	}

	saveProfile(event) {
		event.preventDefault();
		var user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		user.avatar = this.auxiliary.avatar || user.avatar;
		Dispatcher.issue('PUT_AUXILIARY', {
			auxiliaryId: user.id,
			token: user.token,
			data: {
				id: user.id,
				contact: this.auxiliary.contact || this.state.auxiliary.contact,
				person: this.auxiliary.person || this.state.auxiliary.person,
				infos: this.auxiliary.infos || this.state.auxiliary.infos,
				user: user
			}
		}).
		then(function () {
			this.context.router.push('/aux/infos');
		}.bind(this));
	}

	render() { 
		return (
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
					<Button bsStyle='success' onClick={this.saveProfile.bind(this)} block>Enregistrer modifications</Button>
				</Col>
			</Row>
			<br/>
			<Row>
				<Col sm={9}>
					<Panel header='Ma photo' bsStyle='info'>
						<AsyncImage 
							src={this.auxiliary.avatar || this.state.auxiliary.user.avatar} 
							width={200} 
							height={200}/>
						<ImageUploader onUploadComplete={this.onAvatarChanged.bind(this)}/>
					</Panel>
					<Panel header='Informations personnelles' bsStyle='info'>
						<Col md={6}>
							<Person 
								edit={true}
								civility={this.state.auxiliary.person ? this.state.auxiliary.person.civility : 'Mr'}
								lastName={this.state.auxiliary.person ? this.state.auxiliary.person.lastName : ''}
								firstName={this.state.auxiliary.person ? this.state.auxiliary.person.firstName : ''}
								birthDate={this.state.auxiliary.person ? this.state.auxiliary.person.birthDate : []}
								birthCity={this.state.auxiliary.person ? this.state.auxiliary.person.birthPlace.city : ''}
								birthCountry={this.state.auxiliary.person ? this.state.auxiliary.person.birthPlace.country : ''}
								nationality={this.state.auxiliary.person ? this.state.auxiliary.person.nationality : ''}
								socialNumber={this.state.auxiliary.person ? this.state.auxiliary.person.socialNumber : ''}
								onChange={this.onPersonChanged.bind(this)}/>
						</Col>
						<Col md={6}>
							<Contact 
								edit={true}
								address={this.state.auxiliary.contact ? this.state.auxiliary.contact.address : {}}
								phone={this.state.auxiliary.contact ? this.state.auxiliary.contact.phone : ''}
								email={this.state.auxiliary.contact ? this.state.auxiliary.contact.email : ''}
								onChange={this.onContactChanged.bind(this)}/>
						</Col>
					</Panel>
					<AuxiliaryInfos
						edit={true}
						entrepreneur={this.state.auxiliary.infos ? this.state.auxiliary.infos.entrepreneur : false}
						diploma={this.state.auxiliary.infos ? this.state.auxiliary.infos.diploma : ''}
						description={this.state.auxiliary.infos ? this.state.auxiliary.infos.description : ''}
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

AuxiliaryEdit.contextTypes = {
	router: React.PropTypes.object
}

export default AuxiliaryEdit;