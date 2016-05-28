// react modules
import React from 'react'
// react-bootstrap modules
import { Pager, PageItem, Table, Panel, Grid, Row, Col, Button } from 'react-bootstrap';
// react-router-bootstrap moduls
import { LinkContainer } from 'react-router-bootstrap'

// custom components
import CalendarWeekWeek from '../calendar/CalendarWeekWeek.jsx';

class Contact extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 
		return (<CalendarWeekWeek/>);
	}
		/*
		let times = [
			'08h', '08h30', '09h', '09h30', '10h', '10h30', '11h', '11h30', '12h', '12h30', '13h', '13h30', 
			'14h', '14h30', '15h', '15h30', '16h', '16h30', '17h', '17h30', '18h', '18h30', '19h', '19h30',
			'20h'
		];
		let timesHours = times.map(function(time) {
			if (time.indexOf('h30') !== -1) {
				return (<td key={time} className="hour"><p/></td>);
			} else {
				return (<td key={time} className="hour start"><p/></td>);
			}
		});
		timesHours.pop();
		let timesHeads = [];
		for (let i = 0; i < times.length; i++) {
			if (i%4 === 2) {
				timesHeads.push((<th key={times[i]} className="hour-head"><p/><div className="hidden-xs">{times[i]}</div><p/></th>));
			} else if (i%2 === 0) {
				timesHeads.push((<th key={times[i]} className="hour-head">{times[i]}</th>));
			}
		}

		return (
			<Grid> 
				<br/>
				<Row>
					<Col sm={8} smOffset={2}>
						<Panel className="calendar">
							<table style={{width:"100%"}} className="calendar-week">
								<thead><tr>
									{timesHeads}
								</tr></thead>
							</table>
							<table style={{width:"100%"}} className="calendar-week">
								<tbody>
									<tr className="day">
										<td className="hour-b"><p/></td>
										{timesHours}
										<td className="hour-b"><p/></td>
									</tr>
								</tbody>
							</table>			
			        	</Panel>
        			</Col>
        		</Row>
        	</Grid>
        	
    );*/
} 

export default Contact;