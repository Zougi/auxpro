import React from 'react'
import { Panel } from 'react-bootstrap'
// Custom components
import AuxiliaryGeozone from 'components/auxiliary/map/AuxiliaryGeozone.jsx'
import { APButton } from 'ap-react-bootstrap'

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
				<APButton
					block
					bsStyle='primary'
					onClick={this.cancel.bind(this)}>
					Annuler
				</APButton>
			</Panel>
		);
	}
}
export default AuxiliaryGeoPanel;
