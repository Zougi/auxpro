import React from 'react'
import moment from 'moment'
import { Button, Glyphicon } from 'react-bootstrap';

import './Calendar.css';
import SelectorYear from './SelectorYear.jsx';
import SelectorMonth from './SelectorMonth.jsx';
import CalendarDaysMonth from './CalendarDaysMonth.jsx';

moment.locale('fr');

class CalendarDays extends React.Component {

	constructor(props) {
		super(props);
		this.onComponentWillReceiveProps(props, true);
	}

	onComponentWillReceiveProps(props, first) {
		this.state = { moment: moment(props.moment) || moment() };
		if (!first) this.setState(this.state);	
	}

	render() { 
		return ( 
		<div className='ap-calendar-days'>
			<table className='ap-calendar-header'>
				<tbody>
					<tr>
						<td>
							<SelectorYear
								moment={this.state.moment}
								onChange={this.props.onYearChanged} 
								onYearMode={this.props.onYearMode} />
						</td>
						<td>
							<SelectorMonth
								moment={this.state.moment}
								onChange={this.props.onMonthChanged} 
								onMonthMode={this.props.onMonthMode} />
						</td>
					</tr>
				</tbody>
			</table>
			<CalendarDaysMonth
				moment={this.state.moment}
				selected={this.props.selected}
				bsSize={this.props.bsSize}
				specialsSuccess={this.props.specialsSuccess}
				specialsInfo={this.props.specialsInfo}
				specialsPrimary={this.props.specialsPrimary}
				specialsWarning={this.props.specialsWarning}
				specialsDanger={this.props.specialsDanger}
				onDaySelect={this.props.onDaySelect}/>
		</div>
    );}
}

export default CalendarDays;