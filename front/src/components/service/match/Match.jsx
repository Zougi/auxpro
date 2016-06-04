// react modules
import React from 'react';
import d3 from 'd3';
// react-bootstrap modules
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap'
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';

class Match extends React.Component {

	constructor(props) {
		super(props);
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		let data = StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + user.id);
		this.state = {
			edit: false,
			user: user,
			data: data
		};
		var chartData = [
			[
				{axis:"Entretien Maison",value:5},
				{axis:"Aide petite enfance",value:4},
				{axis:"Courses & Aides au repas",value:4},
				{axis:"Nursing",value:4},
				{axis:"Dame de compagnie & promenades",value:3},
				{axis:"Aide administrative",value:0},
				{axis:"Petit bricolage",value:1}
			], [
				{axis:"Entretien Maison",value:1},
				{axis:"Aide petite enfance",value:4},
				{axis:"Courses & Aides au repas",value:4},
				{axis:"Nursing",value:1},
				{axis:"Dame de compagnie & promenades",value:1},
				{axis:"Aide administrative",value:2},
				{axis:"Petit bricolage",value:4}
			]
		];
		console.log(d3);
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

Match.contextTypes = {
	router: React.PropTypes.object
}

export default Match;
