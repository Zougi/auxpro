import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap'
import ButtonsEndDialog from '../ButtonsEndDialog.jsx';

class InterventionsMatch extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 
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
					</Panel>
				</Col>
			</Row>
			<ButtonsEndDialog 
				onOk={this.props.onSend} 
				okTitle='Envoyer'
				onCancel={this.props.onCancel} 
				cancelTitle='Annuler'/>
		</Panel>
		);
	}
}

export default InterventionsMatch;
