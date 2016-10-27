import React from 'react';
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal, Button } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import ModalDialog from 'components-lib/Modal/ModalDialog.jsx'
import AuxiliaryHeader from './AuxiliaryHeader.jsx'
import AuxiliaryTuto from './AuxiliaryTuto.jsx'

class Auxiliary extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			storeData: StoreRegistry.getStore('AUXILIARY_STORE').getData(),
			showTuto: !StoreRegistry.getStore('LOGIN_STORE').getData('/tutoSkipped'),
			showUserHeader: StoreRegistry.getStore('AUXILIARY_STORE').getData('/display/home/showUserHeader')
		};
	}
	
	componentWillMount() {
        let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (!logged) {
			Dispatcher.issue('NAVIGATE', { path: '/login' });
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
							StoreRegistry.getStore('AUXILIARY_STORE').getData('/data/auxiliary/profileCompleted')
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
					<Row>
						<AuxiliaryHeader storeData={this.state.storeData} />
					</Row>
				:
					''
				}
				<Row>
					{this.props.children}
				</Row>
			</div>
		);
	}
}
export default Auxiliary;