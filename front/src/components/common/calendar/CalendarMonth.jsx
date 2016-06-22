// lib modules
import React from 'react'
import moment from 'moment'
import { Button, Glyphicon } from 'react-bootstrap';
// custom components
import CalendarMonthMonth from './CalendarMonthMonth.jsx';
import GlyphButton from '../basic/GlyphButton.jsx';

moment.locale('fr');

class CalendarMonth extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			display: moment(this.props.display).startOf('month'),
			showToggle: this.props.showToggle ||false
		}
	}

	onPreviousYear() {
		this.state.display.subtract(1, 'year');
		this.setState(this.state);
	}
	onNextYear() {
		this.state.display.add(1, 'year');
		this.setState(this.state);
	}
	onPreviousMonth() {
		this.state.display.subtract(1, 'month');
		this.setState(this.state);
	}
	onNextMonth() {
		this.state.display.add(1, 'month');
		this.setState(this.state);
	}


	render() { 
		let month = this.state.display.format('MMMM');
		month = month.charAt(0).toUpperCase() + month.slice(1);

		let yearChoser = (
			<td>
				<div style={{textAlign:'center'}}>
					<GlyphButton bsSize='xsmall' glyph='chevron-left' onClick={this.onPreviousYear.bind(this)}/>
					{this.state.display.year()}
					<GlyphButton bsSize='xsmall' glyph='chevron-right' onClick={this.onNextYear.bind(this)}/>
				</div>
			</td>
		);
		let monthChoser = (
			<td>
				<div style={{textAlign:'center'}}>
					<GlyphButton bsSize='xsmall' glyph='chevron-left' onClick={this.onPreviousMonth.bind(this)}/>
					{month}
					<GlyphButton bsSize='xsmall' glyph='chevron-right' onClick={this.onNextMonth.bind(this)}/>
				</div>
			</td>
		);
		let modeChoser = (
			<td>
				<div style={{textAlign:'right'}}>
					<GlyphButton bsSize='xsmall' glyph='th'/>
					<GlyphButton bsSize='xsmall' glyph='th-list' onClick={this.props.toggleMode}/>
		  		</div>
			</td>
		);

		let className = 'calendar-month';
		if (this.props.bsSize && this.props.bsSize === 'xsmall') {
			className += ' calendar-small';
		}

		return ( 
		<div className={className}>
			<table className='calendar-header'>
					<tbody>
					{ this.state.showToggle ?
						<tr>
							{yearChoser}
							{monthChoser}
							{toggleChoser}
						</tr>
					:
						<tr>
							{yearChoser}
							{monthChoser}
						</tr>
					}
					</tbody>
				</table>
			<CalendarMonthMonth 
				display={this.state.display} 
				selected={this.props.selected}
				planing={this.props.planing}
				bsSize={this.props.bsSize}
				onDaySelect={this.props.onDaySelect}/>
		</div>
    );}
}

export default CalendarMonth;