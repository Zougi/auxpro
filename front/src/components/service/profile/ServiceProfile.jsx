import React from 'react'
import { Row, Col, Panel, Button, Form } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher.js'
import StoreRegistry from 'core/StoreRegistry.js'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import FormBuilder from 'components-lib/Form/FormBuilder'
// Custom libs
import Utils from 'utils/Utils.js'

class ServiceProfile extends ServiceBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('SERVICE_STORE', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);
	}
	_onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		return {
			service: this.getService()
		};
	}

	// Callbacks functions //
	// --------------------------------------------------------------------------------



	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildInfos() {
		return [
			[
				{
					title: 'Raison sociale',
					type: 'input',
					defaultValue: this.state.service.socialReason
				},
				{
					title: 'Fonctionnement',
					type: 'select',
					defaultValue: this.state.service.function,
					values: [
						{ key: 'Mandataire', value: 'Mandataire' },
						{ key: 'Prestataire', value: 'Prestataire' },
						{ key: 'Mandataire & prestataire', value: 'Mandataire & prestataire' }
					]
				},
				{
					title: 'N° Siret',
					type: 'input',
					defaultValue: this.state.service.siret
				}
			],
			[
				{
					title: 'Addresse',
					type: 'input',
					value: this.state.service.address
				},
				{
					title: 'Code postal',
					type: 'input',
					value: this.state.service.postalCode
				},
				{
					title: 'Ville',
					type: 'input',
					value: this.state.service.city
				},
				{
					title: 'Pays',
					type: 'input',
					value: this.state.service.country
				},
				{
					title: 'Téléphone',
					type: 'input',
					defaultValue: this.state.service.phone
				},
				{
					title: 'Addresse électronique',
					type: 'input',
					defaultValue: this.state.service.email
				}
			]
		]
	}
	render() { return(
		<Form horizontal>
			<Row>
				<Panel header='Mes informations'>
					{FormBuilder.buildFormGroups(this._buildInfos())}					
				</Panel>
			</Row>
		</Form>
	);}
}
/*

*/
export default ServiceProfile;
