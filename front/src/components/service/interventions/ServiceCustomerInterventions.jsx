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
					offers={this.props.offers}
					onEdit={this.props.onEdit}
					onMatch={this.props.onMatch}
					onDelete={this.props.onDelete}
					onViewOffers={this.props.onViewOffers} />
			</Panel>
		);
	}
}

export default ServiceCustomerInterventions;