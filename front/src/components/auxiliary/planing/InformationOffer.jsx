import React from 'react'
import { ListGroupItem } from 'react-bootstrap';

import MomentHelper from 'utils/moment/MomentHelper.js'

class InformationOffer extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() { 
		let date = MomentHelper.localDateToHumanDate(this.props.date);
		let start = MomentHelper.localTimeToHumanTime(this.props.startTime[0]);
		let end = MomentHelper.localTimeToHumanTime(this.props.endTime[0]);

		let d = [ 
			this.props.endTime[0] - this.props.startTime[0], 
			this.props.endTime[1] - this.props.startTime[1] 
		];
		let duration = MomentHelper.localTimeToHumanTime(d);

		return (
			<ListGroupItem header='Offre' bsStyle='info'>
	            {'Le ' + date + ' de ' + start + ' à ' + end}
	            <br/>
	            {"Nombre d'heures : " + duration}
	        </ListGroupItem>
		);
	}
}

export default InformationOffer;