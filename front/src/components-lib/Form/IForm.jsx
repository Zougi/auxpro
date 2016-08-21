import React from 'react'
import ReactDOM from 'react-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import { Button, Panel, Nav, Navbar } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

import { DEFAULTS } from './FormConstants.js';

import IFormInput from './IFormInput.jsx'

class IForm extends React.Component {

	constructor(props) {
		super(props);
		console.log(props)
		this.type = {
			text:  this.getIFormInput,
			email: this.getIFormInput,
			password: this.getIFormInput
		}
		this.values = {};
	}
  
	getIFormInput(field, onChange){
		return (<IFormInput {...field} onChange={onChange} />);
	}
  
	onChange(name, value, event) {
		this.values[name] = value;
	}
  
	onSubmit(event) {
		if (this.props.onSubmit)
			this.props.onSubmit(this.values, event);
		else
			alert("No onSubmit Function")
	}
	
	getSubmitButton() {
		if (this.props.buttons.submit) {
			var buttonProps = {
				bsStyle:this.props.buttons.submit.bsStyle || 'success',
				bsSize:this.props.buttons.submit.bsSize || 'large'
			}
			return (
				<Col sm={6} md={5} mdOffset={1} lg={4} lgOffset={2}>
					<Button onClick={this.onSubmit.bind(this)} {...buttonProps} block>{this.props.buttons.submit.text || 'Submit'}</Button>
				</Col>
			)
		}
	}
	
	getCancelButton() {
		if (this.props.buttons.cancel) {
			var buttonProps = {
				bsStyle:this.props.buttons.cancel.bsStyle || 'default' ,
				bsSize:this.props.buttons.cancel.bsSize || 'large'
			}
			return (
				<Col sm={6} md={5} lg={4}>
					<LinkContainer to={this.props.buttons.cancel.linkContainer}>
						<Button {...buttonProps} block>{this.props.buttons.cancel.text || 'Cancel'}</Button>
					</LinkContainer>
				</Col>
			)
		}
	}
	
	getFooter() {
		if (this.props.buttons)
			return (
				<Row>
					{this.getSubmitButton()}
					 <br className="visible-xs-block"/>
					{this.getCancelButton()}
				</Row>
			)
	}
  
	render() {
		var fields = this.props.fields || [];
		let FormGroups = fields.map(function(field) {
			field.type = field.type || 'text';
			return (this.type[field.type](field, this.onChange.bind(this)));
		}.bind(this))
	  
		return (
			<Form>
				{FormGroups}
				<br/>
				{this.getFooter()}
            </Form>
		);
  }
}

export default IForm;


	//EXEMPLE
	// var fields = [	
			// {	name: "user",
				// type: "email",										//optional
				// id: "user",											//optional
				// label: "Adresse électronique", 				//optional
				// placeholder: "Adresse électronique",	//optional
				// value: "My Value",								//optional
				// defaultValue: "My Default Value" 			//optional			
			// },
			// {	name: "pass",
				// type: "password",								//optional
				// id: "pass",											//optional
				// label: "Mot de passe", 						//optional
				// placeholder: "Mot de passe"	 			//optional			
			// }
		// ];
		
	// var buttons = {
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
	// <IForm onSubmit={this.onSubmit.bind(this)} fields={fields} buttons={buttons}/>