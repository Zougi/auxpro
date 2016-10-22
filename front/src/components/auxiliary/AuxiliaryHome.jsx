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
			storeData: StoreRegistry.getStore('AUXILIARY_STORE').getData(),
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
	
	componentWillMount() {
        let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (!logged) {
			this.context.router.push('/login');
		}
    }

	componentDidMount() {
	 	StoreRegistry.register('AUXILIARY_STORE', this, this.onStoreUpdate.bind(this));
    }
    
    componentWillUnmount() {
        StoreRegistry.unregister('AUXILIARY_STORE', this);
    }

	onStoreUpdate() {
		this.setState({ 
			showUserHeader: StoreRegistry.getStore('AUXILIARY_STORE').getData('/display/home/showUserHeader') &&
							StoreRegistry.getStore('AUXILIARY_STORE').getData('/data/auxiliary/profileCompleted'),
			data: StoreRegistry.getStore('AUXILIARY_STORE').getData('/data')
		});
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
			<AuxiliaryProfile />
		);
	}

	getEdit() {
		return (
			<AuxiliaryEdit />
		);
	}
	
	getPlanning() {
		return (
			<AuxiliaryPlaning />
		);
	}
	
	getZone() {
		return (
			<AuxiliaryMap />
		);
	}
	
	getOffers() {
		return (
			<AuxiliaryOffers />
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
					<AuxiliaryHeader storeData={this.state.storeData} />
				:
					''
				}
				<Row>
					{this.getContent(this.props.params.nav)}
				</Row>
			</div>
		);
	}
}

AuxiliaryHome.contextTypes = {
	router: React.PropTypes.object
}


export default AuxiliaryHome;