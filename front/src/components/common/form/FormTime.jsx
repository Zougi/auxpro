// react modules
import React from 'react'
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
// custom modules
import { DEFAULTS } from './FormConstants.js';
// custom components
import FormBase from './FormBase.jsx'

let HOURS = [];
for (let i = 0; i < 24; i++) {
	HOURS.push({ key: i, value: i });
}
let MINUTES = [];
for (let i = 0; i < 60; i++) {
	MINUTES.push({ key: i, value: i });
}

class FormTime extends FormBase {

	constructor(props) {
		super(props);
		let defaultOk = this.props.defaultValue && this.props.defaultValue.length && this.props.defaultValue.length > 1;
		this.state = {
			hour: defaultOk ? this.props.defaultValue[0] : 0,
			minute: defaultOk ? this.props.defaultValue[1] : 0
		};
	}

	onChange(event) {
		this.props.onChange([ this.state.hour, this.state.minute ]);
	}

	onHourChange(event) {
		this.state.hour = Number(event.target.value);
		this.onChange();
	}
	onMinuteChange(event) {
		this.state.minute = Number(event.target.value);
		this.onChange();
	}

	getFormControlEditable() {
		let hours = HOURS.map(function(v) {
			return (<option key={v.key} value={v.key}>{v.value}</option>);
		});
		let minutes = MINUTES.map(function(v) {
			return (<option key={v.key} value={v.key}>{v.value}</option>);
		});
		return (
			<div className='form-time'>			
				<FormControl 
					componentClass='select' 
					defaultValue={this.state.hour} 
					onChange={this.onHourChange.bind(this)}>
	    			{hours}
	  			</FormControl>
	  			&nbsp;&nbsp;h&nbsp;&nbsp;
	  			<FormControl 
					componentClass='select' 
					defaultValue={this.state.minute} 
					onChange={this.onMinuteChange.bind(this)}>
	    			{minutes}
	  			</FormControl>
	  		</div>
		);
	}
}

export default FormTime;