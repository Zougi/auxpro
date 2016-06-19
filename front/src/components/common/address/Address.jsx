// lib modules
import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Address extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<FormBase
					static={!this.state.edit}
					title='Addresse'
					labelSize={5}
					defaultValue={this.state.data.contact.address.address} 
					onChange={this.handleChangeAddress.bind(this)}/>
				<FormBase
					static={!this.state.edit}
					title='Code postal'
					labelSize={5}
					defaultValue={this.state.data.contact.address.postalCode} 
					onChange={this.handleChangePostal.bind(this)}/>
				<FormBase
					static={!this.state.edit}
					title='Ville' 
					labelSize={5}
					defaultValue={this.state.data.contact.address.city} 
					onChange={this.handleChangeCity.bind(this)}/>
				<FormBase
					static={!this.state.edit}
					title='Email'
					labelSize={5}
					defaultValue={this.state.data.contact.email} 
					onChange={this.handleChangeEmail.bind(this)}/>
	        </div>
		);
	}
}

export default Address;