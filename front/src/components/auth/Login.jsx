// react modules
import React from 'react';
// react-bootstrap modules
import { Button, Panel, Nav, Navbar } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { Grid, Row, Col } from 'react-bootstrap'
// react-router-bootstrap modules
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

// utility modules
import Utils from '../../utils/Utils';
// core modules
import Dispatcher from '../../core/Dispatcher';
import StoreRegistry from '../../core/StoreRegistry';

class Login extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
            error: ''
        };
	}

    componentDidMount() {
        StoreRegistry.register('ERROR_STORE', this, this.onLogonError.bind(this));
    }

    componentWillUnmount() {
        StoreRegistry.unregister('ERROR_STORE', this);   
    }

    onLogonError() {
        let error = StoreRegistry.getStore('ERROR_STORE').getData('/logon/error');
        if (error) {
            this.setState({ error: 'Echec de connexion' });
        }
    }

	login(event) {
        event.preventDefault();
        let params = {
            user: this.state.user, 
            pass: this.state.pass
        };
        Dispatcher.issue('LOGON', params);
	}

    handleEmailChanged(e) { this.state.user = e.target.value; }
    handlePasswordChanged(e) { this.state.pass = e.target.value; }

    render() { return (
    	<div className='container'>
            <br/>
            <Col smOffset={1} sm={10} mdOffset={2} md={8}>
            <Panel 
                header={this.state.error?this.state.error:'Saisir les informations utilisateur'} 
                bsStyle={this.state.error?'danger':'default'}>
            <Form onSubmit={this.login.bind(this)}>
                <FormGroup controlId='user'>
                    <ControlLabel>Adresse électronique</ControlLabel>
                    <FormControl typeDISABLED='email' onChange={this.handleEmailChanged.bind(this)} placeholder='Adresse électronique'/>
                </FormGroup>
                <FormGroup controlId='pass'>
                    <ControlLabel>Mot de passe</ControlLabel>
                    <FormControl type='password' onChange={this.handlePasswordChanged.bind(this)}  placeholder='Mot de passe'/>
                </FormGroup>
                <br/>
                <Row>
                <Col sm={6} md={5} mdOffset={1} lg={4} lgOffset={2}>
                    <Button type='submit' bsStyle='success' bsSize='large' block>Connexion</Button>
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

export default Login;