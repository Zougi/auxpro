// lib modules
import React from 'react';
import { Panel, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';
// custom components
import CustomerList from './CustomerList.jsx';

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
		return (
			<Panel>
				<Button block bsStyle='info'>Saisir nouveau client</Button>
				<br/>
				<CustomerList customers={this.state.data.customers} />
			</Panel>
		);
	}
}

export default ServiceCustomers;