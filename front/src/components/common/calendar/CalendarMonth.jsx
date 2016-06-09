// lib modules
import React from 'react'
import moment from 'moment'
import { Button, Glyphicon } from 'react-bootstrap';
// custom components
import CalendarMonthMonth from './CalendarMonthMonth.jsx';

moment.locale('fr');

class CalendarMonth extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			display: this.props.display.startOf('month')
		}
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
		let month = this.props.display.format('MMMM');
		month = month.charAt(0).toUpperCase() + month.slice(1);
		return ( 
		<div className='calendar-month'>
			<table className='calendar-header'>
					<tbody>
						<tr>
							<td>
								<Button bsSize='xsmall'>
								    <Glyphicon glyph="chevron-down"/>
								</Button>
								{this.props.display.year()}
								<Button bsSize='xsmall'>
								    <Glyphicon glyph="chevron-up"/>
								</Button>
							</td>
							<td>
								<div style={{textAlign:'center'}}>
									<Button bsSize='xsmall' onClick={this.onPreviousMonth.bind(this)}>
									    <Glyphicon glyph="chevron-left"/>
									</Button>
									{month}
									<Button bsSize='xsmall' onClick={this.onNextMonth.bind(this)}>
									    <Glyphicon glyph="chevron-right"/>
									</Button>
								</div>
							</td>
							<td>
								<div style={{textAlign:'right'}}>
								    <Button bsSize='xsmall' active>
								    	<Glyphicon glyph="th"/>
								    </Button>
								    <Button bsSize='xsmall' onClick={this.props.toggleMode}>
								    	<Glyphicon glyph="th-list"/>
								    </Button>
						  		</div>
							</td>
						</tr>
					</tbody>
				</table>
			<CalendarMonthMonth 
				display={this.state.display} 
				selected={this.props.selected}
				planing={this.props.planing}
				onDaySelect={this.props.onDaySelect}/>
		</div>
    );}
}

export default CalendarMonth;