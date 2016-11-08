import React from 'react'
import { Button, Form, FormGroup, Panel, Grid, Row, Col } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent'
import AuxiliaryQuestionnary from 'components/auxiliary/profile/AuxiliaryQuestionnary'
import SkillSummaryList from 'components/common/skills/SkillSummaryList'
import APGauge from 'components-lib/charts/APGauge'
import FormBase from 'components-lib/Form/FormBase'
import FormBuilder from 'components-lib/Form/FormBuilder'
import AsyncImage from 'lib/image/AsyncImage'
import ImageUploader from 'lib/image/ImageUploader'
// Lib modules
import AuxiliaryHelper from 'utils/entities/AuxiliaryHelper'
import Validators from 'utils/form/Validators'
import Utils from 'utils/Utils'

let STATES = {
	PROFILE: 'PROFILE',
	QUESTION: 'QUESTION'
}


class AuxiliaryProfileEdit extends AuxiliaryBaseComponent {

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
		let auxiliary = this.getAuxiliary()
		return { 
			auxiliary: auxiliary,
			validationState: AuxiliaryHelper.checkProfileValidation(auxiliary),
			progression: AuxiliaryHelper.computeProfileProgression(auxiliary)
		};
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onAddressChanged(address) {
		this.state.auxiliary.address = address.address;
		this.state.auxiliary.postalCode = address.postalCode;
		this.state.auxiliary.city = address.city;
		this.state.auxiliary.country = address.country;
		this.state.auxiliary.lattitude = address.lattitude;
		this.state.auxiliary.longitude = address.longitude;
		this.setState({ 
			validationState: AuxiliaryHelper.checkProfileValidation(this.state.auxiliary),
			progression: AuxiliaryHelper.computeProfileProgression(this.state.auxiliary)
		});
	}

	changeHandler(field) { 
		return function (event) {
			let value = event.value || event;
			console.log(event)
			Utils.setField(this.state.auxiliary, field, value); 
			this.setState({ 
				validationState: AuxiliaryHelper.checkProfileValidation(this.state.auxiliary),
				progression: AuxiliaryHelper.computeProfileProgression(this.state.auxiliary)
			});
		}.bind(this);
	}

	onQuestionnary() {
		this.setState({state: STATES.QUESTION});
	}
	onSendQuestionnary(answers) {
		this.postQuestionary({ answers: answers }).
		then(function() {
			return this.loadAuxiliary();
		}.bind(this)).
		then(function() {
			this.onProfile();
		}.bind(this)).
		catch(function (error) {
        	console.log(error);
        });
	}

