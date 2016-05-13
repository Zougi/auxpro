// react modules
import React from 'react'
// react-bootstrap modules
import { Pager, PageItem, Table, Panel, Grid, Row, Col, Button } from 'react-bootstrap';
// react-router-bootstrap moduls
import { LinkContainer } from 'react-router-bootstrap'

// custom components
import Calendar from '../calendar/Calendar.jsx';
import Month from '../calendar/Month.jsx';
import Week from '../calendar/Week.jsx';
import Day from '../calendar/Day.jsx';
// custom modules
import { MONTHS } from '../../utils/date/DateConstants.js';
import DateMonth from '../../utils/date/DateMonth.js';
import DateWeek from '../../utils/date/DateWeek.js';

class Contact extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { return (
		<Grid>
			<Row>
				<Col smOffset={2} sm={8} mdOffset={3} md={7} lgOffset={4} lg={5}>
					<Calendar/>
        		</Col>
        	</Row>
        </Grid>
    );}
}

export default Contact;