import React from 'react';

import { Button, Panel, Nav, Navbar } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { Grid, Row, Col } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

import Dispatcher from 'core/Dispatcher';

class RegisterSad extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
            error: ''
        };
	}

	register(event) {
		event.preventDefault();
       
		
		
		event.preventDefault();
		if (this.state.pass == this.state.confirm) {
			 let params = {
				name: this.state.user, 
				email: this.state.user, 
				password: this.state.pass
			};
			Dispatcher.issue('POST_SERVICE', params).
			then(function () {
				console.log('service créé');
				let params = {
					user: this.state.user, 
					pass: this.state.pass
				};
				Dispatcher.issue('LOGON', params);
			}.bind(this)).
			catch(function (error) {
				console.log(error);
				this.setState({ error: 'Erreur lors de la création d\'un service'});
			}.bind(this));	
		} else {
			this.setState({ error: 'Erreur Confimer mot de passe'});
		}
	}	

	handleEmailChanged(e) {  this.state.user = e.target.value; }
    handlePasswordChanged(e) { this.state.pass = e.target.value; }
	handleConfirmChanged(e) { this.state.confirm = e.target.value; }

	render() { return (
        <div className="container">
            <br/>
            <Col smOffset={1} sm={10} mdOffset={2} md={8}>
            <Panel 
                header={this.state.error?this.state.error:'Création compte Société'} 
                bsStyle={this.state.error?'danger':'default'}>
            <Form onSubmit={this.register.bind(this)}>
                <FormGroup controlId='user'>
                    <ControlLabel>Adresse électronique</ControlLabel>
                    <FormControl typeDISABLED='email' onChange={this.handleEmailChanged.bind(this)} placeholder='Adresse électronique'/>
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
                <Col sm={6} md={5} mdOffset={1} lg={4} lgOffset={2}>
                    <Button type='submit' bsStyle='success' bsSize='large' block>Créer Compte</Button>
                </Col>
                <br className="visible-xs-block"/>
                <Col sm={6} md={5} lg={4}>
                    <LinkContainer to='/'>
                        <Button bsStyle='default' bsSize='large' block>Annuler</Button>
                    </LinkContainer>
                </Col>                
                </Row>
            </Form>
            </Panel>
            </Col>
            <br/>
        </div>
    );}
}

RegisterSad.contextTypes = {
	router: React.PropTypes.object
}

export default RegisterSad;
