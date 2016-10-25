// lib modules
import React from 'react';
import { Panel, Row, Col, Form } from 'react-bootstrap';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import Contact from 'components/common/entity/Contact.jsx'
import Person from 'components/common/entity/Person.jsx'
import SkillDetailsList from 'components/common/skills/SkillDetailsList.jsx'
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog.jsx';

let MODES = {
	CREATE: 'CREATE',
	'EDIT': 'EDIT'
}

class ServiceCustomerEdit extends ServiceBaseComponent {
	
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
		if (this.props.params.customerId) {
			return { 
				mode: MODES.EDIT,
				customer: this.getCustomer(this.props.params.customerId)
			};
		} else {
			return { 
				mode: MODES.CREATE,
				customer: {
					serviceId: this.getLoginData('/id'),
					person: { birthPlace: {} },
					contact: { address: {} },
					skills: {}
				} 
			};	
		}
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onSaveCustomer() {
		if (this.state.mode === MODES.CREATE) {
			this.createCustomer(this.state.customer).
			then(function () {
				Dispatcher.issue('NAVIGATE', {path: '/sad/customers'});
			});
		} else {
			this.updateCustomer(this.state.customer).
			then(function () {
				Dispatcher.issue('NAVIGATE', {path: '/sad/customers'});
			});
		}
	}
	onCancel(customer) {
		Dispatcher.issue('NAVIGATE', {path: '/sad/customers'});
	}

	onPersonChanged(person) {
		this.state.customer.person = person;
		this.forceUpdate();
	}
	onContactChanged(contact) {
		this.state.customer.contact = contact;	
		this.forceUpdate();
	}
	onSkillsChanged(skills) {
		this.state.customer.skills = skills;
		this.forceUpdate();
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { return (
	<Row>
		<Panel header={(<strong>Modifier informations client</strong>)}>
			<Form horizontal>
				<Row>
					<Col sm={6}>
	            		<Person 
	            			edit={true}
	            			civility={this.state.customer.person.civility}
							lastName={this.state.customer.person.lastName}
							firstName={this.state.customer.person.firstName}
							birthDate={this.state.customer.person.birthDate}
							birthCity={this.state.customer.person.birthPlace.city}
							birthCountry={this.state.customer.person.birthPlace.country}
							nationality={this.state.customer.person.nationality}
							socialNumber={this.state.customer.person.socialNumber}
	            			onChange={this.onPersonChanged.bind(this)}/>
	            	</Col>
	            	<Col sm={6}>
	            		<Contact 
	            			edit={true}
	            			address={this.state.customer.contact.address}
	            			phone={this.state.customer.contact.phone}
	            			email={this.state.customer.contact.email}
	            			onChange={this.onContactChanged.bind(this)}/>
	            	</Col>
            	</Row>
            	<Row>
					<Col sm={12}>
	            		<SkillDetailsList 
	            			edit={true}
	            			skills={this.state.customer.skills}
	            			onChange={this.onSkillsChanged.bind(this)}/>
	            	</Col>
            	</Row>
	        </Form>
			<br/>
			<ButtonsEndDialog 
				onOk={this.onSaveCustomer.bind(this)} okTitle='Enregistrer modifications' 
				onCancel={this.onCancel.bind(this)} cancelTitle='Annuler'/>
		</Panel>
	</Row>
	);}
}

export default ServiceCustomerEdit;