// lib modules
import React from 'react';
import moment from 'moment';
import { SplitButton, MenuItem, Panel, Grid, Row, Col, Button } from 'react-bootstrap';
// custom modules
import { fromLocalDate, toHumanDate, fromLocalTime, toHumanTime, ControlLabel } from '../../../utils/moment/MomentHelper.js'
// custom components
import InterventionEditOneTime from './InterventionEditOneTime.jsx'
import InterventionEditRecurence from './InterventionEditRecurence.jsx'

moment.locale('fr');

let STATES = {
	ONE_TIME: 'Une seule date',
	RECURENCE: 'Récurente'
};

class InterventionCreate extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			mode: this.props.recurence?STATES.RECURENCE:STATES.ONE_TIME
		};
	}

	onSelectType(event) {
		this.state.mode = STATES[event];
		this.setState(this.state);
	}

	onCreate(event) {
	}

	onCancel(event) {
	}

	render() {
		return (
			<Panel header={this.props.title?this.props.title:'Saisir une nouvelle demande'}>
				<Grid>
				<Row>
					<Col componentClass={ControlLabel} sm={3} md={2}>
						Type de demande
					</Col>
					<Col sm={3} md={3}>
						<SplitButton onSelect={this.onSelectType.bind(this)} title={this.state.mode} id='typeSelector'>
							<MenuItem eventKey="ONE_TIME">{STATES.ONE_TIME}</MenuItem>
							<MenuItem eventKey="RECURENCE">{STATES.RECURENCE}</MenuItem>
						</SplitButton>
					</Col>
				</Row>
				<Row>
				{this.state.mode === STATES.ONE_TIME
				?
					<InterventionEditOneTime/>
				:
					<InterventionEditRecurence/>
				}
				</Row>
				<Row>
					<Col sm={6}>
						<Button bsStyle='primary' onClick={this.onCancel.bind(this)} block>Annuler</Button>
					</Col>
					<br className='hidden-sm hidden-md hidden-lg'/>
					<Col sm={6}>
						<Button bsStyle='success' onClick={this.onCreate.bind(this)} block>Créer demande</Button>
					</Col>
				</Row>
				</Grid>
			</Panel>
		);
	}
}

export default InterventionCreate;