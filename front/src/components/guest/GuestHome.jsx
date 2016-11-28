import React from 'react'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
// Core module
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import GuestBaseComponent from 'components/guest/GuestBaseComponent'
import { AsyncImage } from 'lib/Lib'
// Lib modules
import Utils from 'utils/Utils'

class GuestHome extends GuestBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
		this.state.dataLoaded = false;
	}


	// State management functions //
	// --------------------------------------------------------------------------------

	componentWillMount() {
		Dispatcher.issue('LOGON', {
			user: 'guest',
			pass: 'guest'
		}).then(function () {
			return this.loadServices();
		}.bind(this)).
		then(function () {
			this.setState({ dataLoaded: true });
			console.log('==== DONNES INITIALE GUEST ====');
			console.log(this.getGuestData());
		}.bind(this)).
		catch(function (error) {
			console.error('erreur au chargement des données invité');
			console.error(error);
		});
	}
	componentDidMount() {
		StoreRegistry.register('GUEST_STORE/display/postalCode', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('GUEST_STORE', this);
		Dispatcher.issue('LOGOUT', {});
	}
	_onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		return {
			postalCode: this.getGuestData('/display/postalCode'),
		}
	}

	// Rendering functions //
	// --------------------------------------------------------------------------------	

	_buildServices() {
		return Utils.map(this.getServices()).filter(function(service) {
			if (this.state.postalCode) {
				return service.postalCode === Number(this.state.postalCode);
			}
			return true;
		}.bind(this)).
		map(function (service, i) {
			return (
			<Col key={i} xs={12} sm={6} lg={4}>
				<Panel>
					<Col xs={4}>
						<AsyncImage src={service.avatar}/>
					</Col>
					<Col xs={8}>
						<div><strong>{service.socialReason}</strong></div>
						<div>{service.address}</div>
						<div>{service.postalCode} {service.city}</div>
						<div>Email: {service.email}</div>
						<div>Téléphone: {service.phone}</div>
					</Col>
				</Panel>
			</Col>
			);
		});
	}

	render() {
		if (!this.state.dataLoaded) {
			return ( <div className='container'/> );
		}
		return(
			<div className='container'>
				<Grid>
					<Row>
						<Col xs={12}>
							<h2>Sociétés d'aide a domicile</h2>
						</Col>
					</Row>
					<Row>
						{this._buildServices()}
					</Row>
				</Grid>
			</div>
		);
	}
}
export default GuestHome;