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
		this.state = {};
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
				contact: this.auxiliary.contact || this.props.auxiliary.contact,
				person: this.auxiliary.person || this.props.auxiliary.person,
				infos: this.auxiliary.infos || this.props.auxiliary.infos,
				user: user
			}
		}).
		then(function () {
			this.context.router.push('/home/infos');
		}.bind(this));
	}

	render() { 
		return (
		<Form horizontal>
			<div>
				<Col sm={12}>
					<Row>
						<Col sm={12}>
							<Button bsStyle='success' onClick={this.saveProfile.bind(this)} block>Enregistrer modifications</Button>
						</Col>
					</Row>
				</Col>
				<br/>
				<br/>
				<br/>
				<Col sm={9}>
					<Row>
						<Col sm={12}>
							<Panel header='Ma photo' bsStyle='info'>
								<AsyncImage 
									src={this.auxiliary.avatar || this.props.storeData.data.auxiliary.user.avatar} 
									width={200} 
									height={200}/>
								<ImageUploader onUploadComplete={this.onAvatarChanged.bind(this)}/>
							</Panel>
						</Col>
					</Row>
					<Row>
						<Col sm={12}>
							<Panel header='Informations personnelles' bsStyle='info'>
								<Col md={6}>
									<Person 
										edit={true}
										civility={this.props.auxiliary.person ? this.props.auxiliary.person.civility : 'Mr'}
										lastName={this.props.auxiliary.person ? this.props.auxiliary.person.lastName : ''}
										firstName={this.props.auxiliary.person ? this.props.auxiliary.person.firstName : ''}
										birthDate={this.props.auxiliary.person ? this.props.auxiliary.person.birthDate : []}
										birthCity={this.props.auxiliary.person ? this.props.auxiliary.person.birthPlace.city : ''}
										birthCountry={this.props.auxiliary.person ? this.props.auxiliary.person.birthPlace.country : ''}
										nationality={this.props.auxiliary.person ? this.props.auxiliary.person.nationality : ''}
										socialNumber={this.props.auxiliary.person ? this.props.auxiliary.person.socialNumber : ''}
										onChange={this.onPersonChanged.bind(this)}/>
								</Col>
								<Col md={6}>
									<Contact 
										edit={true}
										address={this.props.auxiliary.contact ? this.props.auxiliary.contact.address : {}}
										phone={this.props.auxiliary.contact ? this.props.auxiliary.contact.phone : ''}
										email={this.props.auxiliary.contact ? this.props.auxiliary.contact.email : ''}
										onChange={this.onContactChanged.bind(this)}/>
								</Col>
							</Panel>
							<AuxiliaryInfos
								edit={true}
								entrepreneur={this.props.auxiliary.infos ? this.props.auxiliary.infos.entrepreneur : false}
								diploma={this.props.auxiliary.infos ? this.props.auxiliary.infos.diploma : ''}
								description={this.props.auxiliary.infos ? this.props.auxiliary.infos.description : ''}
								onChange={this.onInfosChanged.bind(this)}/>
						</Col>
					</Row>
				</Col>
				<Col sm={3} className='hidden-xs'>
					<Panel>
						<APGauge value={75} title='Profil complété à :'/>
					</Panel>
				</Col>
			</div>
		</Form>
		);
	}
}

AuxiliaryEdit.contextTypes = {
	router: React.PropTypes.object
}

export default AuxiliaryEdit;