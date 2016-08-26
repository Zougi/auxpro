import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap'

import CustomerSummary from '../customers/CustomerSummary.jsx'
import InterventionSummaryOneTime from './InterventionSummaryOneTime.jsx'
import InterventionSummaryRecurence from './InterventionSummaryRecurence.jsx'
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog.jsx';

class InterventionsMatch extends React.Component {

	constructor(props) {
		super(props);
	}

	onSend() {
		if (this.props.onSend) {
			this.props.onSend(this.props.intervention);
		}
	}

	_buildMatches() {
		return (this.props.matches || []).map(function(auxiliary) {
			let name = "Information non renseignée";
			if (auxiliary.person) {
				name = auxiliary.person.firstName + ' ' + auxiliary.person.lastName;
			}
			return (<p key={auxiliary.id}>{name}</p>);
		});
	}
	
	render() {
		return(
			<Panel header='Envoyer offre'>
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
					</Col>
					<Col sm={6} >
						<Panel header={'Résultats Matching'} bsStyle='warning'>
							{this._buildMatches()}
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