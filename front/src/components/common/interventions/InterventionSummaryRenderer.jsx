// lib modules
import React from 'react';
import moment from 'moment';
import { Panel, Col } from 'react-bootstrap';

import PanelHeaderAction from 'components-lib/PanelHeaderAction/PanelHeaderAction.jsx'

import InterventionSummaryOneTime from './InterventionSummaryOneTime.jsx'
import InterventionSummaryRecurence from './InterventionSummaryRecurence.jsx'

class InterventionSummary extends React.Component {
	
	constructor(props) {
		super(props);
		this.actions = [
			{ 
				tooltip: 'Editer intervention',
				bsStyle: 'info', 
				glyph: 'pencil', 
				callback: props.onEdit 
			},
			{ 
				tooltip: 'Envoyer offre',
				bsStyle: 'success', 
				glyph: 'upload', 
				callback: props.onMatch 
			},
			{ 
				tooltip: 'Supprimer intervention',
				bsStyle: 'danger', 
				glyph: 'remove', 
				callback: props.onDelete 
			}
		];
	}

	render() {
		return (
			<Col sm={6} md={4}>
				<PanelHeaderAction title='Intervention' actions={this.actions}>
				{ this.props.intervention.oneTime ?
					<InterventionSummaryOneTime oneTime={this.props.intervention.oneTime} />
				:
					''
				}
				{ this.props.intervention.recurence ?
					<InterventionSummaryRecurence recurence={this.props.intervention.recurence}/>
				:
					''
				}	
				</PanelHeaderAction>
			</Col>
		);
	}
}

export default InterventionSummary;