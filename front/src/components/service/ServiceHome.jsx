import React from 'react';
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal, Button } from 'react-bootstrap'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import ModalDialog from 'components-lib/Modal/ModalDialog.jsx'
import ServiceHeader from './ServiceHeader.jsx'
import ServicesTuto from './ServicesTuto.jsx'
import ServiceProfile from './profile/ServiceProfile.jsx'
import ServiceCustomers from './customers/ServiceCustomers.jsx'
import ServiceInterventions from './interventions/ServiceInterventions.jsx'
import ServiceMap from './map/ServiceMap.jsx'

class ServiceHome extends React.Component {

	constructor(props) {
		super(props);
		this.onStoreUpdate(true);

		this.content = {
			home: this.getHome.bind(this),
			infos: this.getInfos.bind(this),
			zone: this.getZone.bind(this),
			customers: this.getCustomers.bind(this),
			interventions: this.getInterventions.bind(this)	
		}
	}

	componentDidMount() {
        StoreRegistry.register('SERVICE_STORE', this, this.onStoreUpdate.bind(this));
    }
    componentWillUnmount() {
        StoreRegistry.unregister('SERVICE_STORE', this);   
    }
	
    onStoreUpdate(first) {
    	let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
    	let data = StoreRegistry.getStore('SERVICE_STORE').getData().data;
    	this.state = {
			data: data,
			showTuto: first?!user.tutoSkipped:this.state.showTuto,
			showProfilePrompt: first?true:this.state.showProfilePrompt
		};
		if (!first) {
			this.setState(this.state); 
		}
    }

	_tutoClose() {
    	this.setState({ showTuto: false });
    }
    _tutoSkip() {
    	this.setState({ showTuto: false });
    }
    _profilePromptClose() {
    	this.setState({ showProfilePrompt: false });
    }

    getContent(nav) {
		if (nav) {
			return (this.content[nav]());
		} else {
			return (this.content.home());
		}
	}
	
	getHome() { return (
		<div>Acceuil</div>
	);}

	getInfos() { return (
		<ServiceProfile service={this.state.data.service || {}}/>
	);}
	
	getZone() { return (
		<ServiceMap
			service={this.state.data.service || {}}
			customers={this.state.data.customers || {}}
			auxiliaries={this.state.data.auxiliaries || {}} />
	);}

	getCustomers() { return (
		<ServiceCustomers 
			service={this.state.data.service || {}}
			customers={this.state.data.customers || {}} />
	);}
	
	getInterventions() { return (
		<ServiceInterventions 
			service={this.state.data.service || {}}
			customers={this.state.data.customers || {}} 
			interventions={this.state.data.interventions || {}}
			offers={this.state.data.offers || {}} />
	);}

	_buildProfilePromptModal() { return (
		<ModalDialog 
			show={this.state.showProfilePrompt} 
			title='Completez votre profil'
			buttons={[
				{ bsStyle: 'success', onClick: this._profilePromptClose.bind(this), text: 'Continuer' },
				{ bsStyle: 'primary', onClick: this._profilePromptClose.bind(this), text: 'Pas maintenant' }
			]} />
	);}

	render() { 	
		if (this.state.showTuto) {
			return(
				<div className='container'>
					<br/>
					<ServicesTuto onClose={this._tutoClose.bind(this)} onNeverShow={this._tutoSkip.bind(this)}/>
					<br/>
				</div>
			);
		}
		return(
			<div className='container'>
				<Row>
					{this.getContent(this.props.nav)}
				</Row>
				{this._buildProfilePromptModal()}
			</div>
		);
	}
}

export default ServiceHome;