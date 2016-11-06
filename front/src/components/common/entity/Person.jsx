// lib modules
import React from 'react';
import moment from 'moment';
// custom modules
import Utils from 'utils/Utils.js'
// custom components
import FormInput from 'components-lib/Form/FormInput.jsx'
import FormDate from 'components-lib/Form/FormDate.jsx'
import FormSelect from 'components-lib/Form/FormSelect.jsx'

import CustomValidator from 'utils/form/CustomValidator.js'
import StringValidator from 'utils/form/StringValidator.js'
import NonNullValidator from 'utils/form/NonNullValidator.js'

let PERSON_FIELDS = [
	{ 
		title: 'Civilité', 
		path: 'civility', 
		type: 'select', 
		values: [ 
			{ key: 'Mr', value: 'Mr' }, 
			{ key: 'Mme', value: 'Mme' } 
		] 
	},
	{ 
		title: 'Nom', 
		path: 'lastName', 
		type: 'input', 
		validator: new StringValidator({ lengthMin: 3 }) 
	},
	{ 
		title: 'Prénom', 
		path: 'firstName', 
		type: 'input', 
		validator: new StringValidator({ lengthMin: 3 }) 
	},
	{ 
		title: 'Date de naissance', 
		path: 'birthDate', 
		type: 'date', 
		validator: NonNullValidator 
	},
	{ 
		title: 'Ville de naissance', 
		path: 'birthCity', 
		type: 'input', 
		validator: new StringValidator({ lengthMin: 3 }) 
	},
	{ 
		title: 'Pays de naissance', 
		path: 'birthCountry', 
		type: 'input', 
		validator: new StringValidator({ lengthMin: 3 }) 
	},
	{ 
		title: 'Nationnalité', 
		path: 'nationality', 
		type: 'input', 
		validator: new StringValidator({ lengthMin: 3 }) 
	},
	{ 
		title: 'N° sécurité sociale', 
		path: 'socialNumber', 
		type: 'input', 
		validator: new CustomValidator({ regSuccess: new RegExp("^[1-2][0-9]{12}$") }) 
	},
	{ 
		title: "N° carte d'identité", 
		path: 'ciNumber', 
		type: 'input', 
		validator: new CustomValidator({ regSuccess: new RegExp("^[0-9]{12}$") }) 
	}
]

class Person extends React.Component {
	
	constructor(props) {
		super(props);
		this.onComponentWillReceiveProps(props);
	}

	onComponentWillReceiveProps(props) {
		this.person = {};
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange({
				civility: this.person.civility || this.props.civility || null,
				lastName: this.person.lastName || this.props.lastName || null,
				firstName: this.person.firstName || this.props.firstName || null,
				birthDate: this.person.birthDate || this.props.birthDate || null,
				birthCity: this.person.birthCity || this.props.birthCity || null,
				birthCountry: this.person.birthCountry || this.props.birthCountry || null,
				nationality: this.person.nationality || this.props.nationality || null,
				socialNumber: this.person.socialNumber || this.props.socialNumber || null,
				ciNumber: this.person.ciNumber || this.props.ciNumber || null
			});
		}
	}

	changeHandler(field) { 
		return function (event) {
			Utils.setField(this.person, field, event.value || event); 
			this.notify(); 
		}.bind(this);
	}

	render() {
		let fields = PERSON_FIELDS.map(function(f) {
			switch (f.type) {
			case 'input':
				return (
					<FormInput
						validator={f.validator}
						edit={this.props.edit}
						key={f.title}
						title={f.title}
						defaultValue={Utils.getField(this.props, f.path)} 
						onChange={this.changeHandler(f.path)}/>
				);
			case 'select':
				return (
					<FormSelect 
						edit={this.props.edit}
						key={f.title}
						title={f.title} 
						defaultValue={Utils.getField(this.props, f.path)} 
						values={f.values}
						onChange={this.changeHandler(f.path)}/>
				);
			case 'date':
				return (
					<FormDate
						validator={f.validator}
						edit={this.props.edit}
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