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
		this.state = {};
	}

	onPersonChanged(person) {
		console.log(person)
		this.state.person = person;
		this.notify();
	}
	onContactChanged(contact) {
		console.log(contact)
		this.state.contact = contact;	
		this.notify();
	}
	onSkillsChanged(skills) {
		console.log(skills)
		this.state.skills = skills;
		this.notify();
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange({
				addresses: this.state.addresses || (this.props.customer ? this.props.customer.addresses : []),
				person: this.state.person || (this.props.customer ? this.props.customer.person : {}),
				contact: this.state.contact || (this.props.customer ? this.props.customer.contact : {}),
				skills: this.state.skills || (this.props.customer ? this.props.customer.skills : {})
			});
		}
	}

	render() {
		return (
			<Form horizontal>
				<Row>
					<Col sm={6}>
	            		<Person 
	            			edit={this.props.edit}
	            			civility={this.props.customer ? this.props.customer.person.civility : null}
							lastName={this.props.customer ? this.props.customer.person.lastName : null}
							firstName={this.props.customer ? this.props.customer.person.firstName : null}
							birthDate={this.props.customer ? this.props.customer.person.birthDate : null}
							birthCity={this.props.customer ? this.props.customer.person.birthPlace.city : null}
							birthCountry={this.props.customer ? this.props.customer.person.birthPlace.country : null}
							nationality={this.props.customer ? this.props.customer.person.nationality : null}
							socialNumber={this.props.customer ? this.props.customer.person.socialNumber : null}
	            			onChange={this.onPersonChanged.bind(this)}/>
	            	</Col>
	            	<Col sm={6}>
	            		<Contact 
	            			edit={this.props.edit}
	            			address={this.props.customer ? this.props.customer.contact.address : null}
	            			phone={this.props.customer ? this.props.customer.contact.phone : null}
	            			email={this.props.customer ? this.props.customer.contact.email : null}
	            			onChange={this.onContactChanged.bind(this)}/>
	            	</Col>
            	</Row>
            	<Row>
					<Col sm={12}>
	            		<SkillDetailsList 
	            			edit={this.props.edit}
	            			skills={this.props.customer ? this.props.customer.skills : null}
	            			onChange={this.onSkillsChanged.bind(this)}/>
	            	</Col>
            	</Row>
	        </Form>
		);
	}
}

export default CustomerDetails;