import React from 'react';
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal, Button } from 'react-bootstrap'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
import Utils from 'utils/Utils.js';

import ServicesBox from 'components/common/services/ServicesBox.jsx';

class GuestHome extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 	
		return(
			<div className='container'>
				<ServicesBox services={Utils.map(StoreRegistry.getStore('GUEST_STORE').getData('/data/services'))} />
			</div>
		);
	}
}

export default GuestHome;