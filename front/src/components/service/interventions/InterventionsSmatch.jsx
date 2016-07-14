// react modules
import React from 'react';
// react-bootstrap modules
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap'
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';

class InterventionsSmatch extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 
		return(
		<Grid>
			<Row>
				<Col sm={2}>
					<Button block>Entrer un usager</Button>
					<Button block bsStyle='warning'>Smatching</Button>
				</Col>
				<Col sm={4}>
					<Panel header='Information usager' bsStyle='info'>
					</Panel>
					<Panel header='Demande Initiale' bsStyle='info'>
					</Panel>
				</Col>
				<Col sm={2}>
					<Panel header='Plannification' bsStyle='primary'>
					</Panel>
				</Col>
				<Col sm={4}>
					<Panel header='Résultats Smatching' bsStyle='warning'>
					</Panel>
				</Col>
			</Row>
		</Grid>
		);
	}
}

export default InterventionsSmatch;
