// lib modules
import React from 'react';
import { Row, Col, Panel, Button, Form } from 'react-bootstrap'
// core modules
import Dispatcher from '../../../core/Dispatcher.js';
import StoreRegistry from '../../../core/StoreRegistry.js';
// custom components
import ServiceDetails from './ServiceDetails.jsx';
import Contact from '../../common/entity/Contact.jsx'
import Utils from '../../../utils/Utils.js'
import ButtonsEndDialog from '../../common/ButtonsEndDialog.jsx';

class ServiceProfile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

    onServiceChanged(value) {
    	this.state.service = value;
    }
    onContactChanged(value) {
        this.state.contact = value;
    }

    onCancel() {
    	this.state = {};
    	this.toViewMode();
    }

    toEditMode() {
    	this.setState({ edit: true });
    }
    toViewMode() {
    	this.setState({ edit: false });
    }

    onUpdateService() {
    	let user = StoreRegistry.getStore('LOGIN_STORE').getData('/')

    	let data = this.state.service || this.props.service;
    	data.id = user.id;
    	data.user = user;
    	data.contact = this.state.contact || this.props.service.contact;

    	Dispatcher.issue('PUT_SERVICE', {
			serviceId: user.id,
        	data: data,
        	token: user.token,
        	refresh: true
    	}).
    	then(function() {
    		Dispatcher.issue("GET_SERVICE", { 
    			serviceId: user.id, 
    			token: user.token, 
    			refresh: true 
    		});
    	}).then(function() {
    		this.toViewMode();
    	}.bind(this));
    	
    }

	render() { 
		return(
			<Panel>
				<Form>
				{ this.state.edit ?
					''
				:
					<Button bsStyle='info' onClick={this.toEditMode.bind(this)} block>Modifier mes informations</Button>
				}
					<Row>
						<Col sm={6}>
	            			<ServiceDetails 
	            				edit={this.state.edit}
	            				society={this.props.service.society}
	            				socialReason={this.props.service.socialReason}
	            				siret={this.props.service.siret}
	        	    			onChange={this.onServiceChanged.bind(this)}/>
	    	        	</Col>
		            	<Col sm={6}>
		            		<Contact 
	            				edit={this.state.edit}
	            				address={this.props.service.contact.address}
	            				phone={this.props.service.contact.phone}
	            				email={this.props.service.contact.email}
	            				onChange={this.onContactChanged.bind(this)}/>
	        	    	</Col>
        	    	</Row>
    	        { this.state.edit ?
					<ButtonsEndDialog 
						onOk={this.onUpdateService.bind(this)} okTitle='Enregistrer modifications' 
						onCancel={this.onCancel.bind(this)} cancelTitle='Annuler'/>
				: 
					''
				}
			</Form>
            </Panel>
		);
	}
}

export default ServiceProfile;
