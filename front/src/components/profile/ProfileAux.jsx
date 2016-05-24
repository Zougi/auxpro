// react modules
import React from 'react';
// react-bootstrap modules
import { Button, Form, FormGroup, Panel, Col } from 'react-bootstrap'
// cuistom components
import FormBase from '../common/FormBase.jsx'
// core modules
import Dispatcher from '../../core/Dispatcher';
import StoreRegistry from '../../core/StoreRegistry';

class ProfileAux extends React.Component {

	constructor(props) {
		super(props);
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		this.state = {
			edit: false,
			data: StoreRegistry.getStore('AUXILIARY_STORE').getData('/auxiliary/' + user.id)
		};
	}

	handleChangePassword(e) { this.state.data.user.password = e.target.value; }

	handleChangeCivility(e) { this.state.data.person.civility = e.target.value; }
	handleChangeLastName(e) { this.state.data.person.lastName = e.target.value; }
	handleChangeFirstName(e) { this.state.data.person.firstName = e.target.value; }
	handleChangeBirthDate(e) { this.state.data.person.birthDate = e.target.value; }
	handleChangeBirthPlace(e) { this.state.data.person.birthPlace = e.target.value; }

	handleChangePhone(e) { this.state.data.contact.phone = e.target.value; }
	handleChangeEmail(e) { this.state.data.contact.phone = e.target.value; }
	handleChangeAddress(e) { this.state.data.contact.address.address = e.target.value; }
	handleChangePostal(e) { this.state.data.contact.address.postalCode = e.target.value; }
	handleChangeCity(e) { this.state.data.contact.address.city = e.target.value; }

	handleChangeDiploma(e) { this.state.data.diploma =  e.target.value; }


	update(event) {
        event.preventDefault();
        console.log(this.state.data);
        /*
        let params = {
        	data: this.state.data,
        	token: StoreRegistry.getStore('LOGIN_STORE').getData('/token')
        }
        Dispatcher.issue('PUT_AUXILIARY', this.state);
        */
	}

	render() { 
		return(
			<div className='container'>
				<Form horizontal onSubmit={this.update.bind(this)}>

					<Panel header="Information personnelles">
						<FormBase title='Civilité' defaultValue={this.state.data.person.civility} onChange={this.handleChangeCivility.bind(this)}/>
						<FormBase title='Nom' defaultValue={this.state.data.person.lastName} onChange={this.handleChangeLastName.bind(this)}/>
						<FormBase title='Prénom' defaultValue={this.state.data.person.firstName} onChange={this.handleChangeFirstName.bind(this)}/>
						<FormBase title='Date de Naissance' defaultValue={this.state.data.person.birthDate} onChange={this.handleChangeBirthDate.bind(this)}/>
						<FormBase title='Lieu de Naissance' defaultValue={this.state.data.person.birthPlace} onChange={this.handleChangeBirthPlace.bind(this)}/>
					</Panel>

					<Panel header="Coordonnées">
						<FormBase title='Addresse électroinique' defaultValue={this.state.data.contact.email} onChange={this.handleChangeEmail.bind(this)}/>
						<FormBase title='Téléphone' defaultValue={this.state.data.contact.phone} onChange={this.handleChangePhone.bind(this)}/>
						<FormBase title='Addresse' defaultValue={this.state.data.contact.address.address} onChange={this.handleChangeAddress.bind(this)}/>
						<FormBase title='Code postal' defaultValue={this.state.data.contact.address.postalCode} onChange={this.handleChangePostal.bind(this)}/>
						<FormBase title='Ville' defaultValue={this.state.data.contact.address.city} onChange={this.handleChangeCity.bind(this)}/>
					</Panel>

					<Panel header="Expériences">
						<FormBase title='Diplôme' defaultValue={this.state.data.diploma} onChange={this.handleChangeDiploma.bind(this)}/>
					</Panel>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button type='submit' bsStyle='success'>
								Valider
							</Button>
						</Col>
					</FormGroup>

				</Form>
			</div>
		);
	}
}

ProfileAux.contextTypes = {
	router: React.PropTypes.object
}
		
export default ProfileAux;
