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
		this.state = this._buildState(props);
	}

	componentWillReceiveProps(props) {
		this.setState(this._buildState(props));
	}

	_buildState(props) {
    	return {  
			edit: props.edit || false,
			data: {
				society: props.society,
				socialReason: props.socialReason,
				siret: props.siret
			}
		};
    }

	notify() {
		if (this.props.onChange) {
			this.props.onChange(this.state.data);
		}
		this.setState(this.state);
	}

	onSocietyChanged(value) {
		this.state.data.society = value;
		this.notify();
	}
	onSocialReasonChanged(value) {
		this.state.data.socialReason = value;
		this.notify();
	}
	onSiretChanged(value) {
		this.state.data.siret = value;
		this.notify();
	}

	render() {
		return (
			<div>
				<FormInput
					static={!this.state.edit}
					title='Société'
					defaultValue={this.state.data.society} 
					onChange={this.onSocietyChanged.bind(this)}/>
				<FormSelect 
					static={!this.state.edit}
					title='Raison sociale' 
					defaultValue={this.state.data.socialReason} 
					values={[ { key: 'mand', value: 'Mandataire' }, { key: 'prest', value: 'Prestataire' } ]}
					onChange={this.onSocialReasonChanged.bind(this)}/>
				<FormInput
					static={!this.state.edit}
					title='N° Siret'
					defaultValue={this.state.data.siret} 
					onChange={this.onSiretChanged.bind(this)}/>
			</div>
		);
	}
}

export default ServiceDetails;	