import React from 'react'
import { Panel, Button, Row, Col, Clearfix } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import APPanelBasic from 'components-lib/Panel/APPanelBasic'
import DialogConfirmation from 'components-lib/DialogConfirmation/DialogConfirmation'
// Lib modules
import Utils from 'utils/Utils'
import MomentHelper from 'utils/moment/MomentHelper'
import Period from 'utils/constants/Period'
import Day from 'utils/constants/Day'

class ServiceInterventions extends ServiceBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
	}

	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('SERVICE_STORE', this, this.onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);
	}
	onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		return { 
			customers: this.getCustomers(),
			interventions: this.getInterventions(),
			offers: this.getOffers()
		};
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onViewIntervention(intervention) {
		Dispatcher.issue('NAVIGATE', {path: '/sad/interventions/' + intervention.id});
	}
	onAddIntervention() {
		Dispatcher.issue('NAVIGATE', {path: '/sad/interventions/new' });
	}
	onEditIntervention(intervention) {
		Dispatcher.issue('NAVIGATE', {path: '/sad/interventions/' + intervention.id + '/edit' });
	}
	onMatchIntervention(intervention) {
        Dispatcher.issue('GET_INTERVENTION_MATCH', {
            token: this.getLoginData('/token'),
            interventionId: intervention.id
        }).then(function() {
            Dispatcher.issue('NAVIGATE', {path: '/sad/interventions/' + intervention.id });
        }).
        catch(function (error) {
            console.log('Unable to load matches:');
            console.log(error);
        });
    }
	onDeleteIntervention(intervention) {
		this.setState({
			interventionToDelete: intervention.id,
			showDeleteConfirm: true
		});
	}
	doDeleteIntervention() {
		this.deleteIntervention(this.state.interventionToDelete).
		then(function () {
			return this.loadInterventions();
		}.bind(this)).
		then(function () {
			return this.loadCustomers();
		}.bind(this)).
		then(function () {
			return this.loadAuxiliaries();
		}.bind(this)).
		then(function () {
			this.cancelDeleteIntervention();
		}.bind(this));
	}
	cancelDeleteIntervention() {
		this.setState({
			interventionToDelete: null,
			showDeleteConfirm: false
		});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildCustomers() {
		let customers = Utils.filter(this.state.customers || [], this._filterCustomer.bind(this));
		return customers.map(this._buildCustomer.bind(this));
	}
	_filterCustomer(customer) {
		return customer.interventions && customer.interventions.length;
	}
	_buildCustomer(customer) {
		let prestations = [];
		let offers = [];
		let interventions = [];
		let l = customer.interventions.length;
		for (let i = 0; i < l; i++) {
			let intervention = this.getIntervention(customer.interventions[i]);
			let text = [];
			if (intervention.oneTime) {
				let date      = MomentHelper.localDateToHumanDate(intervention.oneTime.date);
				let startTime = MomentHelper.localTimeToHumanTime(intervention.oneTime.startTime);
				let endTime   = MomentHelper.localTimeToHumanTime(intervention.oneTime.endTime);
				text.push('Prestation unique');
				text.push('Le ' + date);
				text.push('De ' + startTime + ' à ' + endTime);
			} else if (intervention.recurence) {
				let startDate = MomentHelper.localDateToHumanDate(intervention.recurence.startDate);
				let endDate   = MomentHelper.localDateToHumanDate(intervention.recurence.endDate);
				let startTime = MomentHelper.localTimeToHumanTime(intervention.recurence.startTime);
				let endTime   = MomentHelper.localTimeToHumanTime(intervention.recurence.endTime);
				let period    = Period.getPeriod(intervention.recurence.period).value.toLowerCase();
				let sortedDays = intervention.recurence.days.map(function (d) { return Day.getDay(d); }).sort(function (d1, d2) {
					return Day.DAYS.indexOf(d1) - Day.DAYS.indexOf(d2);
				});
				let days = '';
				for (let i = 0 ; i < sortedDays.length ; i++) {
					if (i > 0) {
						days += ', ';
					}
					days += sortedDays[i].value.toLowerCase();
				}
				text.push('Prestation ' + period);
				text.push('Du ' + startDate + ' au ' + endDate);
				text.push('Les ' + days);
				text.push('De ' + startTime + ' à ' + endTime);
			}
			if (intervention.auxiliaryId) {
				let auxiliary = this.getAuxiliary(intervention.auxiliaryId);
				text.push('Assurée par '+ auxiliary.civility + auxiliary.lastName + ' ' + auxiliary.firstName);
				interventions.push(
					<Col key={i} sm={6} md={4}>
						<APPanelBasic 
							bsStyle='success'
							title='Intervention'
							text={text}/>
					</Col>
				);
			} else if (intervention.offers && intervention.offers.length) {
				let actions = [
					{ 
						tooltip: 'Etat des offres',
						bsStyle: 'info', 
						glyph: 'cloud-upload', 
						callback: this.onViewIntervention.bind(this, intervention)
					}
				]
				offers.push(
					<Col key={i} sm={6} md={4}>
						<APPanelBasic 							
							bsStyle='info'
							actions={actions}
							title='Offre'
							text={text}/>
					</Col>
				);
			} else {
				let actions = [
					{ 
						tooltip: 'Editer prestation',
						bsStyle: 'info', 
						glyph: 'pencil', 
						callback: this.onEditIntervention.bind(this, intervention)
					},
					{ 
						tooltip: 'Envoyer offre',
						bsStyle: 'success', 
						glyph: 'upload', 
						callback: this.onMatchIntervention.bind(this, intervention)
					},
					{ 
						tooltip: 'Supprimer prestation',
						bsStyle: 'danger', 
						glyph: 'remove', 
						callback: this.onDeleteIntervention.bind(this, intervention)
					}
				]
				prestations.push(
					<Col key={i} sm={6} md={4}>
						<APPanelBasic 
							actions={actions}
							title='Prestation'
							text={text}/>
					</Col>
				);
			}
		}

		return (
			<Panel key={customer.id} header={customer.lastName + ' ' + customer.firstName}>
				<Row>
					{prestations}
				</Row>
				<Row>
					{offers}
				</Row>
				<Row>
					{interventions}
				</Row>
			</Panel>
		);
	}

	render() { return (
		<Row>
			<Panel header={(<strong>Prestations & Offres en cours</strong>)} bsStyle='warning'>
				<Button block bsStyle='info' onClick={this.onAddIntervention.bind(this)}>
					Saisir nouvelle prestation
				</Button>
				<br/>
				{this._buildCustomers()}
			</Panel>
			<DialogConfirmation
				show={this.state.showDeleteConfirm}
				title='Supprimer prestation ?'
				onConfirm={this.doDeleteIntervention.bind(this)}
				confirmStyle='danger'
				confirmText='Supprimer'
				onCancel={this.cancelDeleteIntervention.bind(this)}
				cancelStyle='default'
				cancelText='Annuler' />
		</Row>
	);}
}

export default ServiceInterventions;