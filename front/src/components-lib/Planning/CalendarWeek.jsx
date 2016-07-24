import React from 'react'
import moment from 'moment'
import { Pager, PageItem, Button, Glyphicon } from 'react-bootstrap';
// custom components
import CalendarWeekWeek from './CalendarWeekWeek.jsx';

import './Calendar.css';

class CalendarWeek extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			display: this.props.display.startOf('weeks')
		}
	}

	setPreviousWeek() {
		this.state.display.subtract(1, 'weeks');
		this.setState(this.state);
	}
	setNextWeek() {
		this.state.display.add(1, 'weeks');
		this.setState(this.state);
	}

	render() { 
		return ( 
			<div>
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
									<Button bsSize='xsmall' onClick={this.setPreviousWeek.bind(this)}>
									    <Glyphicon glyph="chevron-left"/>
									</Button>
									{this.props.display.startOf('weeks').format('Do MMM')} - {this.props.display.endOf('weeks').format('Do MMM')}
									<Button bsSize='xsmall' onClick={this.setNextWeek.bind(this)}>
									    <Glyphicon glyph="chevron-right"/>
									</Button>
								</div>
							</td>
							<td>
								<div style={{textAlign:'right'}}>
								    <Button bsSize='xsmall' onClick={this.props.toggleMode}>
								    	<Glyphicon glyph="th"/>
								    </Button>
								    <Button bsSize='xsmall' active>
								    	<Glyphicon glyph="th-list"/>
								    </Button>
						  		</div>
							</td>
						</tr>
					</tbody>
				</table>
				
				<CalendarWeekWeek
					now={this.props.now}
					display={this.state.display}
					selected={this.props.selected}
					planing={this.props.planing}
					onDaySelect={this.props.onDaySelect}/>
			</div>
		);
	}
}

export default CalendarWeek;