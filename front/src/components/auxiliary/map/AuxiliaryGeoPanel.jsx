import React from 'react'
import { Panel, Button } from 'react-bootstrap'
// Custom components
import AuxiliaryGeozone from './AuxiliaryGeozone.jsx'

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
