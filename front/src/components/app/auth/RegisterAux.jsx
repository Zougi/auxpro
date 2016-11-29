import React from 'react';
import { Panel, Form, FormGroup, FormControl, ControlLabel, Grid, Row, Col } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher';
// Custom components
import { APButton } from 'ap-react-bootstrap'

class RegisterAux extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			error: ''
		};
	}


	// Callback functions //
	// --------------------------------------------------------------------------------

	onCancel(event) {
		event.preventDefault();
		Dispatcher.issue('NAVIGATE', { path: '/' });
	}
	onSubmit(event) {
		event.preventDefault();
		if (this.state.pass === this.state.confirm) {
			let params = {
				name: this.state.user,
				email: this.state.user,
				password: this.state.pass
			};
			Dispatcher.issue('POST_AUXILIARY', params).
			then(function () {
				console.log('utilisateur créé');
				let params = {
					user: this.state.user, 
					pass: this.state.pass
				};
				return Dispatcher.issue('LOGON', params);
			}.bind(this)).
			then(function () {
				Dispatcher.issue('NAVIGATE', { path: '/aux' });
			}).
			catch(function (error) {
				console.log(error);
				this.setState({ error: 'Erreur lors de la création d\'un utilisateur' });
			}.bind(this));
		} else {
			this.setState({ error: 'Erreur Confimer mot de passe' });
		}
	}

	handleEmailChanged(event) {
		event.preventDefault();
		this.state.user = event.target.value;
	}
	handlePasswordChanged(event) {
		event.preventDefault();
		this.state.pass = event.target.value;
	}
	handleConfirmChanged(event) {
		event.preventDefault();
		this.state.confirm = event.target.value;
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { return (
		<div className="container">
			<br/>
			<Col smOffset={1} sm={10} mdOffset={2} md={8}>
				<Panel
					header={this.state.error ? this.state.error : 'Création compte Auxiliaire'} 
					bsStyle={this.state.error ? 'danger' : 'default'}>
				<Form>
					<FormGroup controlId='user'>
						<ControlLabel>Adresse électronique</ControlLabel>
						<FormControl type='email' onChange={this.handleEmailChanged.bind(this)} placeholder='Adresse électronique'/>
					</FormGroup>
					<FormGroup controlId='pass'>
						<ControlLabel>Mot de passe</ControlLabel>
						<FormControl type='password' onChange={this.handlePasswordChanged.bind(this)}  placeholder='Mot de passe'/>
					</FormGroup>
					<FormGroup controlId='confirm'>
						<ControlLabel>Confimer mot de passe</ControlLabel>
						<FormControl type='password' onChange={this.handleConfirmChanged.bind(this)}  placeholder='Confimer mot de passe'/>
					</FormGroup>
					<br/>
					<Row>
						<Col sm={6}>
							<APButton 
								bsStyle='default' 
								bsSize='lg' 
								onClick={this.onCancel.bind(this)} 
								block>
								Annuler
							</APButton>
						</Col>
						<br className="visible-xs-block"/>
						<Col sm={6}>
							<APButton 
								bsStyle='success' 
								bsSize='lg' 
								onClick={this.onSubmit.bind(this)} 
								block>
								Créer Compte
							</APButton>
						</Col>
					</Row>
				</Form>
				</Panel>
			</Col>
			<br/>
		</div>
	);}
}
export default RegisterAux;
