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
	{ title: 'Ville de naissance', path: 'birthPlace.city', type: 'input' },
	{ title: 'Pays de naissance', path: 'birthPlace.country', type: 'input' },
	{ title: 'Nationnalité', path: 'nationality', type: 'input' },
	{ title: 'N° sécurité sociale', path: 'socialNumber', type: 'input' }
]

class Person extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = this._buildState(props);
	}

	componentWillReceiveProps(props) {
		this.setState(this._buildState(props));
		console.log(this.state);
	}

	_buildState(props) {
    	return {  
			edit: props.edit || false,
			data: {
				civility: props.civility,
				lastName: props.lastName,
				firstName: props.firstName,
				birthDate: props.birthDate,
				birthPlace: {
					city: props.birthCity,
					country: props.birthCountry 
				},
				nationality: props.nationality,
				socialNumber: props.socialNumber
			}
		};
    }

	notify() {
		if (this.props.onChange) {
			this.props.onChange(this.state.data);
		}
	}

	changeHandler(field) { 
		return function (value) {
			Utils.setField(this.state.data, field, value); 
			this.notify(); 
		}.bind(this);
	}

	render() {
		let fields = PERSON_FIELDS.map(function(f) {
			//console.log(f);
			//console.log(this.state.data);
			//console.log(Utils.getField(this.state.data, f.path));
			switch (f.type) {
			case 'input':
				return (
					<FormInput
						static={!this.state.edit}
						key={f.title}
						title={f.title}
						defaultValue={Utils.getField(this.state.data, f.path)} 
						onChange={this.changeHandler(f.path)}/>
				);
			case 'select':
				return (
					<FormSelect 
						static={!this.state.edit}
						key={f.title}
						title={f.title} 
						defaultValue={Utils.getField(this.state.data, f.path)} 
						values={f.values}
						onChange={this.changeHandler(f.path)}/>
				);
			case 'date':
				return (
					<FormDate
						static={!this.state.edit}
						key={f.title}
						title={f.title}
						defaultValue={Utils.getField(this.state.data, f.path)} 
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