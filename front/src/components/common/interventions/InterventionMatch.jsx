import React from 'react';
import { Grid, Row, Col, Panel, Button, Glyphicon } from 'react-bootstrap'

import StoreRegistry from '../../../core/StoreRegistry';

import CustomerSummary from '../customers/CustomerSummary.jsx'
import InterventionSummaryOneTime from './InterventionSummaryOneTime.jsx'
import ButtonsEndDialog from '../../../components-lib/ButtonsEndDialog/ButtonsEndDialog.jsx';

class InterventionsMatch extends React.Component {

	constructor(props) {
		super(props);
	}

	onSend() {
		if (this.props.onSend) {
			this.props.onSend(this.props.intervention);
		}
	}
	
	render() {
		let title = 'Résultats Matching';
		let matches = 'NO MATCHES';
		console.log('')
		console.log(this.props)
		if(this.props.matches) {
			matches = this.props.matches.map(function(match) {
				return (
					<p key={match.id}>
						{match.person.firstName} {match.person.lastName}
					</p>
				);
			}.bind(this));
		} else if (this.props.offers) {
			matches = this.props.offers.map(function(offer) {
				let auxiliary = StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + offer.serviceId + '/auxiliaries/' + offer.auxiliaryId);
				return (
					<Col key={offer.id}>
						{offer.status === 'PENDING'  ? <Glyphicon glyph='question-sign'/> : '' }
						{offer.status === 'ACCEPTED' ? <Glyphicon glyph='ok-circle'/> : '' }
						{offer.status === 'REJECTED' ? <Glyphicon glyph='remove-circle'/> : '' }
						{offer.status === 'EXPIRED'  ? <Glyphicon glyph='option-horizontal'/> : '' }
						&nbsp;{auxiliary.person.firstName} {auxiliary.person.lastName} 
						{offer.status === 'PENDING'  ? ' (en attente)' : '' }
						{offer.status === 'ACCEPTED' ? ' (acceptée)' : '' }
						{offer.status === 'REJECTED' ? ' (rejectée)' : '' }
						{offer.status === 'EXPIRED'  ? ' (expirée)' : '' }
					</Col>
				);
			}.bind(this));
		}
		return(
		<Panel header='Envoyer offre'>
			<Row>
				<Col sm={6}>
					<Panel header='Information usager' bsStyle='info'>
						<CustomerSummary customer={this.props.customer}/>
					</Panel>
					<Panel header='Plannification' bsStyle='info'>
						<InterventionSummaryOneTime oneTime={this.props.intervention.oneTime}/>
					</Panel>
				</Col>
				<Col sm={6} >
					<Panel header={title} bsStyle='warning'>
						{matches}
					</Panel>
				</Col>
			</Row>
			<ButtonsEndDialog 
				onOk={this.onSend.bind(this)} 
				okTitle='Envoyer'
				onCancel={this.props.onCancel} 
				cancelTitle='Annuler'/>
		</Panel>
		);
	}
}

export default InterventionsMatch;