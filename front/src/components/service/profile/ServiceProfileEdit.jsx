import React from 'react'
import { Row, Col, Panel, Form } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import FormBuilder from 'components-lib/Form/FormBuilder'
import { AsyncImage, ImageUploader } from 'lib/Lib'
import { APButton } from 'ap-react-bootstrap'
// Lib modules
import AuxiliaryHelper from 'utils/entities/AuxiliaryHelper'
import Validators from 'utils/form/Validators'
import Utils from 'utils/Utils'

class ServiceProfileEdit extends ServiceBaseComponent {

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
		return { service: this.getService() };
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onAddressChanged(address) {
		this.state.service.address = address.address;
		this.state.service.postalCode = address.postalCode;
		this.state.service.city = address.city;
		this.state.service.country = address.country;
		this.state.service.lattitude = address.lattitude;
		this.state.service.longitude = address.longitude;
		this.forceUpdate();
	}
	changeHandler(field) {
		return function (event) {
			let value = event.value || event;
			Utils.setField(this.state.service, field, value);
			this.forceUpdate();
		}.bind(this);
	}

	onSaveProfile() {
		this.updateService(this.state.service).
		then(function() {
			return this.loadService();
		}.bind(this)).
		then(function() {
			Dispatcher.issue('NAVIGATE', { path: '/sad/infos' });
		});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildInfos() {
		return [
			[
				{
					title: 'Raison sociale',
					type: 'input',
					edit: true,
					defaultValue: this.state.service.socialReason,
					changeHandler: this.changeHandler('socialReason'),
					validator: Validators.NonEmptyString
				},
				{
					title: 'Fonctionnement',
					type: 'select',
					edit: true,
					defaultValue: this.state.service.function,
					changeHandler: this.changeHandler('function'),
					validator: Validators.NonNull,
					values: [
						{ key: 'Mandataire', value: 'Mandataire' },
						{ key: 'Prestataire', value: 'Prestataire' },
						{ key: 'Mandataire & prestataire', value: 'Mandataire & prestataire' }
					]
				},
				{
					title: 'N° Siret',
					type: 'input',
					edit: true,
					defaultValue: this.state.service.siret,
					changeHandler: this.changeHandler('siret'),
					validator: Validators.SiretNumber
				}
			],
			[
				{
					type: 'googleAutocomplete',
					edit: true,
					changeHandler: this.onAddressChanged.bind(this),
					placeholder: this.state.service.address + ', ' + this.state.service.postalCode + ' ' + this.state.service.city
				},
				{
					title: 'Addresse',
					type: 'input',
					value: this.state.service.address,
					validator: Validators.NonEmptyString
				},
				{
					title: 'Code postal',
					type: 'input',
					value: this.state.service.postalCode,
					validator: Validators.PostalCode
				},
				{
					title: 'Ville',
					type: 'input',
					value: this.state.service.city,
					validator: Validators.NonEmptyString
				},
				{
					title: 'Pays',
					type: 'input',
					value: this.state.service.country,
					validator: Validators.NonEmptyString
				},
				{
					title: 'Téléphone',
					type: 'input',
					edit: true,
					defaultValue: this.state.service.phone,
					changeHandler: this.changeHandler('phone'),
					validator: Validators.Phone
				},
				{
					title: 'Addresse électronique',
					type: 'input',
					edit: true,
					defaultValue: this.state.service.email,
					changeHandler: this.changeHandler('email'),
					validator: Validators.Email
				}
			]
		]
	}

	render() { return(
		<Form horizontal>
		{ !(this.state.service.profileCompleted) ?
			<Row>
				<Panel bsStyle='danger' header='Statut profil'>
					<p>Votre profil est incomplet.</p>
					<p>Vous devez compléter votre profil afin de pouvoir utiliser nos services.</p>
					<p>Veuillez remplir les informations obligatoires ci-dessous.</p>
				</Panel>
			</Row>
		: '' }
			<Row>
				<APButton
					block
					bsStyle='success'
					text='Enregistrer modifications'
					onClick={this.onSaveProfile.bind(this)} />
			</Row>
			<br/>
			<Row>
				<Panel header={(<strong>Ma photo</strong>)} bsStyle='warning'>
					<AsyncImage
						src={this.state.service.avatar}
						width={200}
						height={200}/>
					<ImageUploader onUploadComplete={this.changeHandler('avatar')}/>
				</Panel>
				<Panel header={(<strong>Mes informations</strong>)} bsStyle='warning'>
					{FormBuilder.buildFormGroups(this._buildInfos())}
				</Panel>
			</Row>
		</Form>
	);}
}
export default ServiceProfileEdit;
