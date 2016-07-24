import React from 'react'
import { FormGroup, Checkbox, Col } from 'react-bootstrap';

import FormBase from './FormBase.jsx'

class FormSelectMulti extends FormBase {

	constructor(props) {
		super(props);
		this.state = {};
		this.onComponentWillReceiveProps(props, true);
	}

	onComponentWillReceiveProps(props, first) {
		this.state.values = [];
		for (let i = 0; i < props.values.length; i++) {
			let v = props.values[i];
			this.state.values.push({
				key: v.key ? v.key : v.value,
				value: v.value,
				defaultSelected: v.selected,
				selected: v.selected
			});
		}
		if (!first) this.setState(this.state);
	}

	onChange(value, event) {
		value.selected = event.target.checked;
		this.setState(this.state);
		if (this.props.onChange) {
			this.props.onChange(this.state.values);
		}
	}

	_buildValues(disabled) {
		return this.state.values.map(function(v) {
			return (
				<Col xs={6} sm={3} md={2}>
					<Checkbox key={v.key} disabled={disabled} checked={v.selected} inline onChange={this.onChange.bind(this, v)}>
						{v.value}
					</Checkbox>
				</Col>
			);
		}.bind(this))
	}

	getFormControlStatic() {
		return (
			<FormGroup>
				{this._buildValues(true)}
  			</FormGroup>
		);
	}

	getFormControlEditable() {
		return (
			<FormGroup>
				{this._buildValues()}
  			</FormGroup>
		);
	}
}

export default FormSelectMulti;