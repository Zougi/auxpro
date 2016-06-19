// lib modules
import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
// custom components
import CustomerSummary from './CustomerSummary.jsx';

class CustomerSummaryList extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let i = 0;
		let customers = this.props.customers ? this.props.customers.map(function(cust) {
            return (
            	<ListGroupItem key={cust.id}>
                	<CustomerSummary data={cust}/>
                </ListGroupItem>
            );
        }) : [];

		return (
			<Panel collapsible defaultExpanded>
				Clients enregistrés:
				<br/>
				<ListGroup fill>
		            {customers}
		        </ListGroup>
				Total : {customers.length} clients.
			</Panel>
			
		);
	}
}

export default CustomerSummaryList;