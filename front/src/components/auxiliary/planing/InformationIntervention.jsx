import React from 'react'
import { ListGroupItem } from 'react-bootstrap';
// Core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

class MissionShort extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			info: false
		};
	}

	onInfo() {
		var user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		//
		let paramServ = { 
			id: this.props.mission.serviceId,
			token: user.token
		}
		Dispatcher.issue('GET_SERVICE', paramServ);
		//
		let paramCust = { 
			id: this.props.mission.customerId,
			token: user.token
		}
		Dispatcher.issue('GET_CUSTOMER', paramCust);
		this.state.info = true;
		this.setState(this.state);
	}

	onInfoOff() {
		this.state.info = false;
		this.setState(this.state);
	}

	componentDidMount() {
        StoreRegistry.register('SERVICE_STORE', this, this.onServiceUpdate.bind(this));
        StoreRegistry.register('CUSTOMER_STORE', this, this.onCustomerUpdate.bind(this));
    }

    componentWillUnmount() {
        StoreRegistry.unregister('SERVICE_STORE', this);   
        StoreRegistry.unregister('CUSTOMER_STORE', this);   
    }

    onServiceUpdate() {
    	this.state.service = StoreRegistry.getStore('SERVICE_STORE').getData().data;
    	this.setState(this.state);
    }

    onCustomerUpdate() {
    	this.state.customer = StoreRegistry.getStore('CUSTOMER_STORE').getCustomer(this.props.mission.customerId);
    	this.setState(this.state);
    }

	render() {
		var info = '';
		var action = (<a className='info-span' onClick={this.onInfo.bind(this)}>+info</a>);
		if (this.state.info) {
			if (this.state.service && this.state.customer) {
				info = (
					<div>
						SAD: {this.state.service.society}<br/>
						Client: {this.state.customer.person.firstName} {this.state.customer.person.lastName}<br/>
						Addresse: {this.state.customer.contact.address.address} {this.state.customer.contact.address.postalCode} {this.state.customer.contact.address.city}<br/>
					</div>);
			} else if (this.state.service) {
				info = (<div>SAD: {this.state.service.socialReason}<br/></div>);
			} else if (this.state.customer) {
				info = (
					<div>
						Client: {this.state.customer.person.firstName} {this.state.customer.person.lastName}<br/>
						Addresse: {this.state.customer.contact.address.address} {this.state.customer.contact.address.postalCode} {this.state.customer.contact.address.city}<br/>
					</div>);
			} else {
				info = 'Chargement...'	
			}
			action = (<a className='info-span' onClick={this.onInfoOff.bind(this)}>-info</a>);
		}
		return (
			<ListGroupItem header='Mission' bsStyle='success'>
	            Le {this.props.date} de {this.props.mission.startHour}h à {this.props.mission.endHour}h<br/>
	            Nombre d'heures : {this.props.mission.endHour - this.props.mission.startHour}h<br/>
	            {info}
	            {action}
	        </ListGroupItem>
		);
	}
}

export default MissionShort;