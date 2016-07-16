import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap'
import ButtonsEndDialog from '../ButtonsEndDialog.jsx';

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
		let matches = "NO MATCHES";
		if(this.props.matches) {
			matches = this.props.matches.map(function(match) {
				return (
					<p>{match.person.firstName} {match.person.lastName}</p>
				);
			}.bind(this));
		}
		return(
		<Panel header='Envoyer offre'>
			<Row>
				<Col sm={4}>
					<Panel header='Information usager' bsStyle='info'>
					</Panel>
					<Panel header='Demande Initiale' bsStyle='info'>
					</Panel>
				</Col>
				<Col sm={4}>
					<Panel header='Plannification' bsStyle='primary'>
					</Panel>
				</Col>
				<Col sm={4}>
					<Panel header='Résultats Smatching' bsStyle='warning'>
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