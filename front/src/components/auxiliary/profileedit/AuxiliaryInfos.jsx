import React from 'react';
import { Panel } from 'react-bootstrap'

import FormInput from 'components-lib/Form/FormInput.jsx'
import FormSelect from 'components-lib/Form/FormSelect.jsx'
import FormTextArea from 'components-lib/Form/FormTextArea.jsx'

class AuxiliaryInfos extends React.Component {
	
	constructor(props) {
		super(props);
		this.onComponentWillReceiveProps(props);
	}

	onComponentWillReceiveProps(props) {
		this.infos = {};
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange({
				entrepreneur: this.infos.entrepreneur || this.props.entrepreneur || false,
				diploma: this.infos.diploma || this.props.diploma || '',
				description: this.infos.description || this.props.description || ''
			});
		}
	}

	onEntrepreneurChanged(value) {
		this.infos.entrepreneur = value;
		this.notify();
	}
	onDiplomaChanged(value) {
		this.infos.diploma = value;
		this.notify();
	}
	onDescriptionChanged(value) {
		this.infos.description = value;
		this.notify();
	}

	render() {
		return (
			<Panel header='Informations professionnelles' bsStyle='info'>
				<FormSelect 
					static={false}
					title='Auto-entrepreneur ?'
					defaultValue={this.props.entrepreneur ? true : false} 
					values={[ { key: true, value: 'Oui' }, { key: false, value: 'Non' } ]}
					onChange={this.onEntrepreneurChanged.bind(this)}/>
				<FormInput 
					static={false}
					title='Diplôme'
					defaultValue={this.props.diploma} 
					onChange={this.onDiplomaChanged.bind(this)}/>
				<FormTextArea
					static={false}
					title='Ma description'
					rows={5}
					defaultValue={this.props.description} 
					onChange={this.onDescriptionChanged.bind(this)}/>
			</Panel>
		);
	}
}

export default AuxiliaryInfos;