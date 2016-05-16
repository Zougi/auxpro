// react modules
import React from 'react'
// react-bootstrap modules
import { Grid, Row, Col } from 'react-bootstrap';
// custom components
import Calendar from '../calendar/Calendar.jsx';
// customs modules
import DateDay from '../../utils/date/DateDay.js';

class Planing extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			day: new DateDay(new Date())
		}
		this.state.planing = {
			2016: {
				4: {
					18 : ['available']
				}
			}
		}
	}
	onDaySelect(day) {
		this.state.day = day;
		this.setState(this.state);
	}
	render() { return (
	<Grid>
		<Row>
			<Col smOffset={2} sm={8} mdOffset={2} md={7} lgOffset={3} lg={5}>
				<Calendar onDaySelect={this.onDaySelect.bind(this)} planing={this.state.planing}/>
    		</Col>
    		<Col sm={2} md={3} lg={4}>
    		{this.state.day.id}
    		</Col>
    	</Row>
    </Grid>
	);}
}

export default Planing;