import React from 'react'
import { Panel, Form, FormGroup, FormControl, ControlLabel, Grid, Row, Col } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
// Custom components
import FormInput from 'components-lib/Form/FormInput'
import { APButton } from 'lib/Lib'
// Lib modules
import CustomValidator from 'utils/form/CustomValidator'

class Land extends React.Component {

	constructor(props) {
		super(props);
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onPostalCodeChanged(event) {
		this.postalCode = event.value;
	}
	onGuestLogin(event) {
		event.preventDefault();
		Dispatcher.issue('GUEST_FILTER_SERVICES', { postalCode: this.postalCode }).
		then(function () {
			Dispatcher.issue('NAVIGATE', { path: '/guest' });
		})
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
									edit={true}
									title='Commune'
									defaultValue=''
									placeholder='Code postal'
									smLabelSize={3}
									onChange={this.onPostalCodeChanged.bind(this)}/>
								<FormGroup>
									<Col smOffset={3} sm={9}>
										<APButton
											text='Valider'
											onClick={this.onGuestLogin.bind(this)} />
									</Col>
								</FormGroup>
							</Form>
						</Panel>
						<Row>
							<Col sm={6}>
								<APButton
									block
									bsStyle='info'
									bsSize='large'
									onClick={this.onRegisterAux.bind(this)}>
									Créer un compte<br/>Auxiliaire de vie
								</APButton>
							</Col>
							<br className='visible-xs-block'/>
							<Col sm={6}>
								<APButton
									block
									bsSize='large'
									bsStyle='primary'
									onClick={this.onRegisterSad.bind(this)}>
									Créer un compte<br/>SAD
								</APButton>
							</Col>
						</Row>
						<br/>
						<Row>
							<Col smOffset={3} sm={6}>
								<APButton
									block
									bsSize='large'
									bsStyle='success'
									onClick={this.onLogon.bind(this)}>
									Connexion
								</APButton>
							</Col>
						</Row>
					</Col>
				</Row>
			</Grid>
			<br/>
		</div>
	);}
}
export default Land;