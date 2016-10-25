// lib modules
import React from 'react';
import { Panel, Button, Row, Col, Modal } from 'react-bootstrap';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import CustomerSummaryList from 'components/common/customers/CustomerSummaryList.jsx';
import DialogConfirmation from 'components-lib/DialogConfirmation/DialogConfirmation.jsx';

class ServiceCustomers extends ServiceBaseComponent {
	
	constructor(props) {
		super(props);
        this.state = this._buildState();
	}


	// State Management functions //
	// --------------------------------------------------------------------------------
	
	componentDidMount() {
		StoreRegistry.register('SERVICE_STORE', this, this.onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);   
	}
	onStoreUpdate() {
		this.setState(this._buildState());
    }
    _buildState() {
    	return { 
    		customers: this.getCustomers() 
    	};
    }


	// Callbacks functions //
	// --------------------------------------------------------------------------------

    onAddCustomer(customer) {
    	Dispatcher.issue('NAVIGATE', {path: '/sad/customers/new'});
    }
    onEditCustomer(customer) {
 		Dispatcher.issue('NAVIGATE', {path: '/sad/customers/' + customer.id + '/edit'});
    }
    onViewCustomer(customer) {
    	Dispatcher.issue('NAVIGATE', {path: '/sad/customers/' + customer.id});
    }
    onDeleteCustomer(customer) {
    	this.setState({ 
    		showDeleteConfirm: true,
    		customerToDelete: customer.id
    	});
    }
    doDeleteCustomer() {
    	this.deleteCustomer(this.state.customerToDelete);
    }    
    cancelDeleteCustomer() {
    	this.setState({ 
    		showDeleteConfirm: false,
    		customerToDelete: null 
    	});
    }


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { return (
		<Row>
			<Panel header={(<strong>Clients enregistrés</strong>)}>
				<Button block bsStyle='info' onClick={this.onAddCustomer.bind(this)}>Saisir nouveau client</Button>
				<br/>
				<CustomerSummaryList 
					customers={this.state.customers} 
					onEdit={this.onEditCustomer.bind(this)}
					onView={this.onViewCustomer.bind(this)}
					onDelete={this.onDeleteCustomer.bind(this)}/>
			</Panel>
			<DialogConfirmation
				show={this.state.showDeleteConfirm}
				title='Supprimer client ?'
				onConfirm={this.doDeleteCustomer.bind(this)}
				confirmStyle='danger'
				confirmText='Supprimer'
				onCancel={this.cancelDeleteCustomer.bind(this)}
				cancelStyle='default'
				cancelText='Annuler'/>
			
		</Row>
	);}
}

export default ServiceCustomers;