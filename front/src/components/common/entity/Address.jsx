// lib modules
import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
// custom modules
import Utils from 'utils/Utils.js'
// custom components
import FormInput from 'components-lib/Form/FormInput.jsx'
import GoogleAutocomplete from 'components-lib/Map/GoogleAutocomplete.jsx'

class Address extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			address: this.props.address,
			postalCode: this.props.postalCode,
			city: this.props.city,
			country: this.props.country
		}
	}

	onAutocompleteChanged(address) {
		this.setState({ address: address.address });
		this.setState({ postalCode: address.postalCode });
		this.setState({ city: address.city });
		this.setState({ country: address.country });
		if (this.props.onChange) {
			this.props.onChange(address);
		}
	}

	render() {
		return (
		<div>
		{this.props.edit ?
			<GoogleAutocomplete 
				edit={this.props.edit}
				onChange={this.onAutocompleteChanged.bind(this)}
				placeholder={this.state.address + ', ' + this.state.postalCode + ' ' + this.state.city}/>
		: '' }
			<FormInput 
				static={true}
				title='Addresse'
				value={this.state.address} />
			<FormInput 
				static={true}
				title='Code postal'
				value={this.state.postalCode} />
			<FormInput 
				static={true}
				title='Ville'
				value={this.state.city} />
			<FormInput 
				static={true}
				title='Pays'
				value={this.state.country} />
		</div>
		);
	}
}

export default Address;