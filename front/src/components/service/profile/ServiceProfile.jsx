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

class ServiceProfile extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			edit: false,
			service: {}
		};
		this.data = {
			service: {
				contact: {
					address: {}
				}
			}
		};
	}

	componentDidMount() {
		this.loadData();
		StoreRegistry.register('SERVICE_STORE', this, this.loadData.bind(this));
    }
    componentWillUnmount() {
        StoreRegistry.unregister('SERVICE_STORE', this);   
    }
	loadData() {
    	let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
    	this.data = StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + user.id);
    	this.state.service = this.data.service;
    }

    onServiceChanged(value) {
    	this.state.service = Utils.merge( value, this.state.service );
    }
    onContactChanged(value) {
    	console.log(JSON.stringify(value));
    	let address;
    	if (value.address) {
    		address = Utils.merge( value.address, this.data.service.contact.address);
    	}
		this.state.service.contact = Utils.merge( value, this.data.service.contact);
		if (value.address) {
			this.state.service.contact.address = address;
		}
    	console.log(JSON.stringify(this.state.service.contact));
    }

    toEditMode() {
    	this.state.edit = true;
    	this.setState(this.state);
    }

    onUpdateService() {
    	this.state.edit = false;
    	let args = {
			serviceId: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
        	data: this.state.service,
        	token: StoreRegistry.getStore('LOGIN_STORE').getData('/token')
    	};
    	Dispatcher.issue('PUT_SERVICE', args);
    	this.data.service = this.state.service;
    	this.setState(this.state);
    }

    onCancel() {
    	this.state.edit = false;
    	this.state.service = this.data.service;
    	this.setState(this.state);
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
	            				service={this.data.service}
	        	    			onChange={this.onServiceChanged.bind(this)}/>
	    	        	</Col>
		            	<Col sm={6}>
		            		<Contact 
	            				edit={this.state.edit}
	            				contact={this.data.service.contact}
	            				onChange={this.onContactChanged.bind(this)}/>
	        	    	</Col>
        	    	</Row>
    	        { this.state.edit ?
					<Row>
						<Col sm={6}>
							<Button bsStyle='primary' onClick={this.onCancel.bind(this)} block>Annuler</Button>
						</Col>
						<br className='hidden-sm hidden-md hidden-lg'/>
						<Col sm={6}>
							<Button bsStyle='success' onClick={this.onUpdateService.bind(this)} block>Enregistrer modifications</Button>
						</Col>
					</Row>
				: 
					''
				}
			</Form>
            </Panel>
		);
	}
}

export default ServiceProfile;
