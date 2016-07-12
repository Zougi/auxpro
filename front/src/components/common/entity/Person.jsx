// lib modules
import React from 'react';
import moment from 'moment';
// custom modules
import Utils from '../../../utils/Utils.js'
// custom components
import FormInput from '../form/FormInput.jsx'
import FormDate from '../form/FormDate.jsx'
import FormSelect from '../form/FormSelect.jsx'

let PERSON_FIELDS = [
	{ title: 'Civilité', path: 'civility', type: 'select', values: [ { key: 'Mr', value: 'Mr' }, { key: 'Mme', value: 'Mme' } ] },
	{ title: 'Nom', path: 'lastName', type: 'input' },
	{ title: 'Prénom', path: 'firstName', type: 'input' },
	{ title: 'Date de naissance', path: 'birthDate', type: 'date' },
	{ title: 'Ville de naissance', path: 'birthCity', type: 'input' },
	{ title: 'Pays de naissance', path: 'birthCountry', type: 'input' },
	{ title: 'Nationnalité', path: 'nationality', type: 'input' },
	{ title: 'N° sécurité sociale', path: 'socialNumber', type: 'input' }
]

class Person extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {};
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange({
				civility: this.state.civility || this.props.civility || null,
				lastName: this.state.lastName || this.props.lastName || null,
				firstName: this.state.firstName || this.props.firstName || null,
				birthDate: this.state.birthDate || this.props.birthDate || null,
				birthPlace: {
					city: this.state.birthCity || this.props.birthCity || null,
					country: this.state.birthCountry || this.props.birthCountry || null 
				},
				nationality: this.state.nationality || this.props.nationality || null,
				socialNumber: this.state.socialNumber || this.props.socialNumber || null
			});
		}
	}

	changeHandler(field) { 
		return function (value) {
			Utils.setField(this.state, field, value); 
			this.notify(); 
		}.bind(this);
	}

	render() {
		let fields = PERSON_FIELDS.map(function(f) {
			switch (f.type) {
			case 'input':
				return (
					<FormInput
						static={!this.props.edit}
						key={f.title}
						title={f.title}
						defaultValue={Utils.getField(this.props, f.path)} 
						onChange={this.changeHandler(f.path)}/>
				);
			case 'select':
				return (
					<FormSelect 
						static={!this.props.edit}
						key={f.title}
						title={f.title} 
						defaultValue={Utils.getField(this.props, f.path)} 
						values={f.values}
						onChange={this.changeHandler(f.path)}/>
				);
			case 'date':
				return (
					<FormDate
						static={!this.props.edit}
						key={f.title}
						title={f.title}
						defaultValue={Utils.getField(this.props, f.path)} 
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

export default Person;