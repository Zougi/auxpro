import React from 'react';
import { Panel } from 'react-bootstrap';

import InterventionSummaryList from '../../common/interventions/InterventionSummaryList.jsx';

class ServiceCustomerInterventions extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Panel header={this.props.customer.person.lastName + ' ' + this.props.customer.person.firstName}>
				<InterventionSummaryList 
					interventions={this.props.interventions}
					onEdit={this.props.onEdit}
					onMatch={this.props.onMatch}
					onDelete={this.props.onDelete}/>
			</Panel>
		);
	}
}

export default ServiceCustomerInterventions;