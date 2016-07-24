import React from 'react';
import moment from 'moment';
// custom modules
import Utils from '../../../utils/Utils.js'
// custom components
import FormInput from '../../../components-lib/Form/FormInput.jsx'
import FormDate from '../../../components-lib/Form/FormDate.jsx'
import FormSelect from '../../../components-lib/Form/FormSelect.jsx'

let SERVICE_FIELDS = [
	{ title: 'Societe', path: 'society', type: 'input' },
	{ title: 'Raison sociale', path: 'socialReason', type: 'select', values: [ { key: 'mand', value: 'Mandataire' }, { key: 'prest', value: 'Prestataire' } ] },
	{ title: 'Numero Siret', path: 'siret', type: 'input' }
]

class AuxiliaryQuestionnary extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {};
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange();
		}
	}

	render() {
		return (
			<div>
				<FormInput
					static={!this.props.edit}
					title='Société'
					defaultValue={this.props.society} 
					onChange={this.onSocietyChanged.bind(this)}/>
				<FormSelect 
					static={!this.props.edit}
					title='Raison sociale' 
					defaultValue={this.props.socialReason} 
					values={[ { key: 'mand', value: 'Mandataire' }, { key: 'prest', value: 'Prestataire' } ]}
					onChange={this.onSocialReasonChanged.bind(this)}/>
				<FormInput
					static={!this.props.edit}
					title='N° Siret'
					defaultValue={this.props.siret} 
					onChange={this.onSiretChanged.bind(this)}/>
			</div>
		);
	}
}

export default AuxiliaryQuestionnary;