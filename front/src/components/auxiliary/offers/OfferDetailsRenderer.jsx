import React from 'react';
import { Panel, Button } from 'react-bootstrap';

class InterventionSummary extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<Panel>
			<Button block bsStyle='info' onClick={this.props.onClose}>
				Retour
			</Button>
			<br/>
			<Panel header="Détails de l'offre">
			</Panel>
		</Panel>
		);
	}
}

export default InterventionSummary;