// Import React Core
import React from 'react';

import Dispatcher from '../../core/Dispatcher';
import StoreRegistry from '../../core/StoreRegistry';

import { ControlLabel, Button, FormControl, FormGroup, Form, Col, Panel, PageHeader } from 'react-bootstrap'

class ProfilEdit extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: StoreRegistry.getStore('AUXILIARY_STORE').getData('/auxiliary/' + StoreRegistry.getStore('LOGIN_STORE').getData('/name'))
		};
	}

	componentWillMount() {
        let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (!logged) {
			this.context.router.push('/login');
		}
    }
	
	handleChangePassword(e) { this.state.data.password = e.target.value; }
	handleChangeLastName(e) { this.state.data.lastName =  e.target.value; }
	handleChangeFirstName(e) { this.state.data.firstName =  e.target.value; }
	handleChangePhone(e) { this.state.data.phone =  e.target.value; }
	handleChangeBirthDate(e) { this.state.data.birthDate =  e.target.value; }
	handleChangeCivility(e) { this.state.data.civility =  e.target.value; }
	handleChangeDiploma(e) { this.state.data.diploma =  e.target.value; }
	
	update(event) {
		console.log(this.state.data);
		 this.state.token = StoreRegistry.getStore('LOGIN_STORE').getData('/token');
        event.preventDefault();
        Dispatcher.issue('PUT_AUXILIARY', this.state);
		this.context.router.push('/home');
	}

	render() { 
		return(
			<div className='container'>
			<PageHeader>Mon Profil <small>Edition</small></PageHeader>
		<Form horizontal onSubmit={this.update.bind(this)}>
			<FormGroup controlId='formHorizontalPassword'>
			  <Col componentClass={ControlLabel} sm={2}>
				Mot de passe
			  </Col>
			  <Col sm={10}>
				<FormControl type='password' onChange={this.handleChangePassword.bind(this)}/>
			  </Col>
			</FormGroup>

			<FormGroup controlId='formHorizontalName'>
			  <Col componentClass={ControlLabel} sm={2}>
				Nom
			  </Col>
			  <Col sm={10}>
				<FormControl type='text' defaultValue={this.state.data.lastName} onChange={this.handleChangeLastName.bind(this)}/>
			  </Col>
			</FormGroup>
			
			<FormGroup controlId='formHorizontalFirstName'>
			  <Col componentClass={ControlLabel} sm={2}>
				Prenom
			  </Col>
			  <Col sm={10}>
				<FormControl defaultValue={this.state.data.firstName} onChange={this.handleChangeFirstName.bind(this)}/>
			  </Col>
			</FormGroup>
			
			<FormGroup controlId='formHorizontalPhone'>
			  <Col componentClass={ControlLabel} sm={2}>
				Telephone
			  </Col>
			  <Col sm={10}>
				<FormControl type='text' defaultValue={this.state.data.phone} onChange={this.handleChangePhone.bind(this)}/>
			  </Col>
			</FormGroup>
			
			<FormGroup controlId='formHorizontalBirthDate'>
			  <Col componentClass={ControlLabel} sm={2}>
				Date de Naissance
			  </Col>
			  <Col sm={10}>
				<FormControl type='text' defaultValue={this.state.data.birthDate} onChange={this.handleChangeBirthDate.bind(this)}/>
			  </Col>
			</FormGroup>
			
			<FormGroup controlId='formHorizontalSex'>
			  <Col componentClass={ControlLabel} sm={2}>
				Civilite
			  </Col>
			  <Col sm={10}>
				<FormControl type='text' defaultValue={this.state.data.civility} onChange={this.handleChangeCivility.bind(this)}/>
			  </Col>
			</FormGroup>
			
			<FormGroup controlId='formHorizontalDiploma'>
			  <Col componentClass={ControlLabel} sm={2}>
				Diplome
			  </Col>
			  <Col sm={10}>
				<FormControl type='text' defaultValue={this.state.data.diploma} onChange={this.handleChangeDiploma.bind(this)}/>
			  </Col>
			</FormGroup>
			
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

ProfilEdit.contextTypes = {
	router: React.PropTypes.object
}
		
export default ProfilEdit;
