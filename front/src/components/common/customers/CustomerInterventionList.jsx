// lib modules
import React from 'react';
import { Panel } from 'react-bootstrap';
// Custom modules
import InterventionOneTimeList from '../interventions/InterventionOneTimeList.jsx';

class CustomerInterventionList extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Panel header={this.props.customer.person.lastName + ' ' + this.props.customer.person.firstName}>
				<InterventionOneTimeList interventions={this.props.interventions}/>
			</Panel>
		);
	}
}

export default CustomerInterventionList;