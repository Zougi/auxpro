// lib modules
import React from 'react';
import moment from 'moment';
// custom modules
import Utils from '../../../utils/Utils.js'
// custom components
import FormInput from '../../common/form/FormInput.jsx'
import FormDate from '../../common/form/FormDate.jsx'
import FormSelect from '../../common/form/FormSelect.jsx'

let SERVICE_FIELDS = [
	{ title: 'Societe', path: 'society', type: 'input' },
	{ title: 'Raison sociale', path: 'socialReason', type: 'select', values: [ { key: 'mand', value: 'Mandataire' }, { key: 'prest', value: 'Prestataire' } ] },
	{ title: 'Numero Siret', path: 'siret', type: 'input' }
]

class ServiceDetails extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			edit: props.edit || false,
			service: {}
		};
		this.componentWillReceiveProps(props);
	}

	componentWillReceiveProps(props) {
		this.state.edit = props.edit || false;
		if (!this.state.edit) {
			this.state.service = {};	
		}
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange(this.state.service);
		}
	}

	changeHandler(field) { 
		return function (event) {
			Utils.setField(this.state.service, field, event.target.value); 
			this.notify(); 
		}.bind(this);
	}

	render() {
		let fields = SERVICE_FIELDS.map(function(f) { 
			switch (f.type) {
			case 'input':
				return (
					<FormInput
						static={!this.state.edit}
						key={f.title}
						title={f.title}
						defaultValue={Utils.getField(this.props.service, f.path)} 
						onChange={this.changeHandler(f.path)}/>
				);
			case 'select':
				return (
					<FormSelect 
						static={!this.state.edit}
						key={f.title}
						title={f.title} 
						defaultValue={Utils.getField(this.props.service, f.path)} 
						values={f.values}
						onChange={this.changeHandler(f.path)}/>
				);
			}
		}.bind(this));
		

		return (
			<div>
				{fields}
			</div>
		);
	}
}

export default ServiceDetails;	