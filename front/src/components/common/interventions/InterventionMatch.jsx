import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap'

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
				return (
					<p key={match.id}>
						{match.person.firstName} {match.person.lastName}
					</p>
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