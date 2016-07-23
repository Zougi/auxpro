import React from 'react';
import { Button, Form, FormGroup, Panel, Grid, Row, Col } from 'react-bootstrap'
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';
// cuistom components
import AuxiliaryDetails from './AuxiliaryDetails.jsx'
import AuxiliaryQuestionnary from './AuxiliaryQuestionnary.jsx'
import Person from '../../common/entity/Person.jsx'
import Contact from '../../common/entity/Contact.jsx'

let STATES = {
	VIEW: 'VIEW',
	EDIT: 'EDIT',
	QUESTIONS: 'QUESTIONS'
};

class AuxiliaryProfile extends React.Component {

	constructor(props) {
		super(props);
		this.onComponentWillReceiveProps(props);
		this.state = { state: STATES.VIEW };
	}

	onComponentWillReceiveProps(props) {
		this.auxiliary = {};
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

	onPersonChanged(person) {
		this.auxiliary.person = person;
	}
	onContactChanged(contact) {
		this.auxiliary.contact = contact;
	}

	saveProfile(event) {
		event.preventDefault();
        Dispatcher.issue('PUT_AUXILIARY', {
			auxiliaryId: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
        	token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
        	data: {
				id: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
				person: this.auxiliary.person || this.props.auxiliary.person,
				contact: this.auxiliary.contact || this.props.auxiliary.contact,
				user: StoreRegistry.getStore('LOGIN_STORE').getData('/'),
				diploma: this.auxiliary.diploma || this.props.auxiliary.diploma
			}
        }).
        then(function () {
        	this.setStateView();
        }.bind(this));
	}

	render() { 
		return(
		<Form horizontal>
			<Grid>
				<Row>
					<Col md={9} mdPush={3}>
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
					<Col md={3} mdPull={9}>
						{(this.state.state === STATES.EDIT)
						?
							<Button bsStyle='success' onClick={this.saveProfile.bind(this)} block>Enregistrer modifications</Button>
						:
							<Button bsStyle='primary' onClick={this.setStateEdit.bind(this)}block>Editer mon profil</Button>
						}
						<br/>
						<Panel bsStyle='warning' header='Mes Diplômes'>
							{this.props.auxiliary.diploma}
    					</Panel>
    					<Button bsStyle='info' block>Questionnaire</Button>
						<br/>
						<Panel bsStyle='info' header='Mes Compétences'>
    					</Panel>
					</Col>
				</Row>
			</Grid>
		</Form>
		);
	}
}

/*



						




*/
export default AuxiliaryProfile;
