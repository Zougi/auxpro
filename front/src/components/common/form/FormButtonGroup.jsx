// react modules
import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap';
// custom modules
import { DEFAULTS } from './FormConstants.js';
// custom components
import FormBase from './FormBase.jsx'

class FormButtonGroup extends FormBase {

	constructor(props) {
		super(props);
		this.state = {
			selection: props.defaultValue || 0
		}
	}

	getFormControlStatic() {
		return (
			<ButtonGroup>
				{this._getButtons(false)}
			</ButtonGroup> 
		);
	}

	getFormControlEditable() {
		return (
			<ButtonGroup>
				{this._getButtons(true)}
			</ButtonGroup> 
		);
	}

	_getSelectionHandler(v) {
		return function () {
			this.state.selection = v;
			this.setState(this.state);
			if (this.props.onChange) {
				this.props.onChange(v);
			}
		}.bind(this);
	}

	_getButtons(editable) {
		let values = this.props.values || [];
		return values.map(function(v) {
			if (editable) {
				return (<Button active={this.state.selection === v} onClick={this._getSelectionHandler(v)} key={v}>{v}</Button>);
			} else {
				return (<Button active={this.state.selection === v} disabled key={v}>{v}</Button>);
			}
		}.bind(this));
	}
}

export default FormButtonGroup;