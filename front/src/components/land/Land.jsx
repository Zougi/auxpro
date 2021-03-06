import React from 'react'
import { Panel, Form, FormGroup, FormControl, ControlLabel, Grid, Row, Col } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
// Custom components
import FormInput from 'components-lib/Form/FormInput'
import { APButton } from 'ap-react-bootstrap'
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
				<Panel header='JE RECHERCHE UN SOUTIEN À DOMICILE'>
				<Form horizontal>
					<Col sm={8}>
						
							<FormInput
								edit={true}
								title='Commune'
								defaultValue=''
								placeholder='Code postal'
								smLabelSize={3}
								onChange={this.onPostalCodeChanged.bind(this)}/>
					</Col>
					<Col smOffset={1} sm={2}>
						<APButton
							text={<b>VALIDER</b>}
							bsStyle='primary'
							bsSize='md'
							block
							onClick={this.onGuestLogin.bind(this)} />
					</Col>
					</Form>
				</Panel>
				<Col sm={4}>
					<APButton
						block
						bsSize='lg'
						bsStyle='primary'
						onClick={this.onLogon.bind(this)}>
						<br/><b>SE CONNECTER</b>
					</APButton>
				</Col>
				<br className='visible-xs-block'/>
				<Col sm={4}>
					<APButton
						block
						bsStyle='primary'
						bsSize='lg'
						onClick={this.onRegisterAux.bind(this)}>
						<b>CRÉER UN COMPTE<br/>AUXILIARE DE VIE</b>
					</APButton>
				</Col>
				<br className='visible-xs-block'/>
				<Col sm={4}>
					<APButton
						block
						bsSize='lg'
						bsStyle='primary'
						onClick={this.onRegisterSad.bind(this)}>
						<b>CRÉER UN COMPTE<br/>SAD</b>
					</APButton>
				</Col>
			</Grid>
			<br/>
		</div>
	);}
}
export default Land;