import React from 'react';
import { Grid, Row, Col, Panel, Button, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap'

import StoreRegistry from 'core/StoreRegistry';

import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog.jsx';

import SkillChart from 'components/common/skills/SkillChart.jsx';
import CustomerSummary from 'components/common/customers/CustomerSummary.jsx'
import InterventionSummaryOneTime from './InterventionSummaryOneTime.jsx'
import InterventionSummaryRecurence from './InterventionSummaryRecurence.jsx'

class InterventionsOffers extends React.Component {

	constructor(props) {
		super(props);
		this.state = { selected: {} };
	}

	_buildOffers() {
		return this.props.offers.map(function(offer) {
			let auxiliary = StoreRegistry.getStore('SERVICE_STORE').getData().data.auxiliaries[offer.auxiliaryId];
			return (
				<ListGroupItem key={offer.id} onClick={this.onAuxiliarySelected(auxiliary)}>
					{offer.status === 'PENDING'  ? <Glyphicon glyph='question-sign'/> : '' }
					{offer.status === 'ACCEPTED' ? <Glyphicon glyph='ok-circle'/> : '' }
					{offer.status === 'REJECTED' ? <Glyphicon glyph='remove-circle'/> : '' }
					{offer.status === 'EXPIRED'  ? <Glyphicon glyph='option-horizontal'/> : '' }
					&nbsp;{auxiliary.person.firstName} {auxiliary.person.lastName} 
					{offer.status === 'PENDING'  ? ' (en attente)' : '' }
					{offer.status === 'ACCEPTED' ? ' (acceptée)' : '' }
					{offer.status === 'REJECTED' ? ' (rejectée)' : '' }
					{offer.status === 'EXPIRED'  ? ' (expirée)' : '' }
				</ListGroupItem>
			);
		}.bind(this));
	}

	onAuxiliarySelected(auxiliary) {
		return function () {
			this.setState({ selected: auxiliary });
		}.bind(this);
	}

	render() {
		return(
		<Panel header='Détails des offres'>
			<Row>
				<Col sm={6}>
					<Panel header='Information usager' bsStyle='info'>
						<CustomerSummary customer={this.props.customer}/>
					</Panel>
				
					<Panel header='Plannification' bsStyle='info'>
					{ this.props.intervention.oneTime ?
						<InterventionSummaryOneTime oneTime={this.props.intervention.oneTime}/>
					:
						<InterventionSummaryRecurence recurence={this.props.intervention.recurence}/>
					}
					</Panel>
					<Panel header='Offres envoyées' bsStyle='warning'>
						<ListGroup fill>
							{this._buildOffers()}
						</ListGroup>
					</Panel>
				</Col>
				<Col sm={6} >
					<Panel header='Match' bsStyle='warning'>
						<SkillChart skills={[this.props.customer.skills, this.state.selected.skills]}/>
					</Panel>
				</Col>
			</Row>
			<Button block bsStyle='primary' onClick={this.props.onCancel}>Retour</Button>
		</Panel>
		);
	}
}

export default InterventionsOffers;