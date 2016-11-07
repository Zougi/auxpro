import React from 'react'
import { Panel, Row, Col, Form } from 'react-bootstrap'
// core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import FormBuilder from 'components-lib/Form/FormBuilder'
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog'
// Lib modules
import Utils from 'utils/Utils'
import Validators from 'utils/form/Validators'

let MODES = {
	CREATE: 'CREATE',
	EDIT: 'EDIT'
}

class ServiceCustomerEdit extends ServiceBaseComponent {
	
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
		if (this.props.params.customerId) {
			return { 
				mode: MODES.EDIT,
				customer: this.getCustomer(this.props.params.customerId)
			};
		} else {
			return { 
				mode: MODES.CREATE,
				customer: { serviceId: this.getLoginData('/id') } 
			};	
		}
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onAddressChanged(address) {
		this.state.customer.address = address.address;
		this.state.customer.postalCode = address.postalCode;
		this.state.customer.city = address.city;
		this.state.customer.country = address.country;
		this.state.customer.lattitude = address.lattitude;
		this.state.customer.longitude = address.longitude;
		this.forceUpdate();
	}

	changeHandler(field) {
		return function (event) {
			let value = event.value || event;
			Utils.setField(this.state.customer, field, value);
			this.forceUpdate();
		}.bind(this);
	}

	onSaveCustomer() {
		if (this.state.mode === MODES.CREATE) {
			this.createCustomer(this.state.customer).
			then(function () {
				Dispatcher.issue('NAVIGATE', {path: '/sad/customers'});
			});
		} else {
			this.updateCustomer(this.state.customer).
			then(function () {
				Dispatcher.issue('NAVIGATE', {path: '/sad/customers'});
			});
		}
	}
	onCancel(customer) {
		Dispatcher.issue('NAVIGATE', {path: '/sad/customers'});
	}

	
	onSkillsChanged(skills) {
		this.state.customer.skills = skills;
		this.forceUpdate();
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildInfos() {
		return [
			[
				{
					title: 'Civilité',
					type: 'select',
					edit: true,
					defaultValue: this.state.customer.civility,
					changeHandler: this.changeHandler('civility'),
					validator: Validators.NonNull,
					values: [
						{ key: 'Mr', value: 'Mr' },
						{ key: 'Mme', value: 'Mme' }
					]
				},
				{
					title: 'Nom',
					type: 'input',
					edit: true,
					defaultValue: this.state.customer.lastName,
					changeHandler: this.changeHandler('lastName'),
					validator: Validators.NonEmptyString
				},
				{
					title: 'Prénom',
					type: 'input',
					edit: true,
					defaultValue: this.state.customer.firstName,
					changeHandler: this.changeHandler('firstName'),
					validator: Validators.NonEmptyString
				},
				{
					title: 'Date de naissance',
					type: 'date',
					edit: true,
					defaultValue: this.state.customer.birthDate,
					changeHandler: this.changeHandler('birthDate'),
					validator: Validators.NonNull
				},
				{
					title: 'Nationnalité',
					type: 'input',
					edit: true,
					defaultValue: this.state.customer.nationality,
					changeHandler: this.changeHandler('nationality'),
					validator: Validators.NonEmptyString
				},
			],
			[
				{
					type: 'googleAutocomplete',
					edit: true,
					changeHandler: this.onAddressChanged.bind(this),
					placeholder: this.state.customer.address + ', ' + this.state.customer.postalCode + ' ' + this.state.customer.city
				},
				{
					title: 'Addresse',
					type: 'input',
					edit: false,
					value: this.state.customer.address
				},
				{
					title: 'Code postal',
					type: 'input',
					edit: false,
					value: this.state.customer.postalCode
				},
				{
					title: 'Ville',
					type: 'input',
					edit: false,
					value: this.state.customer.city
				},
				{
					title: 'Pays',
					type: 'input',
					edit: false,
					value: this.state.customer.country
				},
				{
					title: 'Téléphone',
					type: 'input',
					edit: true,
					defaultValue: this.state.customer.phone,
					changeHandler: this.changeHandler('phone'),
					validator: Validators.Phone
				},
				{
					title: 'Addresse électronique',
					type: 'input',
					edit: true,
					defaultValue: this.state.customer.email,
					changeHandler: this.changeHandler('email'),
					validator: Validators.Email
				}
			]
		]
	}
	_buildSkills() { return [
		[
			this.__buildSkill('Entretien maison', 'housework'),
			this.__buildSkill('Aide petite enfance', 'childhood'),
			this.__buildSkill('Courses & aide au repas', 'shopping'),
			this.__buildSkill('Nursing', 'nursing'),
			this.__buildSkill('Dame de compagnie', 'compagny'),
			this.__buildSkill('Aide administrative', 'administrative'),
			this.__buildSkill('Petit bricolage', 'doityourself')
		]
	];}
	__buildSkill(title, field) { return {
		title: title,
		type: 'selectGroup',
		edit: true,
		defaultValue: this.state.customer[field],
		changeHandler: this.changeHandler(field),
		validator: Validators.NonNull,
		values: [ 0, 1, 2, 3, 4, 5 ]
	};}

	render() { return (
		<Row>
			<Panel header={(<strong>Modifier informations client</strong>)}>
				<Form horizontal>
					<Row>
						{FormBuilder.buildFormGroups(this._buildInfos())}
					</Row>
					<Row>
						{FormBuilder.buildFormGroups(this._buildSkills())}
					</Row>
				</Form>
				<br/>
				<ButtonsEndDialog
					onOk={this.onSaveCustomer.bind(this)} okTitle='Enregistrer modifications'
					onCancel={this.onCancel.bind(this)} cancelTitle='Annuler'/>
			</Panel>
		</Row>
	);}
}

export default ServiceCustomerEdit;