// lib modules
import React from 'react';
import moment from 'moment';
import { Col, Panel } from 'react-bootstrap';
// custom modules
import { fromLocalDate, toHumanDate, fromLocalTime, toHumanTime } from '../../../utils/moment/MomentHelper.js'

moment.locale('fr');

class InterventionOneTime extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let date = fromLocalDate(this.props.intervention.oneTime.date);
		let start = fromLocalTime(this.props.intervention.oneTime.date, this.props.intervention.oneTime.startTime);
		let end = fromLocalTime(this.props.intervention.oneTime.date, this.props.intervention.oneTime.endTime);

		return (
			<Col sm={4} md={3}>
				<Panel header='Intervention'>
					{'Le ' + toHumanDate(date)}
					<br/>
					{'De ' + toHumanTime(start) + ' à ' + toHumanTime(end)}
				</Panel>
			</Col>
		);
	}
}

export default InterventionOneTime;