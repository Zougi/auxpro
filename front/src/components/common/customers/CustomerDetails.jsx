// lib modules
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
// custom components
import Contact from '../entity/Contact.jsx'
import Person from '../entity/Person.jsx'

class CustomerDetails extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			edit: props.edit || (props.data ? false : true),
		};
	}

	render() {
		return (
			<Form horizontal>
				<Row>
					<Col sm={6}>
	            		<Person 
	            			edit={this.state.edit}
	            			person={this.props.data ? this.props.data.person : null}/>
	            	</Col>
	            	<Col sm={6}>
	            		<Contact 
	            			edit={this.state.edit}
	            			contact={this.props.data ? this.props.data.contact : null}/>
	            	</Col>
            	</Row>
	        </Form>
		);
	}
}

export default CustomerDetails;