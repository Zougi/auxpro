// react modules
import React from 'react';
// react-bootstrap modules
import { Button, Panel, Nav, Navbar } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { Grid, Row, Col } from 'react-bootstrap'
// react-router-bootstrap modules
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

// utility modules
import Utils from '../../../utils/Utils';
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';

import IForm from '../../../components-lib/Form/IForm.jsx';
import BasicLogin from '../../../components-lib/BasicLogin/BasicLogin.jsx';

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

	onSubmit(values, event) {
		event.preventDefault();
		let params = {
			user: values.user, 
			pass: values.pass
		};
		Dispatcher.issue('LOGON', params);
	}
	
    render() { 

		return (
				<div className='container'>
					<BasicLogin 
						onSubmit={this.onSubmit.bind(this)} 
						error={this.state.error}/>
					<br/>
				</div>
		);}   
	}

export default Login;

// this.fields = [	
			// {	name: "user",
				// type: "email",									//optional
				// id: "user",											//optional
				// label: "Adresse électronique", 			//optional
				// placeholder: "Adresse électronique"		//optional			
			// },
			// {	name: "pass",
				// type: "password",								//optional
				// id: "pass",											//optional
				// label: "Mot de passe", 						//optional
				// placeholder: "Mot de passe"	 			//optional			
			// }
		// ];
		
		// this.buttons = {
			// submit: { 							//optional
					// text: 'Connexion', 		//optional
					// bsStyle:'success', 		//optional
					// bsSize:'large'				//optional
			// },
			// cancel: {							//optional
					// text: 'Annuler', 			//optional
					// bsStyle:'default', 		//optional
					// bsSize:'large', 			//optional
					// linkContainer:'/'
			// }
		// }

// <Row>
	// <Col smOffset={1} sm={10} mdOffset={2} md={8}>
		// <Panel 
		// header={this.state.error?this.state.error:'Saisir les informations utilisateur'} 
		// bsStyle={this.state.error?'danger':'default'}>
			// <IForm onSubmit={this.onSubmit.bind(this)} fields={this.fields} buttons={this.buttons}/>
		// </Panel>
	// </Col>
// </Row>
// <br/>