import React from 'react';
import { Panel, Col } from 'react-bootstrap';
// Custom Components
import PanelHeaderAction from 'components-lib/Panel/PanelHeaderAction.jsx'
// Utils
import MomentHelper from 'utils/moment/MomentHelper.js'
import OfferHelper from 'utils/entities/OfferHelper.js'

class AuxiliaryOfferSummary extends React.Component {
	
	constructor(props) {
		super(props);
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onAccept() {
		if (this.props.onAccept) {
			this.props.onAccept(this.props.offer);
		}
	}
	onReject() {
		if (this.props.onReject) {
			this.props.onReject(this.props.offer);
		}
	}
	onView() {
		if (this.props.onView) {
			this.props.onView(this.props.offer);
		}
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildActions() {
		let actions = [];
		actions .push({ 
			tooltip: 'Voir offre',
			bsStyle: 'default', 
			glyph: 'search', 
			callback: this.onView.bind(this)
		});
		if (this.props.offer.status === 'PENDING') {
			actions .push({ 
				tooltip: 'Accepter offre',
				bsStyle: 'success', 
				glyph: 'ok', 
				callback: this.onAccept.bind(this)
			});
			actions .push({ 
				tooltip: 'Décliner intervention',
				bsStyle: 'danger', 
				glyph: 'remove', 
				callback: this.onReject.bind(this) 
			});
		}
		return actions;
	}

	render() {
		return (
			<Col sm={6} md={4}>
				<PanelHeaderAction bsStyle={OfferHelper.getBsStyle(this.props.offer.status)} title={OfferHelper.getTitle(this.props.offer.status)} actions={this._buildActions()}>
					<div>{'Service: ' + this.props.service.socialReason}</div>
					<div>{'Client: ' + this.props.customer.lastName + ' ' + this.props.customer.firstName}</div>
					{ this.props.intervention.oneTime ?
						<div>{'Intervention le ' + MomentHelper.localDateToHumanDate(this.props.intervention.oneTime.date)}</div>
					:
						<div>{'Intervention du ' + MomentHelper.localDateToHumanDate(this.props.intervention.recurence.startDate) + ' au ' + MomentHelper.localDateToHumanDate(this.props.intervention.recurence.endDate)}</div>
					}
				</PanelHeaderAction>
			</Col>
		);
	}
}

export default AuxiliaryOfferSummary;