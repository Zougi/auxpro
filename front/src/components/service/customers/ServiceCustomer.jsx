import React from 'react'
import { Panel, Row, Col, Form } from 'react-bootstrap'
import { APButton } from 'lib/Lib.jsx'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import FormBuilder from 'components-lib/Form/FormBuilder'

class ServiceCustomer extends ServiceBaseComponent {
	
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
		return { customer: this.getCustomer(this.props.params.customerId) };
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onBack() {
		Dispatcher.issue('NAVIGATE', {path: '/sad/customers'});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildInfos() {
		return [
			[
				{
					title: 'Civilité',
					type: 'select',
					edit: false,
					value: this.state.customer.civility,
					values: [
						{ key: 'Mr', value: 'Mr' },
						{ key: 'Mme', value: 'Mme' }
					]
				},
				{
					title: 'Nom',
					type: 'input',
					edit: false,
					value: this.state.customer.lastName
				},
				{
					title: 'Prénom',
					type: 'input',
					edit: false,
					value: this.state.customer.firstName
				},
				{
					title: 'Date de naissance',
					type: 'date',
					edit: false,
					defaultValue: this.state.customer.birthDate
				},
				{
					title: 'Nationnalité',
					type: 'input',
					edit: false,
					value: this.state.customer.nationality
				},
			],
			[
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
					edit: false,
					value: this.state.customer.phone
				},
				{
					title: 'Addresse électronique',
					type: 'input',
					edit: false,
					value: this.state.customer.email
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
		edit: false,
		defaultValue: this.state.customer[field],
		values: [ 0, 1, 2, 3, 4, 5 ]
	};}

	render() { return (
		<Row>
			<Panel header={(<strong>Détails usager</strong>)}>
				<Form horizontal>
					<Row>
						{FormBuilder.buildFormGroups(this._buildInfos())}
					</Row>
					<Row>
						{FormBuilder.buildFormGroups(this._buildSkills())}
					</Row>
				</Form>
				<br/>
				<APButton bsStyle='primary' onClick={this.onBack.bind(this)} block>Retour à la liste</APButton>
			</Panel>
		</Row>
	);}
}

export default ServiceCustomer;