import React from 'react'
import moment from 'moment'
import { Panel, Col } from 'react-bootstrap'
// Custom components
import APPanelHeaderAction from 'components-lib/Panel/APPanelHeaderAction'
import InterventionSummaryOneTime from './InterventionSummaryOneTime'
import InterventionSummaryRecurence from './InterventionSummaryRecurence'

class InterventionSummary extends React.Component {
	
	constructor(props) {
		super(props);
		this.actions = [
			{ 
				tooltip: 'Editer prestation',
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
				tooltip: 'Supprimer prestation',
				bsStyle: 'danger', 
				glyph: 'remove', 
				callback: props.onDelete 
			}
		];
	}

	render() {
		return (
			<Col sm={6} md={4}>
				<APPanelHeaderAction title='Prestation' actions={this.actions}>
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
				</APPanelHeaderAction>
			</Col>
		);
	}
}

export default InterventionSummary;