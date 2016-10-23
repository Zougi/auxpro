import React from 'react';
import { Panel, Col } from 'react-bootstrap';
// Custom Components
import PanelHeaderAction from 'components-lib/PanelHeaderAction/PanelHeaderAction.jsx'
// Utils
import MomentHelper from 'utils/moment/MomentHelper.js'

class AuxiliaryOfferSummary extends React.Component {
	
	constructor(props) {
		super(props);
	}

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

	_buildActions() {
		let actions = [];
		actions .push({ 
			tooltip: 'Voir offre',
			bsStyle: 'default', 
			glyph: 'search', 
			callback: this.onView.bind(this)
		});
		switch (this.props.offer.status) {
			case 'PENDING':
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
				this.title = 'Offre en attente';
				this.bsStyle = 'info';
				break;
			case 'ACCEPTED':
				this.title = 'Offre acceptée';
				this.bsStyle = 'success';
				break;
			case 'REJECTED':
				this.title = 'Offre rejetée';
				this.bsStyle = 'danger';
				break;
			case 'EXPIRED':
				this.title = 'Offre expirée';
				this.bsStyle = 'default';
				break;
		}
		return actions;
	}

	render() {
		return (
			<Col sm={6} md={4}>
				<PanelHeaderAction bsStyle={this.bsStyle} title={this.title} actions={this._buildActions()}>
					<div>{'Service: ' + this.props.service.society}</div>
					<div>{'Client: ' + this.props.customer.person.lastName + ' ' + this.props.customer.person.firstName}</div>
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