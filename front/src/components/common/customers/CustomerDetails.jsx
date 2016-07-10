// lib modules
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
// custom components
import Address from '../entity/Address.jsx'
import Contact from '../entity/Contact.jsx'
import Person from '../entity/Person.jsx'
import SkillDetailsList from '../skills/SkillDetailsList.jsx'

class CustomerDetails extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = this._buildState(props);
	}

	componentWillReceiveProps(props) {
		this.setState(this._buildState(props));
    }

    _buildState(props) {
    	return {  
			edit: props.edit || false,
			customer: props.customer
		};
    }

	onPersonChanged(person) {
		this.state.customer.person = person;
		this.notify();
	}
	onContactChanged(contact) {
		this.state.customer.contact = contact;	
		this.notify();
	}
	onSkillsChanged(skills) {
		this.state.customer.skills = skills;
		this.notify();
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange(this.state.customer);
		}
	}

	render() {
		return (
			<Form horizontal>
				<Row>
					<Col sm={6}>
	            		<Person 
	            			edit={this.state.edit}
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
	            			edit={this.state.edit}
	            			phone={this.state.customer.contact.phone}
	            			email={this.state.customer.contact.email}
	            			onChange={this.onContactChanged.bind(this)}/>
	            	</Col>
            	</Row>
            	<Row>
					<Col sm={12}>
	            		<SkillDetailsList 
	            			edit={this.state.edit}
	            			skills={this.state.customer.skills}
	            			onChange={this.onSkillsChanged.bind(this)}/>
	            	</Col>
            	</Row>
	        </Form>
		);
	}
}

export default CustomerDetails;