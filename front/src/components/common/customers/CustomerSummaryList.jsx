// lib modules
import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
// custom components
import CustomerSummary from './CustomerSummary.jsx';
import SearchBar from '../form/SearchBar.jsx';

class CustomerSummaryList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			customers: [],
			search: ''
		}
		this.updateState(props);
	}

	componentWillReceiveProps(props) {
		this.updateState(props);
		this.setState(this.state);
	}

	updateState(props) {
		this.state.customers = props.customers || [];
	}

	onSearch(value) {
		console.log('search ' + value)
		this.state.search = value;
		this.setState(this.state);
	}

	render() {
		let customers = this.state.customers;
		if (this.state.search) {
			customers = this.state.customers.filter(function(cust) {
				let s = cust.person.firstName + ' ' + cust.person.lastName;
				return s.toUpperCase().indexOf(this.state.search.toUpperCase()) !== -1;
			}.bind(this));
		}
		customers = customers.map(function(cust) {
            return (
            	<ListGroupItem key={cust.id}>
                	<CustomerSummary data={cust} onView={this.props.onView} onEdit={this.props.onEdit} onDelete={this.props.onDelete}/>
                </ListGroupItem>
            );
        }.bind(this));

		return (
			<div>
				<SearchBar onChange={this.onSearch.bind(this)}/>
				<Panel>
					<ListGroup fill>
			            {customers}
			        </ListGroup>
					<strong>Total : {customers.length} clients.</strong>
				</Panel>
			</div>
		);
	}
}

export default CustomerSummaryList;