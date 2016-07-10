// lib modules
import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
// custom modules
import Utils from '../../../utils/Utils.js'
// custom components
import FormInput from '../form/FormInput.jsx'

let FIELDS = [
	{ title: 'Addresse', path: 'address', type: 'input'},
	{ title: 'Ville', path: 'city', type: 'input' },
	{ title: 'Code postal', path: 'postalCode', type: 'input' },
	{ title: 'Pays', path: 'country', type: 'input' }
]

class Address extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			edit: props.edit || false,
			address: {}
		};
	}

	componentWillReceiveProps(props) {
		this.state.edit = props.edit || false;
		if (!this.state.edit) {
			this.state.address = {};
		}
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange(this.state.address);
		}
	}

	changeHandler(field) { 
		return function (event) {
			Utils.setField(this.state.address, field, event.target.value); 
			this.notify(); 
		}.bind(this);
	}

	render() {
		let fields = FIELDS.map(function(f) {
			return (
				<FormInput 
					static={!this.state.edit}
					key={f.title}
					title={f.title}
					defaultValue={Utils.getField(this.props.address, f.path)} 
					onChange={this.changeHandler(f.path)}/>
			);
		}.bind(this));

		return (
		<div>
			{fields}
		</div>
		);
	}	

}

export default Address;