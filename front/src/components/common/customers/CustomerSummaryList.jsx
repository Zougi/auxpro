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
			customers: []
		}
		this.updateState(props);
	}

	componentWillReceiveProps(props) {
		console.log('update list');
		this.updateState(props);
		this.setState(this.state);
	}

	updateState(props) {
		this.state.customers = props.customers || [];
	}

	onSearch(value) {
		if (value) {
			this.state.customers = this.state.customers.filter(function(cust) {
				let s = cust.person.firstName + ' ' + cust.person.lastName;
				return s.toUpperCase().indexOf(value.toUpperCase()) !== -1;
			});
		} else {
			this.state.customers = this.props.customers || [];
		}
		this.setState(this.state);
	}

	render() {
		let customers = this.state.customers.map(function(cust) {
            return (
            	<ListGroupItem key={cust.id}>
                	<CustomerSummary data={cust} onView={this.props.onView} onEdit={this.props.onEdit}/>
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