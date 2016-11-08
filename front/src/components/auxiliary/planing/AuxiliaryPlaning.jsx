import React from 'react'
import moment from 'moment'
import { Grid, Row, Col, Button, ListGroup, ListGroupItem, Panel, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
// Core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import Calendar from 'components-lib/calendar/Calendar.jsx';
import FormSelect from 'components-lib/Form/FormSelect.jsx';
import AuxiliaryPlaningInformation from './AuxiliaryPlaningInformation.jsx';
// Lib modules
import MomentHelper from 'utils/moment/MomentHelper.js'
import { DAYS } from 'utils/moment/Days.js'
import Utils from 'utils/Utils.js';

moment.locale('fr');

class AuxiliaryPlaning extends AuxiliaryBaseComponent {
	
	constructor(props) {
		super(props);
		this.state = {
			selected: MomentHelper.toLocalDate(moment()),
			customerFilter: '__ALL__',
			serviceFilter: '__ALL__'
		}
		this.state = this._buildState();
		this.state.selected = MomentHelper.toLocalDate(moment());
		this.state.customerFilter = '__ALL__';
		this.state.serviceFilter = '__ALL__';
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
	 	StoreRegistry.register('AUXILIARY_STORE', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('AUXILIARY_STORE', this);
	}
	_onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		return {
			offers: this.getOffers(),
			services: this.getServices(),
			customers: this.getCustomers(),
			interventions: this.getInterventions(),
			indisponibilities: this.getIndisponibilities()
		};
	}
	

	// Callback functions //
	// --------------------------------------------------------------------------------

	onDaySelect(day) {
		this.setState({ selected: day });
	}
	onPrint() {
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
	filterServices(serviceId) {
		this.setState({ serviceFilter: serviceId })
	}
	filterCustomers(customerId) {
		this.setState({ customerFilter: customerId })
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildInterventions() {
		return this._buildSpecials(Utils.filter(Utils.map(this.state.offers), function (offer) {
			return offer.status === 'ACCEPTED';
		}).
		filter(function (offer) {
			return this.state.customerFilter === '__ALL__' || this.state.customerFilter === offer.customerId;
		}.bind(this)).
		filter(function (offer) {
			return this.state.serviceFilter === '__ALL__' || this.state.serviceFilter === offer.serviceId;
		}.bind(this)).
		map(function(offer) {
			return this.state.interventions[offer.interventionId];
		}.bind(this)));
	}
	_buildIndisponibilities() {
		return this._buildSpecials(Utils.map(this.state.indisponibilities));
	}
	_buildOffers() {
		return this._buildSpecials(Utils.filter(Utils.map(this.state.offers), function (offer) {
			return offer.status === 'PENDING';
		}).
		filter(function (offer) {
			return this.state.customerFilter === '__ALL__' || this.state.customerFilter === offer.customerId;
		}.bind(this)).
		filter(function (offer) {
			return this.state.serviceFilter === '__ALL__' || this.state.serviceFilter === offer.serviceId;
		}.bind(this)).
		map(function(offer) {
			return this.state.interventions[offer.interventionId];
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
	_buildServicesValues() {
		let servicesValues = Utils.map(this.state.services, function (service) {
			return {
				key: service.id,
				value: service.socialReason
			}
		});
		servicesValues.unshift({
			key: '__ALL__',
			value: 'Tous'
		});
		return servicesValues;
	}
	_buildCustomersValues() {
		let customersValues = Utils.map(this.state.customers, function (customer) {
			var name = customer.person.civility + ' ' + customer.person.lastName;
			return {
				key: customer.id,
				value: name
			}
		});
		customersValues.unshift({
			key: '__ALL__',
			value: 'Tous'
		});
		return customersValues;
	}

	render() { return (
		<Row>
			<Col sm={2} md={2} lg={3}>
				<Panel header="Actions" className='no-print'>
					<Button block className='wrap' bsStyle='info' bsSize='small' onClick={this.onPrint.bind(this)}>Imprimer mon planning</Button>
					<br/><p>Afficher mon planning par type de:</p>
					<Form horizontal>
						<FormSelect 
							title='Clients' 
							placeholder='<Tous>' 
							defaultValue='__ALL__'
							values={this._buildCustomersValues()}
							onChange={this.filterCustomers.bind(this)}/>
						<FormSelect 
							title='SAD' 
							placeholder='<Tous>' 
							defaultValue='__ALL__'
							values={this._buildServicesValues()}
							onChange={this.filterServices.bind(this)}/>
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
						specialsSuccess={this._buildInterventions()}
						specialsInfo={this._buildOffers()}
						specialsWarning={this._buildIndisponibilities()}
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
	);}
}

export default AuxiliaryPlaning;