	onProfile() {
		this.setState({state: STATES.PROFILE});
	}
	onSaveProfile() {
		this.updateAuxiliary(this.state.auxiliary).
		then(function() {
			return this.loadAuxiliary();
		}.bind(this)).
		then(function() {
			Dispatcher.issue('NAVIGATE', { path: '/aux/infos' });
		});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildPersonalInfos() {
		return [
			[
				{
					title: 'Civilité',
					type: 'select',
					edit: true,
					defaultValue: this.state.auxiliary.civility,
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
					defaultValue: this.state.auxiliary.lastName,
					changeHandler: this.changeHandler('lastName'),
					validator: Validators.NonEmptyString
				},
				{
					title: 'Prénom',
					type: 'input',
					edit: true,
					defaultValue: this.state.auxiliary.firstName,
					changeHandler: this.changeHandler('firstName'),
					validator: Validators.NonEmptyString
				},
				{
					title: 'Date de naissance',
					type: 'date',
					edit: true,
					defaultValue: this.state.auxiliary.birthDate,
					changeHandler: this.changeHandler('birthDate'),
					validator: Validators.NonNull
				},
				{
					title: 'Ville de naissance',
					type: 'input',
					edit: true,
					defaultValue: this.state.auxiliary.birthCity,
					changeHandler: this.changeHandler('birthCity'),
					validator: Validators.NonEmptyString
				},
				{
					title: 'Pays de naissance',
					type: 'input',
					edit: true,
					defaultValue: this.state.auxiliary.birthCountry,
					changeHandler: this.changeHandler('birthCountry'),
					validator: Validators.NonEmptyString
				},
				{
					title: 'Nationnalité',
					type: 'input',
					edit: true,
					defaultValue: this.state.auxiliary.nationality,
					changeHandler: this.changeHandler('nationality'),
					validator: Validators.NonEmptyString
				},
				{
					title: 'N° sécurité sociale',
					type: 'input',
					edit: true,
					defaultValue: this.state.auxiliary.socialNumber,
					changeHandler: this.changeHandler('socialNumber'),
					validator: Validators.SocialNumber
				},
				{
					title: "N° carte d'identité",
					type: 'input',
					edit: true,
					defaultValue: this.state.auxiliary.ciNumber,
					changeHandler: this.changeHandler('ciNumber'),
					validator: Validators.IDCardNumber
				}
			],
			[
				{
					type: 'googleAutocomplete',
					edit: true,
					changeHandler: this.onAddressChanged.bind(this),
					placeholder: this.state.auxiliary.address + ', ' + this.state.auxiliary.postalCode + ' ' + this.state.auxiliary.city
				},
				{
					title: 'Addresse',
					type: 'input',
					value: this.state.auxiliary.address,
					validator: Validators.NonEmptyString
				},
				{
					title: 'Code postal',
					type: 'input',
					value: this.state.auxiliary.postalCode,
					validator: Validators.PostalCode
				},
				{
					title: 'Ville',
					type: 'input',
					value: this.state.auxiliary.city,
					validator: Validators.NonEmptyString
				},
				{
					title: 'Pays',
					type: 'input',
					value: this.state.auxiliary.country,
					validator: Validators.NonEmptyString
				},
				{
					title: 'Téléphone',
					type: 'input',
					edit: true,
					defaultValue: this.state.auxiliary.phone,
					changeHandler: this.changeHandler('phone'),
					validator: Validators.Phone
				},
				{
					title: 'Addresse électronique',
					type: 'input',
					edit: true,
					defaultValue: this.state.auxiliary.email,
					changeHandler: this.changeHandler('email'),
					validator: Validators.Email
				}
			]
		]
	}
	_buildProfessionnalInfos() {
		return [[
			{
				title: 'Auto-entrepreneur ?',
				path: 'entrepreneur',
				type: 'select',
				edit: true,
				defaultValue: this.state.auxiliary.entrepreneur ? true : false,
				changeHandler: this.changeHandler('entrepreneur'),
				values: [
					{ key: true, value: 'Oui' },
					{ key: false, value: 'Non' }
				]
			},
			{
				title: 'Diplôme',
				path: 'diploma',
				type: 'input',
				edit: true,
				changeHandler: this.changeHandler('diploma'),
				defaultValue : this.state.auxiliary.diploma,
				validator: Validators.NonEmptyString
			},
			{
				title: 'Mes plus',
				type: 'textArea',
				edit: true,
				rows: 5,
				changeHandler: this.changeHandler('description'),
				defaultValue : this.state.auxiliary.description,
				validator: Validators.Tweet
			}
		]];
	}

	render() { 
		if (this.state.state === STATES.QUESTION) {
			return (
				<AuxiliaryQuestionnary 
					onCancel={this.onProfile.bind(this)} 
					onSubmit={this.onSendQuestionnary.bind(this)} />
			);
		}
		return (
			<Form horizontal>
			{ !(this.state.auxiliary.profileCompleted) ?
				<Row>
					<Col sm={12}>
						<Panel bsStyle='danger' header='Statut profil'>
							<p>Votre profil est incomplet.</p>
							<p>Vous devez compléter votre profil afin de pouvoir utiliser nos services.</p>
							<p>Veuillez remplir les informations obligatoires ci-dessous.</p>
						</Panel>
					</Col>
				</Row>
			: '' }
				<Row>
					<Col sm={12}>
						<Button disabled={!this.state.validationState} 
								bsStyle={this.state.validationState ? 'success' : 'warning'} 
								onClick={this.onSaveProfile.bind(this)} 
								block>
							Enregistrer modifications
						</Button>
					</Col>
				</Row>
				<br/>
				<Row>
					<Col sm={9}>
						<Panel header='Ma photo' bsStyle='info'>
							<AsyncImage 
								src={this.state.auxiliary.avatar} 
								width={200} 
								height={200}/>
							<ImageUploader onUploadComplete={this.changeHandler('avatar')}/>
						</Panel>

						<Panel header='Informations personnelles' bsStyle='info'>
							{FormBuilder.buildFormGroups(this._buildPersonalInfos())}
						</Panel>

						<Panel header='Informations professionnelles' bsStyle='info'>
							{FormBuilder.buildFormGroups(this._buildProfessionnalInfos())}
							{this.state.auxiliary.answers ?
								<FormBase
									edit={true}
									validationState='success'
									title='Mes Compétences'>
									<SkillSummaryList skills={this.state.auxiliary}/>
								</FormBase>
							:
								<FormBase
									edit={true}
									validationState='error'
									title='Mes Compétences'>
									<Button bsStyle='warning' onClick={this.onQuestionnary.bind(this)} block>Remplir questionnaire</Button>
								</FormBase>
							}
						</Panel>

					</Col>
					<Col sm={3} className='hidden-xs'>
						<Panel>
							<APGauge value={this.state.progression} title='Profil complété à :'/>
						</Panel>
					</Col>
				</Row>
			</Form>
		);
	}
}
export default AuxiliaryProfileEdit;
