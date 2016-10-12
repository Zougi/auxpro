import React from 'react';
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal, Button } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import ModalDialog from 'components-lib/Modal/ModalDialog.jsx'
import AuxiliaryEdit from './edit/AuxiliaryEdit.jsx'
import AuxiliaryHeader from './AuxiliaryHeader.jsx'
import AuxiliaryMap from './map/AuxiliaryMap.jsx'
import AuxiliaryPlaning from './planing/AuxiliaryPlaning.jsx'
import AuxiliaryOffers from './offers/AuxiliaryOffers.jsx'
import AuxiliaryProfile from './profile/AuxiliaryProfile.jsx'
import AuxiliaryTuto from './AuxiliaryTuto.jsx'

class AuxiliaryHome extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: StoreRegistry.getStore('AUXILIARY_STORE').getData('/data'),
			showTuto: !StoreRegistry.getStore('LOGIN_STORE').getData('/tutoSkipped'),
			showUserHeader: StoreRegistry.getStore('AUXILIARY_STORE').getData('/display/home/showUserHeader')
		};

		this.content = {
			home: this.getHome.bind(this),
			infos: this.getInfos.bind(this),
			edit: this.getEdit.bind(this),
			planning: this.getPlanning.bind(this),
			zone: this.getZone.bind(this),
			offres: this.getOffers.bind(this)			
		}
	}

	componentDidMount() {
	 	StoreRegistry.register('AUXILIARY_STORE', this, this.onStoreUpdate.bind(this));
    }
    
    componentWillUnmount() {
        StoreRegistry.unregister('AUXILIARY_STORE', this);
    }

	onStoreUpdate(first) {
		this.setState({ showUserHeader: StoreRegistry.getStore('AUXILIARY_STORE').getData('/display/home/showUserHeader') &&
										StoreRegistry.getStore('AUXILIARY_STORE').getData('/data/auxiliary/profileCompleted')
		});
		this.setState({ data: StoreRegistry.getStore('AUXILIARY_STORE').getData('/data') });
    }
	
	// data : {lattitude: "48.862919", longitude: "2.292004", radius: "500"}
	sendGeoZone(geoZone){
		let params = { 
			id: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
			token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
			data : geoZone
		};
		Dispatcher.issue('POST_AUXILIARY_GEOZONE', params);
	}
	
	deleteGeoZone(geoZone) {
		let params = { 
			id: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
			token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
			data : geoZone
		};
		Dispatcher.issue('DELETE_AUXILIARY_GEOZONE', params);
	}	

    _tutoClose() {
    	this.setState({ showTuto: false });
    }
    _tutoSkip() {
    	this.setState({ showTuto: false });
    }

	getContent(nav) {
		if (!this.state.data.auxiliary.profileCompleted) {
			return this.getEdit();
		}
		if (nav) {
			return (this.content[nav]());
		} else {
			return (this.content.home());
		}
	}

	getHome() {
		return (
			<Col sm={12}>
				<Row>
					<Col sm={12}>
					{ (this.state.data.auxiliary.profileCompleted) ?
						<Panel bsStyle='success' header='Statut profil'>
							Votre profil est actif.
						</Panel>
					:
						<Panel bsStyle='danger' header='Statut profil'>
							Votre profil est incomplet.
						</Panel>
					}
					</Col>
				</Row>
			</Col>
		);
	}
	
	getInfos() {
		return (
			<AuxiliaryProfile storeData={this.props.storeData}				
				auxiliary={this.state.data.auxiliary ||	 {}}
				edit={this.props.query.edit === 'true'} />
		);
	}

	getEdit() {
		return (
			<AuxiliaryEdit
				storeData={this.props.storeData}				
				auxiliary={this.state.data.auxiliary ||	 {}}
				edit={true} />
		);
	}
	
	getPlanning() {
		return (
			<AuxiliaryPlaning storeData={this.props.storeData}
				auxiliary={this.state.data.auxiliary}
				customers={this.state.data.customers}
				indisponibilities={this.state.data.indisponibilities}
				interventions={this.state.data.interventions}
				offers={this.state.data.offers}
				services={this.state.data.services} />
		);
	}
	
	getZone() {
		return (
			<AuxiliaryMap storeData={this.props.storeData}
				auxiliary={this.state.data.auxiliary}
				offers={this.state.data.offers}
				interventions={this.state.data.interventions}
				customers={this.state.data.customers}
				geoZones={this.state.data.geoZones} 
				sendGeoZone={this.sendGeoZone.bind(this)} 
				deleteGeoZone={this.deleteGeoZone.bind(this)}/>
		);
	}
	
	getOffers() {
		return (
			<AuxiliaryOffers storeData={this.props.storeData}
				auxiliary={this.state.data.auxiliary}
				customers={this.state.data.customers}
				interventions={this.state.data.interventions}
				offers={this.state.data.offers}
				services={this.state.data.services} />
		);
	}

	render() { 
		if (this.state.showTuto) {
			return(
				<div className='container'>
					<br/>
					<AuxiliaryTuto onClose={this._tutoClose.bind(this)} onNeverShow={this._tutoSkip.bind(this)}/>
					<br/>
				</div>
			);
		}
		return (
			<div className='container'>
				{this.state.showUserHeader ? 
					<AuxiliaryHeader storeData={this.props.storeData} />
				:
					''
				}
				<Row>
					{this.getContent(this.props.nav)}
				</Row>
			</div>
		);
	}
}

AuxiliaryHome.contextTypes = {
	router: React.PropTypes.object
}


export default AuxiliaryHome;