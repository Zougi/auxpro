import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
// custom components
import Utils from 'utils/Utils.js'
import CustomerSummary from './CustomerSummary.jsx';
import SearchBar from 'components-lib/SearchBar/SearchBar.jsx';

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
		this.state.search = value;
		this.setState(this.state);
	}

	_buildCustomers() {
		let customers = Utils.filter(this.state.customers || [], this._filterCustomer.bind(this));
		return customers.map(this._buildCustomer.bind(this));
	}
	_filterCustomer(customer) {
		if (this.state.search) {
			let s = customer.person.firstName + ' ' + customer.person.lastName;
			return s.toUpperCase().indexOf(this.state.search.toUpperCase()) !== -1;
		}
		return true;
	}
	_buildCustomer(customer) {
		return (
        	<ListGroupItem key={customer.id}>
            	<CustomerSummary customer={customer} onView={this.props.onView} onEdit={this.props.onEdit} onDelete={this.props.onDelete}/>
            </ListGroupItem>
        );
	}

	render() {
		let customers = this._buildCustomers();
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