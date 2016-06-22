// lib modules
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
// custom components
import Contact from '../entity/Contact.jsx'
import Person from '../entity/Person.jsx'
import SkillDetailsList from '../skills/SkillDetailsList.jsx'

class CustomerDetails extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			edit: props.edit || false,
			data: this.props.data || {}
		};
	}

	onPersonChanged(person) {
		this.state.data.person = person;
		this.notify();
	}
	onContactChanged(contact) {
		this.state.data.contact = contact;	
		this.notify();
	}
	onSkillsChanged(skills) {
		this.state.data.skills = skills;
		this.notify();
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange(this.state.data);
		}
	}

	render() {
		return (
			<Form horizontal>
				<Row>
					<Col sm={6}>
	            		<Person 
	            			edit={this.state.edit}
	            			person={this.state.data.person}
	            			onChange={this.onPersonChanged.bind(this)}/>
	            	</Col>
	            	<Col sm={6}>
	            		<Contact 
	            			edit={this.state.edit}
	            			contact={this.state.data.contact}
	            			onChange={this.onContactChanged.bind(this)}/>
	            	</Col>
            	</Row>
            	<Row>
					<Col sm={12}>
	            		<SkillDetailsList 
	            			edit={this.state.edit}
	            			skills={this.state.data.skills}
	            			onChange={this.onSkillsChanged.bind(this)}/>
	            	</Col>
            	</Row>
	        </Form>
		);
	}
}

export default CustomerDetails;