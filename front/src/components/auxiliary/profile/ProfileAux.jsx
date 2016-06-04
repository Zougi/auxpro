// react modules
import React from 'react';
// react-bootstrap modules
import { Button, Form, FormGroup, Panel, Grid, Row, Col } from 'react-bootstrap'
// cuistom components
import FormBase from '../../common/FormBase.jsx'
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';

class ProfileAux extends React.Component {

	constructor(props) {
		super(props);
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		let data = StoreRegistry.getStore('AUXILIARY_STORE').getData('/auxiliary/' + user.id);
		this.state = {
			edit: false,
			data: data,
			user: user
		};
	}

	handleChangePassword(e) { this.state.data.user.password = e.target.value; }

	handleChangeCivility(e) { this.state.data.person.civility = e.target.value; }
	handleChangeLastName(e) { this.state.data.person.lastName = e.target.value; }
	handleChangeFirstName(e) { this.state.data.person.firstName = e.target.value; }
	handleChangeBirthDate(e) { this.state.data.person.birthDate = e.target.value; }

	handleChangeSocialNumber(e) { this.state.data.person.socialNumber = e.target.value; }
	handleChangeCINumber(e) { this.state.data.person.ciNumber = e.target.value; }
	handleChangeNationality(e) { this.state.data.person.nationality = e.target.value; }

	handleChangeBirthCity(e) { this.state.data.person.birthPlace.city = e.target.value; }
	handleChangeBirthCountry(e) { this.state.data.person.birthPlace.country = e.target.value; }

	handleChangePhone(e) { this.state.data.contact.phone = e.target.value; }
	handleChangeEmail(e) { this.state.data.contact.email = e.target.value; }
	handleChangeAddress(e) { this.state.data.contact.address.address = e.target.value; }
	handleChangePostal(e) { this.state.data.contact.address.postalCode = e.target.value; }
	handleChangeCity(e) { this.state.data.contact.address.city = e.target.value; }

	handleChangeDiploma(e) { this.state.data.diploma = e.target.value; }

	editProfile(event) {
		event.preventDefault();
		this.state.edit = true;
		this.setState(this.state);
	}
	saveProfile(event) {
		event.preventDefault();
		this.state.edit = false;
		this.setState(this.state);
		var data = {
			person: this.state.data.person,
			contact: this.state.data.contact,
			user: this.state.data.user,
			diploma: this.state.data.diploma,
		}
		let params = {
			id: this.state.user.id,
        	data: data,
        	token: StoreRegistry.getStore('LOGIN_STORE').getData('/token')
        }
        console.log(params);
        Dispatcher.issue('PUT_AUXILIARY', params);
	}

	render() { 
		return(
		<Form horizontal>
			<Grid>
				<Row>
					<Col md={3}>
						{this.state.edit
						?
							<Button bsStyle='success' onClick={this.saveProfile.bind(this)} block>Enregistrer modifications</Button>
						:
							<Button bsStyle='primary' onClick={this.editProfile.bind(this)}block>Editer mon profil</Button>
						}
						
						<br/>
						<Panel bsStyle='warning' header='Mes Diplômes'>
							{this.state.data.diploma}
    					</Panel>
						<Button bsStyle='info' block>Questionnaire</Button>
						<br/>
						<Panel bsStyle='info' header='Mes Compétences'>
    					</Panel>
					</Col>
					<Col md={9}>
						<Panel header='Informations personnelles' className='small'>
							<Col sm={6}>
								<FormBase 
									static={!this.state.edit}
									title='Civilité' 
									labelSize={5}
									defaultValue={this.state.data.person.civility} 
									onChange={this.handleChangeCivility.bind(this)}/>
								<FormBase 
									static={!this.state.edit}
									title='Nom de famille' 
									labelSize={5}
									defaultValue={this.state.data.person.lastName} 
									onChange={this.handleChangeLastName.bind(this)}/>
								<FormBase
									static={!this.state.edit}
									title='Prénom' 
									labelSize={5}
									defaultValue={this.state.data.person.firstName} 
									onChange={this.handleChangeFirstName.bind(this)}/>
								<FormBase
									static={!this.state.edit}
									title='Date de Naissance' 
									labelSize={5}
									defaultValue={this.state.data.person.birthDate} 
									onChange={this.handleChangeBirthDate.bind(this)}/>
							</Col>
							<Col sm={6}>
								<FormBase
									static={!this.state.edit}
									title='Téléphone' 
									labelSize={5}
									defaultValue={this.state.data.contact.phone} 
									onChange={this.handleChangePhone.bind(this)}/>
								<FormBase
									static={!this.state.edit}
									title='Addresse'
									labelSize={5}
									defaultValue={this.state.data.contact.address.address} 
									onChange={this.handleChangeAddress.bind(this)}/>
								<FormBase
									static={!this.state.edit}
									title='Code postal'
									labelSize={5}
									defaultValue={this.state.data.contact.address.postalCode} 
									onChange={this.handleChangePostal.bind(this)}/>
								<FormBase
									static={!this.state.edit}
									title='Ville' 
									labelSize={5}
									defaultValue={this.state.data.contact.address.city} 
									onChange={this.handleChangeCity.bind(this)}/>
								<FormBase
									static={!this.state.edit}
									title='Email'
									labelSize={5}
									defaultValue={this.state.data.contact.email} 
									onChange={this.handleChangeEmail.bind(this)}/>
							</Col>
						</Panel>
						<Panel header='Etat civil' className='small'>
							<Col sm={6}>
								<FormBase
									static={!this.state.edit}
									title='N° Sécurité Sociale'
									labelSize={5}
									defaultValue={this.state.data.person.socialNumber} 
									onChange={this.handleChangeSocialNumber.bind(this)}/>
								<FormBase
									static={!this.state.edit}
									title='Nationalité' 
									labelSize={5}
									defaultValue={this.state.data.person.nationality} 
									onChange={this.handleChangeNationality.bind(this)}/>
								<FormBase
									static={!this.state.edit}
									title='N° CI ou CS' 
									labelSize={5}
									defaultValue={this.state.data.person.ciNumber} 
									onChange={this.handleChangeCINumber.bind(this)}/>
							</Col>
						</Panel>
					</Col>
				</Row>
			</Grid>
		</Form>
		);
	}
}
		
export default ProfileAux;
