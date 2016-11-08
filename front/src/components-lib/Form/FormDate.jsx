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
	}


	// State management functions //
	// --------------------------------------------------------------------------------

	_getDefaultDate() {
		return this.props.defaultValue || MomentHelper.toLocalDate(moment());
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onDaySelect(date) {
		let vs = 'success'
		if (this.props.validator) {
			vs = this.props.validator.getState(date);
			this.setState({ validationState: vs })
		}
		this.props.onChange({
			value: date,
			validationState: vs
		});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	getFormControlStatic() {
		return (
			<FormControl.Static>
				{MomentHelper.localDateToHumanDate(this._getDefaultDate())}
			</FormControl.Static>
		);
	}

	_buildOverlay() {
		return (
			<Popover id='formDateOverlay' title="Popover">
				<Calendar 
					moment={this._getDefaultDate()}
					selected={this._getDefaultDate()}
					bsSize='xsmall'
					onDaySelect={this.onDaySelect.bind(this)}/>
			</Popover>
		);
	}

	getFormControlEditable() {
		return (
			<OverlayTrigger trigger="click" placement="bottom" overlay={this._buildOverlay()} rootClose>
				<FormControl 
					type='text'
					value={MomentHelper.localDateToHumanDate(this._getDefaultDate())}/>
			</OverlayTrigger>	
		);
	}

}

export default FormDate;