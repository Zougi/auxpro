// lib modules
import React from 'react';
import moment from 'moment';
// custom modules
import Utils from '../../../utils/Utils.js'
// custom components
import FormInputBase from '../form/FormInputBase.jsx'
import FormSelectBase from '../form/FormSelectBase.jsx'

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
	{ title: 'Civilité', path: 'civility', type: 'select', values: ['Mr', 'Mme'] },
	{ title: 'Nom', path: 'lastName', type: 'input' },
	{ title: 'Prénom', path: 'firstName', type: 'input' },
	{ title: 'Date de naissance', path: 'birthDate', type: 'input' },
	{ title: 'Ville de naissance', path: 'birthPlace.city', type: 'input' },
	{ title: 'Pays de naissance', path: 'birthPlace.country', type: 'input' },
	{ title: 'Nationnalité', path: 'nationality', type: 'input' },
	{ title: 'N° sécurité sociale', path: 'socialNumber', type: 'input' }
]

class Person extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			edit: props.person ? false : true,
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
					<FormInputBase 
						static={!this.state.edit}
						key={f.title}
						title={f.title}
						defaultValue={Utils.getField(this.state.person, f.path)} 
						onChange={this.changeHandler(f.path)}/>
				);
			case 'select':
				return (
					<FormSelectBase 
						static={!this.state.edit}
						key={f.title}
						title={f.title} 
						defaultValue={Utils.getField(this.state.person, f.path)} 
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

export default Person;