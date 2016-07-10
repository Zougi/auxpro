// lib modules
import React from 'react';
import { Row, Col, Panel, Button, Form } from 'react-bootstrap'
// core modules
import Dispatcher from '../../../core/Dispatcher.js';
import StoreRegistry from '../../../core/StoreRegistry.js';
// custom components
import ServiceDetails from './ServiceDetails.jsx';
import Address from '../../common/entity/Address.jsx'
import Contact from '../../common/entity/Contact.jsx'
import Utils from '../../../utils/Utils.js'
import ButtonsEndDialog from '../../common/ButtonsEndDialog.jsx';

class ServiceProfile extends React.Component {

	constructor(props) {
		super(props);
		this.state = this._buildState(props);
	}

	componentWillReceiveProps(props) {
		this.setState(this._buildState(props));
    }

    _buildState(props) {
    	return {  
			edit: props.edit || false,
			service: props.service
		};
    }

    onServiceChanged(value) {
    	Utils.overwrite( this.state.service, value );
    }
    onContactChanged(value) {
        Utils.overwrite( this.state.service.contact, value );
    }
    onAddressChanged(value) {
    	console.log(value)
    	Utils.overwrite( this.state.service.contact.address, value );
    }

    onCancel() {
    	this.toViewMode();
    	this.state.service = this.props.service;
    }

    toEditMode() {
    	this.setState({ edit: true });
    }
    toViewMode() {
    	this.setState({ edit: false });
    }

    onUpdateService() {
    	this.toViewMode();
    	let args = {
			serviceId: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
        	data: this.state.service,
        	token: StoreRegistry.getStore('LOGIN_STORE').getData('/token')
    	};
    	Dispatcher.issue('PUT_SERVICE', args);
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
	            				society={this.state.service.society}
	            				socialReason={this.state.service.socialReason}
	            				siret={this.state.service.siret}
	        	    			onChange={this.onServiceChanged.bind(this)}/>
	    	        	</Col>
		            	<Col sm={6}>
		            		<Address 
	            				edit={this.state.edit}
	            				address={this.state.service ? this.state.service.contact.address.address : null}
	            				city={this.state.service ? this.state.service.contact.address.city : null}
	            				postalCode={this.state.service ? this.state.service.contact.address.postalCode : null}
	            				country={this.state.service ? this.state.service.contact.address.country : null}
	            				onChange={this.onAddressChanged.bind(this)}/>
		            		<Contact 
	            				edit={this.state.edit}
	            				phone={this.state.service ? this.state.service.contact.phone : null}
	            				email={this.state.service ? this.state.service.contact.email : null}
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
