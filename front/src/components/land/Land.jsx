import React from 'react';
import { Button, Panel, Form, FormGroup, FormControl, ControlLabel, Grid, Row, Col } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
// Custom components
import FormInput from 'components-lib/form/FormInput'
// Lib modules
import CustomValidator from 'utils/form/CustomValidator.js'

class Land extends React.Component {

	constructor(props) {
		super(props);
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onPostalCodeChanged(value) {
		console.log(value);
	}
	onGuestLogin(event) {
		event.preventDefault();
		Dispatcher.issue('NAVIGATE', { path: '/guest' });
	}
	onRegisterAux(event) {
		event.preventDefault();
		Dispatcher.issue('NAVIGATE', { path: '/registerAux' });
	}
	onRegisterSad(event) {
		event.preventDefault();
		Dispatcher.issue('NAVIGATE', { path: '/registerSad' });
	}
	onLogon(event) {
		event.preventDefault();
		Dispatcher.issue('NAVIGATE', { path: '/login' });
	}

	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { return (
		<div className='container'>
			<br/>
			<Grid>
				<Row>
					<Col sm={6} xs={12}>
						<Panel header='Je recherche un service de soutien à domicile'>
							<Form horizontal>
								<FormInput
									static={false}
									title='Commune'
									defaultValue=''
									placeholder='Code postal'
									smLabelSize={3}
									onChange={this.onPostalCodeChanged.bind(this)}/>
								<FormGroup>
									<Col smOffset={3} sm={9}>
										<Button onClick={this.onGuestLogin.bind(this)}>
											Valider
										</Button>
									</Col>
								</FormGroup>
							</Form>
						</Panel>
						<Row>
							<Col sm={6}>
								<Button bsStyle='info' bsSize='large' onClick={this.onRegisterAux.bind(this)} block>
									Créer un compte<br/>Auxiliaire de vie
								</Button>
							</Col>
							<br className='visible-xs-block'/>
							<Col sm={6}>
								<Button bsStyle='primary' bsSize='large' onClick={this.onRegisterSad.bind(this)} block>
									Créer un compte<br/>SAD
								</Button>
							</Col>
						</Row>
						<br/>
						<Row>
							<Col smOffset={3} sm={6}>
								<Button bsStyle='success' bsSize='large' onClick={this.onLogon.bind(this)} block>
									Connexion
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Grid>
			<br/>
		</div>
	);}
}
/*

*/

export default Land;