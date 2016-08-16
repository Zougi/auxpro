import React from 'react';
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal, Button } from 'react-bootstrap'

import Dispatcher from '../../core/Dispatcher';
import StoreRegistry from '../../core/StoreRegistry';
import Utils from '../../utils/Utils.js';

import ServicesBox from '../common/services/ServicesBox.jsx';

class GuestHome extends React.Component {

	constructor(props) {
		super(props);
    	this.state = {
			data: Utils.map(StoreRegistry.getStore('SERVICE_STORE').getData('/service'))
		};
	}

	render() { 	
		return(
			<div className='container'>
				<ServicesBox services={this.state.data} />
			</div>
		);
	}
}

export default GuestHome;