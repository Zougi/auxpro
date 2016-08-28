import './IForm.css';

import React from 'react'
import Base from '../Base.jsx';

import {Button, Form } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

import { Row, Col, FormInput } from '../Lib.jsx';

class IForm extends Base {

	constructor(props) {
		super(props);
		this.type = {
			text:  this.getIFormInput,
			email: this.getIFormInput,
			password: this.getIFormInput
		}
		this.values = {};
	}
  
	getIFormInput(field, onChange) {
		return (<FormInput {...field} onChange={onChange} />);
	}
  
	onChange(event, value, name) {
		this.values[name] = value;
	}
  
	setDefaultValue(field) {
		if (field.defaultValue) {
			this.values[field.name] = field.defaultValue;
		}
	}
  
	onSubmit(event) {
		if (this.props.onSubmit) {
			this.props.onSubmit(this.values, event);
		} else {
			alert('No onSubmit Function');
		}
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
				bsStyle: this.props.buttons.cancel.bsStyle || 'default' ,
				bsSize: this.props.buttons.cancel.bsSize || 'large'
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
		if (this.props.buttons) {
			return (
				<Row>
					{this.getSubmitButton()}
					 <br className='visible-xs-block'/>
					{this.getCancelButton()}
				</Row>
			)
		}
	}
  
	render() {
		var fields = this.props.fields || [];
		let FormGroups = fields.map(function(field) {
			if (!field.name)
				return (<p>NAME PROPS NOT OPTIONAL</p>)
			this.setDefaultValue(field);
			field.type = field.type || 'text';
			return (this.type[field.type](field, this.onChange.bind(this)));
		}.bind(this))
		
		return (
			<Form className='ap-i-form'>
				{FormGroups}
				<br/>
				{this.getFooter()}
            </Form>
		);
	}
}

export default IForm;