// lib modules
import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';
// custom components
import ServiceCustomer from './ServiceCustomer.jsx';

class ServiceCustomers extends React.Component {
	
	constructor(props) {
		super(props);
		this.prepareState();
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		var args = {
			sId: user.id,
			token: user.token
		}
        Dispatcher.issue('GET_SERVICE_CUSTOMERS', args);
	}

	componentDidMount() {
        StoreRegistry.register('SERVICE_STORE', this, this.onServiceUpdate.bind(this));
    }

    componentWillUnmount() {
        StoreRegistry.unregister('SERVICE_STORE', this);   
    }

    onServiceUpdate() {
    	this.setState(this.prepareState());
    }

    prepareState() {
    	let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
    	let data = StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + user.id);
    	this.state = {
			user: user,
			data: data
		};
		return this.state;
    }

	render() {
		let i = 0;
		let customers = this.state.data.customers ? this.state.data.customers.
		sort(function(a, b) {
			retur
		}).
		map(function(cust) {
            return (
            	<ListGroupItem>
                	<ServiceCustomer key={i++} data={cust}/>
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

export default ServiceCustomers;