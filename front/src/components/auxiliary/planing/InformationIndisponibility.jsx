import React from 'react'
import { ListGroupItem } from 'react-bootstrap';

import MomentHelper from '../../../utils/moment/MomentHelper.js'

class InformationIndisponibility extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() { 
		console.log('here')
		let date = MomentHelper.localDateToHumanDate(this.props.date);
		console.log('here')
		let start = this.props.startTime[0] + 'h' + this.props.startTime[1];
		console.log('here')
		let end = this.props.endTime[0] + 'h' + this.props.endTime[1];
		console.log('here')
		let duration = (this.props.endTime[0] - this.props.startTime[0]) + 'h' + (this.props.endTime[1] - this.props.startTime[1]);

		console.log('here')
		console.log(date)
		console.log(start)
		console.log(end)
		console.log(duration)

		return (
			<ListGroupItem header='Indisponibilité' bsStyle='warning'>
	            {'Le ' + date + ' de ' + start + ' à ' + end}
	            <br/>
	            {"Nombre d'heures : " + duration}
	        </ListGroupItem>
		);
	}
}

export default InformationIndisponibility;