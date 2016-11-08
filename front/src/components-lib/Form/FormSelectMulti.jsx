import React from 'react'
import { FormGroup, Checkbox, Row } from 'react-bootstrap'
// Custom components
import FormBase from 'components-lib/form/FormBase'

class FormSelectMulti extends FormBase {

	constructor(props) {
		super(props);
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onChange(value, event) {
		let v = (this.props.defaultValue || []).map(function (e) { return e; });
		if (event.target.checked) {
			if (v.indexOf(value.key) === -1) {
				v.push(value.key);
			}
		} else {
			if (v.indexOf(value.key) !== -1) {
				v.splice(v.indexOf(value.key), 1);
			}
		}
		let vs = 'success';
		if (this.props.validator) {
			vs = this.props.validator.getState(v)
			this.setState({ validationState: vs })
		}
		if (this.props.onChange) {
			this.props.onChange({
				value: v,
				validationState: vs
			});
		}
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildValues(disabled) {
		return this.props.values.map(function(v, i) {
			return (
				<Row key={i}>
					<Checkbox disabled={!this.props.edit} 
							  checked={(this.props.defaultValue || []).indexOf(v.key) !== -1} 
							  onChange={this.onChange.bind(this, v)}
							  inline >
						{v.value}
					</Checkbox>
				</Row>
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