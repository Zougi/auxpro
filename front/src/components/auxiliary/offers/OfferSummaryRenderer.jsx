import React from 'react';
import moment from 'moment';
import { Panel, Col } from 'react-bootstrap';

import PanelHeaderAction from 'components-lib/PanelHeaderAction/PanelHeaderAction.jsx'

class InterventionSummary extends React.Component {
	
	constructor(props) {
		super(props);
		this.componentWillReceiveProps(props);
	}

	componentWillReceiveProps(props) {
		this.actions = [];
		this.actions .push({ 
			tooltip: 'Voir offre',
			bsStyle: 'default', 
			glyph: 'search', 
			callback: props.onView 
		});
		switch (this.props.offer.status) {
			case 'PENDING':
				this.actions .push({ 
					tooltip: 'Accepter offre',
					bsStyle: 'success', 
					glyph: 'ok', 
					callback: props.onAccept 
				});
				this.actions .push({ 
					tooltip: 'Décliner intervention',
					bsStyle: 'danger', 
					glyph: 'remove', 
					callback: props.onReject 
				});
				this.bsStyle = 'info';
				break;
			case 'ACCEPTED':
				this.bsStyle = 'success';
				break;
			case 'REJECTED':
				this.bsStyle = 'danger';
				break;
			case 'EXPIRED':
				this.bsStyle = 'default';
				break;
		}
	}

	render() {
		return (
			<Col sm={6} md={4}>
				<PanelHeaderAction bsStyle={this.bsStyle} title={'Offre (' + this.props.offer.status + ')'} actions={this.actions}>
					<div>{'Service: ' + this.props.service.society}</div>
					<div>{'Client: ' + this.props.customer.person.lastName + ' ' + this.props.customer.person.firstName}</div>
					{ this.props.intervention.oneTime ?
						<div>{'Intervention le ' + this.props.intervention.oneTime.date}</div>
					:
						<div>{'Intervention du ' + this.props.intervention.recurence.startDate + ' au ' + this.props.intervention.recurence.endDate}</div>
					}
				</PanelHeaderAction>
			</Col>
		);
	}
}

export default InterventionSummary;