import React from 'react'
import { Col } from 'react-bootstrap'
// Custom components
import APPanelHeaderAction from 'components-lib/Panel/APPanelHeaderAction'
import InterventionSummaryOneTime from './InterventionSummaryOneTime'
import InterventionSummaryRecurence from './InterventionSummaryRecurence'

class InterventionSummaryOfferRenderer extends React.Component {
	
	constructor(props) {
		super(props);
		this.actions = [
			{ 
				tooltip: 'Etat des offres',
				bsStyle: 'info', 
				glyph: 'cloud-upload', 
				callback: props.onViewOffers 
			}
		];
	}

	render() {
		return (
			<Col sm={6} md={4}>
				<APPanelHeaderAction bsStyle='info' title={'Offre (' + this.props.offers.length + ')'} actions={this.actions}>
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

export default InterventionSummaryOfferRenderer;