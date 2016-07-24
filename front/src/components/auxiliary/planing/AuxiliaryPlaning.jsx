import React from 'react'
import moment from 'moment'
import { Grid, Row, Col, Button, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';

import Calendar from '../../../components-lib/calendar/Calendar.jsx';
import FormSelect from '../../../components-lib/Form/FormSelect.jsx';
import MissionShort from './MissionShort.jsx';
import AbsenceShort from './AbsenceShort.jsx';

import { fromLocalDate, toLocalDate, toHumanDate } from '../../../utils/moment/MomentHelper.js'
import { DAYS } from '../../../utils/moment/Days.js'
import Utils from '../../../utils/Utils.js';

moment.locale('fr');

class AuxiliaryPlaning extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { selected: moment() };
	}

	onDaySelect(day) {
		this.setState({ selected: day });
	}

	print() {
		window.print();
	}
	
	addAbsence() {
		let params = { 
			auxiliaryId: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
			token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
			data: {
				auxiliaryId: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
				oneTime: {
					date: toLocalDate(this.state.selected),
					startTime: [0, 0],
					endTime: [23, 59]
				}
				
			}
		};
        Dispatcher.issue('POST_INDISPONIBILITY', params).
        then(function() {
        	delete params.data;
        	Dispatcher.issue('GET_AUXILIARY_INDISPONIBILITIES', params);
        });
	}

	_buildInterventions() {
		return this._buildSpecials(Utils.filter(this.props.interventions, function (intervention) {
			return intervention.auxiliaryId === StoreRegistry.getStore('LOGIN_STORE').getData('/id');
		}));
	}
	_buildIndisponibilities() {
		return this._buildSpecials(Utils.map(this.props.indisponibilities));
	}
	_buildOffers() {
		return this._buildSpecials(Utils.filter(this.props.offers, function (offer) {
			return offer.status === 'PENDING' || offer.status === 'ACCEPTED';
		}).map(function(offer) {
			return this.props.interventions[offer.interventionId];
		}.bind(this)));
	}
	_buildSpecials(values) {
		let result = [];
		for (let i = 0; i < values.length; i++) {
			let value = values[i];
			if (value.oneTime) {				
				result.push(value.oneTime);
			}
			if (value.recurence) {
				let recurence = value.recurence;
				let start = fromLocalDate(recurence.startDate);
				let end = fromLocalDate(recurence.endDate);
				let current = start.startOf('week');
				while (current.isSameOrBefore(end)) {
					for (let d = 0; d < recurence.days.length; d++) {
						let day = DAYS[recurence.days[d]];
						let date = current.clone().add(day.pos, 'day');
						if (date.isSameOrAfter(start) && date.isSameOrBefore(end)) {
							result.push({
								date: toLocalDate(date),
								startTime: recurence.startTime,
								endTime: recurence.endTime
							});
						}
					}
					current.add(7, 'day');
				}
			}
		}
		return result;
	}

	render() { 
		var values = ['value1', 'value2', '...'];
		var missionsValues = ['planifiees', 'realisees', 'annulees'];
		var servicesValues = [];
		if (this.state.data && this.state.data.services) {
			for (let i = 0 ; i < this.state.data.services.length ; i++) {
				servicesValues.push(StoreRegistry.getStore('SERVICE_STORE').getData('/' + this.state.data.services[i]) + '/society');
			}
		}
		var customersValues = [];
		return (
		<Grid>
			<Row>
				<Col sm={2} md={2} lg={3}>
					<Panel header="Actions" className='no-print'>
						<Button block className='wrap' bsStyle='info' bsSize='small' onClick={this.print.bind(this)}>Imprimer mon planning</Button>
						<br/><p>Afficher mon planning par type de:</p>
						<Form horizontal>
							<FormSelect title='Clients' placeholder='<Tous>' values={values}/>
							<FormSelect title='SAD' placeholder='<Tous>' values={servicesValues}/>
							<FormSelect title='Mission' placeholder='<Tous>' values={missionsValues}/>
      					</Form>
      					<p>Total heures interventions:</p><br/>
						<Button block bsStyle='warning' bsSize='small' onClick={this.addAbsence.bind(this)}>Ajouter une absence</Button>
					</Panel>
				</Col>
				<Col sm={8} md={7} lg={5}>
					<Panel header={'Planning mensuel - ' + toHumanDate(this.state.selected)}>
						<Calendar 
							now={this.state.now}
							moment={moment()}
							selected={this.state.selected}
							specialsSuccess={this._buildInterventions()}
							specialsInfo={this._buildOffers()}
							specialsWarning={this._buildIndisponibilities()}
							onDaySelect={this.onDaySelect.bind(this)} />
					</Panel>
	    		</Col>
	    		<Col sm={2} md={3} lg={4}>
	    			<Panel header="Informations">
	    				<ListGroup>
	    					
	    				</ListGroup>
	    			</Panel>
	    		</Col>
	    	</Row>
	    </Grid>
		);
	}
}

export default AuxiliaryPlaning;