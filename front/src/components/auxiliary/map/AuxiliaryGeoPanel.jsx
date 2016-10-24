import React from 'react'
import { Row, Col, Panel, Button } from 'react-bootstrap'
// Custom components
import AuxiliaryGeozone from './AuxiliaryGeozone.jsx'
import FormInput from 'components-lib/Form/FormInput.jsx'
import FormSelect from 'components-lib/Form/FormSelect.jsx'
// Libs
import Utils from 'utils/Utils.js'

class AuxiliaryGeoPanel extends React.Component {

	constructor(props) {
		super(props);
	}

	

	render() {
		return (
			<Panel header="Nouvelle zone d'intervention">
				<AuxiliaryGeozone onModeChanged={this.props.onToggleSelect}/>
				<br/>
				<Button block
					bsStyle='success'
					onClick={this.createGeozone.bind(this)}>
					Enregistrer
				</Button>
				<br/>
				<Button block
					bsStyle='primary'
					onClick={this.cancel.bind(this)}>
					Annuler
				</Button>
			</Panel>
		);
	}
}

export default AuxiliaryGeoPanel;
