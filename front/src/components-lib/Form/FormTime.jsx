import React from 'react'
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap'
// Custom components
import FormBase from 'components-lib/form/FormBase'
// Custom modules
import { DEFAULTS } from 'components-lib/form/FormConstants'

let HOURS = [];
for (let i = 0; i < 24; i++) {
	HOURS.push({ 
		key: i, 
		value: i < 10 ? '0' + i : String(i)
	});
}
let MINUTES = [];
for (let i = 0; i < 4; i++) {
	MINUTES.push({ 
		key: i*15, 
		value: i*15 < 10 ? '0' + i*15 : String(i*15)
	});
}

class FormTime extends FormBase {

	constructor(props) {
		super(props);
	}

	// State management functions //
	// --------------------------------------------------------------------------------

	_getDefaultHour() {
		return this.props.defaultValue && this.props.defaultValue[0] ? this.props.defaultValue[0] : 0;
	}
	_getDefaultMinute() {
		return this.props.defaultValue && this.props.defaultValue[1] ? this.props.defaultValue[1] : 0;
	}

	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onChange(value) {
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	}
	onHourChange(event) {
		this.onChange([
			Number(event.target.value),
			this._getDefaultMinute()
		]);
	}
	onMinuteChange(event) {
		this.onChange([
			this._getDefaultHour(),
			Number(event.target.value)
		]);
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildHours() {
		return HOURS.map(function(v) {
			return (<option key={v.key} value={v.key}>{v.value}</option>);
		});
	}
	_buildMinutes() {
		return MINUTES.map(function(v) {
			return (<option key={v.key} value={v.key}>{v.value}</option>);
		});
	}

	getFormControlEditable() {
		return (
			<div className='form-time'>
				<FormControl 
					componentClass='select' 
					defaultValue={this._getDefaultHour()}
					onChange={this.onHourChange.bind(this)}>
	    			{this._buildHours()}
	  			</FormControl>
	  			&nbsp;&nbsp;h&nbsp;&nbsp;
	  			<FormControl 
					componentClass='select' 
					defaultValue={this._getDefaultMinute()}
					onChange={this.onMinuteChange.bind(this)}>
	    			{this._buildMinutes()}
	  			</FormControl>
	  		</div>
		);
	}
}

export default FormTime;