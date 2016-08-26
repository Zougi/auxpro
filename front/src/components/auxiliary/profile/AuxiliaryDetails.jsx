import React from 'react';
import moment from 'moment';
// custom modules
import Utils from 'utils/Utils.js'
// custom components
import FormInput from 'components-lib/Form/FormInput.jsx'
import FormDate from 'components-lib/Form/FormDate.jsx'
import FormSelect from 'components-lib/Form/FormSelect.jsx'

let SERVICE_FIELDS = [
	{ title: 'Societe', path: 'society', type: 'input' },
	{ title: 'Raison sociale', path: 'socialReason', type: 'select', values: [ { key: 'mand', value: 'Mandataire' }, { key: 'prest', value: 'Prestataire' } ] },
	{ title: 'Numero Siret', path: 'siret', type: 'input' }
]

class ServiceDetails extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {};
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange({
				society: this.state.society || this.props.society || '',
				socialReason: this.state.socialReason || this.props.socialReason || '',
				siret: this.state.siret || this.props.siret || ''
			});
		}
	}

	onSocietyChanged(value) {
		this.state.society = value;
		this.notify();
	}
	onSocialReasonChanged(value) {
		this.state.socialReason = value;
		this.notify();
	}
	onSiretChanged(value) {
		this.state.siret = value;
		this.notify();
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

export default ServiceDetails;	