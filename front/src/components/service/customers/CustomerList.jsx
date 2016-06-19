// lib modules
import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
// custom components
import CustomerSummary from './CustomerSummary.jsx';

class CustomerList extends React.Component {
	
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
			<ListGroup>
	            {customers}
	        </ListGroup>
		);
	}
}

export default CustomerList;