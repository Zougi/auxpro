import React from 'react'
import { Button, Form, FormGroup, Panel, Grid, Row, Col } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent'
import FormBuilder from 'components-lib/Form/FormBuilder'
import SkillSummaryList from 'components/common/skills/SkillSummaryList'

class AuxiliaryProfile extends AuxiliaryBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
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
			auxiliary: this.getAuxiliary()
		}
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------


	// Rendering functions //
	// --------------------------------------------------------------------------------
	
	_buildPersonalInfos() {
		return [
			[
				{
					title: 'Civilité',
					type: 'select',
					defaultValue: this.state.auxiliary.civility,
					values: [
						{ key: 'Mr', value: 'Mr' },
						{ key: 'Mme', value: 'Mme' }
					]
				},
				{
					title: 'Nom',
					type: 'input',
					defaultValue: this.state.auxiliary.lastName
				},
				{
					title: 'Prénom',
					type: 'input',
					defaultValue: this.state.auxiliary.firstName
				},
				{
					title: 'Date de naissance',
					type: 'date',
					defaultValue: this.state.auxiliary.birthDate
				},
				{
					title: 'Ville de naissance',
					type: 'input',
					defaultValue: this.state.auxiliary.birthCity
				},
				{
					title: 'Pays de naissance',
					type: 'input',
					defaultValue: this.state.auxiliary.birthCountry
				},
				{
					title: 'Nationnalité',
					type: 'input',
					defaultValue: this.state.auxiliary.nationality
				},
				{
					title: 'N° sécurité sociale',
					type: 'input',
					defaultValue: this.state.auxiliary.socialNumber
				},
				{
					title: "N° carte d'identité",
					type: 'input',
					defaultValue: this.state.auxiliary.ciNumber
				}
			],
			[
				{
					title: 'Addresse',
					type: 'input',
					value: this.state.auxiliary.address
				},
				{
					title: 'Code postal',
					type: 'input',
					value: this.state.auxiliary.postalCode
				},
				{
					title: 'Ville',
					type: 'input',
					value: this.state.auxiliary.city
				},
				{
					title: 'Pays',
					type: 'input',
					value: this.state.auxiliary.country
				},
				{
					title: 'Téléphone',
					type: 'input',
					defaultValue: this.state.auxiliary.phone
				},
				{
					title: 'Addresse électronique',
					type: 'input',
					defaultValue: this.state.auxiliary.email
				}
			]
		]
	}

	render() {
		return (
		<Row>
			<Form horizontal>
				<Col md={9}>
					<Row>
						<Col sm={6}>
							<Panel bsStyle='info' header='Ajouter une expérience'>
								Décrivez vos expériences professionnelles pour mettre en évidence vos compétences.
							</Panel>
						</Col>
						<Col sm={6}>
							<Panel bsStyle='info' header="Mes zones d'intervention">
								Spécifiez vos zones d'intervention afin de vous voir proposez des missions adaptées.
							</Panel>
						</Col>
					</Row>
					<Row>
						<Col sm={12}>
							<Panel header='Informations personnelles v2' bsStyle='info'>
								{FormBuilder.buildFormGroups(this._buildPersonalInfos())}
							</Panel>
						</Col>
					</Row>
				</Col>
				<Col md={3}>
					<Panel>
						<br/>
						<Panel bsStyle='primary' header='Mes Plus'>
							{this.state.auxiliary.description}
						</Panel>
						<Panel bsStyle='primary' header='Mes Diplômes'>
							{this.state.auxiliary.diploma}
						</Panel>
						<Panel bsStyle='primary' header='Mes Compétences'>
							<SkillSummaryList skills={this.state.auxiliary}/>
						</Panel>
					</Panel>
				</Col>
			</Form>
		</Row>
		);
	}
}
export default AuxiliaryProfile;