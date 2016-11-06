import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'

import GoogleAutocomplete from 'components-lib/Map/GoogleAutocomplete.jsx'
import APButton from 'lib/Button/ApButton.jsx'


class AuxiliaryAddCity extends React.Component {

	constructor(props) {
		super(props);
	}
	
	onAutocompleteChanged(address) {
		console.log("AUTOCOMPLETE ADRESS")
		console.log(address)
		var change = {
			lattitude: address.lattitude,
			longitude: address.longitude,
			postalCode: address.postalCode,
			city: address.city
		}
		this.setState({ lattitude: change.lattitude,  longitude: change.longitude, postalCode: change.postalCode, city: change.city});
		this.props.onChange(change);
	}
	
	valid() {
		if (this.state.lattitude) {
			var change = {
				lattitude: this.state.lattitude,
				longitude: this.state.longitude,
				postalCode: this.state.postalCode,
				city: this.state.city
			}
			this.props.valid(change);
		}
	}

	render() {
		return (
			<Panel header="Nouvelle zone d'intervention">
				<GoogleAutocomplete
					edit={true}
					onChange={this.onAutocompleteChanged.bind(this)}/>
				<APButton block
					bsStyle='success'
					onClick={this.valid.bind(this)}>
					Valider
				</APButton>
			</Panel>
		);
	}
}

export default AuxiliaryAddCity;
