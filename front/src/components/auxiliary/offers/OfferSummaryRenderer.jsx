import React from 'react';
import moment from 'moment';
import { Panel, Col } from 'react-bootstrap';

import PanelHeaderAction from '../../common/PanelHeaderAction/PanelHeaderAction.jsx'

class InterventionSummary extends React.Component {
	
	constructor(props) {
		super(props);
		this.actions = [
			{ 
				tooltip: 'Voir offre',
				bsStyle: 'info', 
				glyph: 'search', 
				callback: props.onView 
			},
			{ 
				tooltip: 'Accepter offre',
				bsStyle: 'success', 
				glyph: 'ok', 
				callback: props.onAccept 
			},
			{ 
				tooltip: 'Décliner intervention',
				bsStyle: 'danger', 
				glyph: 'remove', 
				callback: props.onReject 
			}
		];
	}

	render() {
		return (
			<Col sm={6} md={4}>
				<PanelHeaderAction title='Offre' actions={this.actions}>
				
				</PanelHeaderAction>
			</Col>
		);
	}
}

export default InterventionSummary;