// react modules
import React from 'react'
import moment from 'moment'
import { FormGroup, FormControl, ControlLabel, Col, OverlayTrigger, Popover, Button } from 'react-bootstrap';
// custom modules
import { DEFAULTS } from './FormConstants.js';
import MomentHelper from '../../utils/moment/MomentHelper.js'
// custom components
import FormBase from './FormBase.jsx'
import Calendar from '../calendar/Calendar.jsx'

moment.locale('fr');

class FormDate extends FormBase {

	constructor(props) {
		super(props);
		this.state = { 
			validationState: (!this.props.static && this.props.validator) ? this.props.validator.getState(this.props.defaultValue || this.props.value) : this.props.validationState,
			date: this.props.defaultValue ? this.props.defaultValue : null 
		};
	}

	onDaySelect(date) {
		this.setState({ date: date });
		if (this.props.validator) {
			this.setState({validationState: this.props.validator.getState(date)})
		}
		if (this.props.onChange) {
			this.props.onChange(date);
		}
	}

	getFormControlStatic() {
		return (
			<FormControl.Static>
				{MomentHelper.localDateToHumanDate(this.state.date)}
			</FormControl.Static>
		);
	}

	getFormControlEditable() {
		let overlay = (
			<Popover id='formDateOverlay' title="Popover">
				<Calendar 
					moment={this.state.date} 
					selected={this.state.date} 
					bsSize='xsmall'
					onDaySelect={this.onDaySelect.bind(this)}/>
			</Popover>
		);
		return (
			<OverlayTrigger trigger="click" placement="bottom" overlay={overlay} rootClose>
				<FormControl 
					type='text'
					value={MomentHelper.localDateToHumanDate(this.state.date)}/>
			</OverlayTrigger>
			
		);
	}

}

export default FormDate;