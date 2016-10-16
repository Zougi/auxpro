import React from 'react'

import FormInput from 'components-lib/Form/FormInput.jsx'
import PhoneValidator from 'utils/form/PhoneValidator.js'

class Contact extends React.Component {

	constructor(props) {
		super(props);
		this.state = { phone: '2' };
	}

	onPhoneChanged(value) {
		console.log(value)

		this.setState({ phone: value });
	}

	render() { 
		return (
			<div style={{height: '100px'}}>
				<FormInput 
					validator={PhoneValidator}
					static={false}
					title='Téléphone'
					defaultValue={this.state.phone} 
					onChange={this.onPhoneChanged.bind(this)}/>
			</div>
		);
	}
}

export default Contact;