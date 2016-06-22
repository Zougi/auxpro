// react modules
import React from 'react'
import moment from 'moment'
import { FormGroup, FormControl, ControlLabel, Col, OverlayTrigger, Popover, Button } from 'react-bootstrap';
// custom modules
import { DEFAULTS } from './FormConstants.js';
// custom components
import FormBase from './FormBase.jsx'
import CalendarMonth from '../calendar/CalendarMonth.jsx'

moment.locale('fr');

class FormDate extends FormBase {

	constructor(props) {
		super(props);
		this.state = { date: '', moment: moment() };
		if (this.props.defaultValue) {
			let m = moment(this.props.defaultValue);
			this.state.moment = m;
			this.state.date = m.format('D') + ' ' + m.format('MMMM') + ' ' + m.format('YYYY');
		}
	}

	onDaySelect(m) {
		this.state.moment = m;
		this.state.date = m.format('D') + ' ' + m.format('MMMM') + ' ' + m.format('YYYY');
		this.setState(this.state);
		if (this.props.onChange) {
			this.props.onChange({ target: { value: m.valueOf() } });
		}
	}

	getFormControlStatic() {
		return (
			<FormControl.Static>
				{this.state.date}
			</FormControl.Static>
		);
	}

	getFormControlEditable() {
		let overlay = (
			<Popover id='formDateOverlay' title="Popover">
				<CalendarMonth 
					now={this.state.moment}
					display={this.state.moment} 
					selected={this.state.moment} 
					bsSize='xsmall'
					onDaySelect={this.onDaySelect.bind(this)}/>
			</Popover>
		);
		return (
			<OverlayTrigger trigger="click" placement="bottom" overlay={overlay} rootClose>
      			<FormControl 
					type={this.props.type?this.props.type:'text'} 
					value={this.state.date}/>
    		</OverlayTrigger>
			
		);
	}

}

export default FormDate;