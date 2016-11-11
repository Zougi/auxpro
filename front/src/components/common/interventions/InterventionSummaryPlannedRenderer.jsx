import React from 'react'
import moment from 'moment'
import { Panel, Col } from 'react-bootstrap'
// Custom components
import APPanelHeaderAction from 'components-lib/Panel/APPanelHeaderAction'
import InterventionSummaryOneTime from 'components/common/interventions/InterventionSummaryOneTime'
import InterventionSummaryRecurence from 'components/common/interventions/InterventionSummaryRecurence'

class InterventionSummaryPlannedRenderer extends React.Component {
	
	constructor(props) {
		super(props);
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() {
		return (
			<Col sm={6} md={4}>
				<APPanelHeaderAction bsStyle='success' title='Intervention'>
				{ this.props.intervention.oneTime ?
					<InterventionSummaryOneTime oneTime={this.props.intervention.oneTime} />
				:
					<div/>
				}
				{ this.props.intervention.recurence ?
					<InterventionSummaryRecurence recurence={this.props.intervention.recurence}/>
				:
					<div/>
				}	
				</APPanelHeaderAction>
			</Col>
		);
	}
}

export default InterventionSummaryPlannedRenderer;