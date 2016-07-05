// lib modules
import React from 'react';
import moment from 'moment';
// custom modules
import Utils from '../../../utils/Utils.js'
// custom components
import FormInput from '../form/FormInput.jsx'
import FormDate from '../form/FormDate.jsx'
import FormSelect from '../form/FormSelect.jsx'

let DEFAULT_PERSON = {
	birthDate: '',
	birthPlace: {
		city: '',
		country: ''
	},
	civility: 'Mr',
	firstName: '',
	lastName: '',
	nationality: '',
	socialNumber: ''
}

let PERSON_FIELDS = [
	{ title: 'Civilité', path: 'civility', type: 'select', values: [ { key: 'Mr', value: 'Mr' }, { key: 'Mme', value: 'Mme' } ] },
	{ title: 'Nom', path: 'lastName', type: 'input' },
	{ title: 'Prénom', path: 'firstName', type: 'input' },
	{ title: 'Date de naissance', path: 'birthDate', type: 'date' },
	{ title: 'Ville de naissance', path: 'birthPlace.city', type: 'input' },
	{ title: 'Pays de naissance', path: 'birthPlace.country', type: 'input' },
	{ title: 'Nationnalité', path: 'nationality', type: 'input' },
	{ title: 'N° sécurité sociale', path: 'socialNumber', type: 'input' }
]

class Person extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			edit: props.edit || false,
			person: props.person ? props.person : DEFAULT_PERSON
		};
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange(this.state.person);
		}
	}

	changeHandler(field) { 
		return function (event) {
			Utils.setField(this.state.person, field, event.target.value); 
			this.notify(); 
		}.bind(this);
	}

	render() {
		let fields = PERSON_FIELDS.map(function(f) {
			switch (f.type) {
			case 'input':
				return (
					<FormInput
						static={!this.state.edit}
						key={f.title}
						title={f.title}
						defaultValue={Utils.getField(this.state.person, f.path)} 
						onChange={this.changeHandler(f.path)}/>
				);
			case 'select':
				return (
					<FormSelect 
						static={!this.state.edit}
						key={f.title}
						title={f.title} 
						defaultValue={Utils.getField(this.state.person, f.path)} 
						values={f.values}
						onChange={this.changeHandler(f.path)}/>
				);
			case 'date':
				return (
					<FormDate
						static={!this.state.edit}
						key={f.title}
						title={f.title}
						defaultValue={Utils.getField(this.state.person, f.path)} 
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