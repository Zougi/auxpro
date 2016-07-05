// lib modules
import React from 'react';
import { Panel } from 'react-bootstrap';

import FormDate from '../form/FormDate.jsx'
import FormTime from '../form/FormTime.jsx'

class InterventionEditOneTime extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onDateChanged() {

	}

	render() {
		return (
			<Panel>
				<FormDate
					static={false}
					title='Date'
					onChange={this.onDateChanged.bind(this)}/>
				<br/><br/>
				<FormTime
					static={false}
					title='Début'
					onChange={this.onDateChanged.bind(this)}/>
				<br/><br/>
				<FormTime
					static={false}
					title='Fin'
					onChange={this.onDateChanged.bind(this)}/>
			</Panel>
		);
	}
}

export default InterventionEditOneTime;