// lib modules
import React from 'react';
import { Panel } from 'react-bootstrap';
// Custom modules
import InterventionSummaryList from '../interventions/InterventionSummaryList.jsx';

class CustomerInterventionList extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Panel header={this.props.customer.person.lastName + ' ' + this.props.customer.person.firstName}>
				<InterventionSummaryList interventions={this.props.interventions}/>
			</Panel>
		);
	}
}

export default CustomerInterventionList;