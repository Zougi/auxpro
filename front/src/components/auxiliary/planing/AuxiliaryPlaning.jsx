import React from 'react'
import moment from 'moment'
import { Grid, Row, Col, Button, ListGroup, ListGroupItem, Panel, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';

import Calendar from '../../../components-lib/calendar/Calendar.jsx';
import FormSelect from '../../../components-lib/Form/FormSelect.jsx';
import AuxiliaryPlaningInformation from './AuxiliaryPlaningInformation.jsx';

import MomentHelper from '../../../utils/moment/MomentHelper.js'
import { DAYS } from '../../../utils/moment/Days.js'
import Utils from '../../../utils/Utils.js';

moment.locale('fr');

class AuxiliaryPlaning extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { selected: MomentHelper.toLocalDate(moment()) };
		this.componentWillReceiveProps(props, true);
	}

	componentWillReceiveProps(props, first) {
		this.state.interventions = this._buildInterventions(props);
		this.state.offers = this._buildOffers(props);
		this.state.indisponibilities = this._buildIndisponibilities(props);
		if (!first) this.setState(this.state);
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
					date: this.state.selected,
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

	_buildInterventions(props) {
		return this._buildSpecials(Utils.filter(props.interventions, function (intervention) {
			return intervention.auxiliaryId === StoreRegistry.getStore('LOGIN_STORE').getData('/id');
		}));
	}
	_buildIndisponibilities(props) {
		return this._buildSpecials(Utils.map(props.indisponibilities));
	}
	_buildOffers(props) {
		return this._buildSpecials(Utils.filter(props.offers, function (offer) {
			return offer.status === 'PENDING' || offer.status === 'ACCEPTED';
		}).map(function(offer) {
			return props.interventions[offer.interventionId];
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
				let start = MomentHelper.fromLocalDate(recurence.startDate);
				let end = MomentHelper.fromLocalDate(recurence.endDate);
				let current = start.clone().startOf('week');
				while (current.isSameOrBefore(end)) {
					for (let d = 0; d < recurence.days.length; d++) {
						let day = DAYS[recurence.days[d]];
						let date = current.clone().add(day.pos, 'day');
						if (date.isSameOrAfter(start) && date.isSameOrBefore(end)) {
							result.push({
								date: MomentHelper.toLocalDate(date),
								startTime: recurence.startTime,
								endTime: recurence.endTime
							});
						}
					}
					current.add(recurence.period === 'P14D' ? 14 : 7, 'day');
				}
			}
		}
		return result;
	}

	render() { 
		var servicesValues = Utils.map(this.props.services, function (service) {
			return {
				key: service.society,
				value: service.society
			}
		});
		servicesValues.unshift({
			key: '__ALL__',
			value: 'Tous'
		});
		var customersValues = Utils.map(this.props.customers, function (customer) {
			var name = customer.person.civility + ' ' + customer.person.lastName;
			return {
				key: name,
				value: name
			}
		});
		customersValues.unshift({
			key: '__ALL__',
			value: 'Tous'
		});
		return (
		<Grid>
			<Row>
				<Col sm={2} md={2} lg={3}>
					<Panel header="Actions" className='no-print'>
						<Button block className='wrap' bsStyle='info' bsSize='small' onClick={this.print.bind(this)}>Imprimer mon planning</Button>
						<br/><p>Afficher mon planning par type de:</p>
						<Form horizontal>
							<FormSelect title='Clients' placeholder='<Tous>' values={customersValues}/>
							<FormSelect title='SAD' placeholder='<Tous>' values={servicesValues}/>
      					</Form>
      					<p>Total heures interventions:</p><br/>
						<Button block bsStyle='warning' bsSize='small' onClick={this.addAbsence.bind(this)}>Ajouter une absence</Button>
					</Panel>
				</Col>
				<Col sm={8} md={7} lg={5}>
					<Panel header={'Planning mensuel - '}>
						<Calendar 
							moment={MomentHelper.toLocalDate(moment())}
							selected={this.state.selected}
							specialsSuccess={this.state.interventions}
							specialsInfo={this.state.offers}
							specialsWarning={this.state.indisponibilities}
							onDaySelect={this.onDaySelect.bind(this)} />
					</Panel>
	    		</Col>
	    		<Col sm={2} md={3} lg={4}>
	    			<AuxiliaryPlaningInformation
	    				date={this.state.selected}
						indisponibilities={this.state.indisponibilities}
	    				interventions={this.state.interventions}
						offers={this.state.offers} />
	    		</Col>
	    	</Row>
	    </Grid>
		);
	}
}

/*


*/

export default AuxiliaryPlaning;
