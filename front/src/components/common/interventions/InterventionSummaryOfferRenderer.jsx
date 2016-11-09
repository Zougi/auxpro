import React from 'react';
import { Col } from 'react-bootstrap';

import PanelHeaderAction from 'components-lib/Panel/PanelHeaderAction.jsx'

import InterventionSummaryOneTime from './InterventionSummaryOneTime.jsx'
import InterventionSummaryRecurence from './InterventionSummaryRecurence.jsx'

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
				<PanelHeaderAction bsStyle='info' title={'Offre (' + this.props.offers.length + ')'} actions={this.actions}>
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

export default InterventionSummaryOfferRenderer;