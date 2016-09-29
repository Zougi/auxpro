import React from 'react';
import { Button, Form, FormGroup, Panel, Grid, Row, Col } from 'react-bootstrap'
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// cuistom components
import AuxiliaryHeader from '../AuxiliaryHeader.jsx'
import AuxiliaryDetails from './AuxiliaryDetails.jsx'
import AuxiliaryQuestionnary from './AuxiliaryQuestionnary.jsx'
import Person from 'components/common/entity/Person.jsx'
import Contact from 'components/common/entity/Contact.jsx'
import SkillSummaryList from 'components/common/skills/SkillSummaryList.jsx'
import AsyncImage from 'lib/image/AsyncImage.jsx'
import ImageUploader from 'lib/image/ImageUploader.jsx'

let STATES = {
	VIEW: 'VIEW',
	EDIT: 'EDIT',
	QUESTIONS: 'QUESTIONS'
};

class AuxiliaryProfile extends React.Component {

	constructor(props) {
		super(props);
		this.auxiliary = {};
		this.state = { state: props.edit ? STATES.EDIT : STATES.VIEW };
	}

	componentWillReceiveProps(props) {
		this.auxiliary = {};
		this.setState({ state: props.edit ? STATES.EDIT : STATES.VIEW });
	}

	setStateView(event) {
		if (event) event.preventDefault();
		this.setState({ state: STATES.VIEW });
	}
	setStateEdit(event) {
		if (event) event.preventDefault();
		this.setState({ state: STATES.EDIT });
	}
	setStateQuestions(event) {
		if (event) event.preventDefault();
		this.setState({ state: STATES.QUESTIONS });
	}

	onAvatarChanged(avatar) {
		this.auxiliary.avatar = avatar;
	}
	onPersonChanged(person) {
		this.auxiliary.person = person;
	}
	onContactChanged(contact) {
		this.auxiliary.contact = contact;
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
				person: this.auxiliary.person || this.props.auxiliary.person,
				contact: this.auxiliary.contact || this.props.auxiliary.contact,
				user: user,
				diploma: this.auxiliary.diploma || this.props.auxiliary.diploma
			}
        }).
        then(function () {
        	this.setStateView();
        }.bind(this));
	}

	render() { 
		if (this.state.state === STATES.QUESTIONS) {
			return (
				<AuxiliaryQuestionnary onClose={this.setStateView.bind(this)}/>
			);
		}
		return (
		<Form horizontal>
			<br/>
			<Col sm={12}>
			{ (this.state.state === STATES.EDIT) ?
				<div style={{textAlign:'right'}}>
					<Button bsStyle='default' onClick={this.setStateView.bind(this)}>Annuler</Button>
					{' '}
					<Button bsStyle='success' onClick={this.saveProfile.bind(this)}>Enregistrer modifications</Button>
				</div>
			:
				<div style={{textAlign:'right'}}>
					<Button bsStyle='primary' onClick={this.setStateEdit.bind(this)}>Editer mon profil</Button>
				</div>
			}
			</Col>
			<br/>
			<br/>
			<div>
				<Col md={9}>
					<Row>
						<Col sm={12}>
							<AuxiliaryHeader 
								auxiliary={this.props.auxiliary}
								onAvatarChanged={this.onAvatarChanged.bind(this)}
								edit={this.state.state === STATES.EDIT}/>
						</Col>
					</Row>
					<Row>
						<Col sm={6}>
							<Panel bsStyle='info' header='Ajouter une expérience'>
								Décrivez vos expériences professionnelles pour mettre en évidence vos compétences.
							</Panel>
						</Col>
						<Col sm={6}>
							<Panel bsStyle='info' header="Mes zones d'intervention">
								Spécifiez vos zones d'intervention afin de vous voir proposez des missions adaptées.
							</Panel>
						</Col>
					</Row>
					<Row>
						<Col sm={12}>
							<Panel header='Informations personnelles' bsStyle='info'>
								<Col sm={6}>
									<Person 
		            					edit={this.state.state === STATES.EDIT}
			            				civility={this.props.auxiliary.person ? this.props.auxiliary.person.civility : 'Mr'}
			            				lastName={this.props.auxiliary.person ? this.props.auxiliary.person.lastName : ''}
			            				firstName={this.props.auxiliary.person ? this.props.auxiliary.person.firstName : ''}
			            				birthDate={this.props.auxiliary.person ? this.props.auxiliary.person.birthDate : []}
			            				birthCity={this.props.auxiliary.person ? this.props.auxiliary.person.birthPlace.city : ''}
			            				birthCountry={this.props.auxiliary.person ? this.props.auxiliary.person.birthPlace.country : ''}
			            				nationality={this.props.auxiliary.person ? this.props.auxiliary.person.nationality : ''}
			            				socialNumber={this.props.auxiliary.person ? this.props.auxiliary.person.socialNuber : ''}
			            				onChange={this.onPersonChanged.bind(this)}/>
								</Col>
								<Col sm={6}>
									<Contact 
			            				edit={this.state.state === STATES.EDIT}
			            				address={this.props.auxiliary.contact ? this.props.auxiliary.contact.address : {}}
			            				phone={this.props.auxiliary.contact ? this.props.auxiliary.contact.phone : ''}
			            				email={this.props.auxiliary.contact ? this.props.auxiliary.contact.email : ''}
			            				onChange={this.onContactChanged.bind(this)}/>
								</Col>
							</Panel>
						</Col>
					</Row>
				</Col>
				<Col md={3}>
					<Panel>
						<br/>
						<Panel bsStyle='warning' header='Mes Diplômes'>
							{this.props.auxiliary.diploma}
						</Panel>
						<Button bsStyle='info' block onClick={this.setStateQuestions.bind(this)}>Questionnaire</Button>
						<br/>
						<Panel bsStyle='info' header='Mes Compétences'>
							<SkillSummaryList skills={this.props.auxiliary.skills}/>
						</Panel>
					</Panel>
				</Col>
			</div>
		</Form>
		);
	}
}
export default AuxiliaryProfile;

