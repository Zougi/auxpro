// lib modules
import React from 'react';
import { Row, Col, Panel, Button, Form } from 'react-bootstrap'
// core modules
import Dispatcher from 'core/Dispatcher.js';
import StoreRegistry from 'core/StoreRegistry.js';
// custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import ServiceDetails from './ServiceDetails.jsx';
import Contact from 'components/common/entity/Contact.jsx'
import Utils from 'utils/Utils.js'
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog.jsx';

let STATES = {
    VIEW: 'VIEW',
    EDIT: 'EDIT'
};

class ServiceProfileEdit extends ServiceBaseComponent {

	constructor(props) {
		super(props);
        this.state = this._buildState();
	}
	

    // State Management functions //
    // --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('SERVICE_STORE', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);   
	}
	_onStoreUpdate() {
		this.setState({ 
			service: StoreRegistry.getStore('SERVICE_STORE').getData('/data/service')
		});
    }
    _buildState() {
        return {
            service: this.getService()
        };
    }


    // Callbacks functions //
    // --------------------------------------------------------------------------------
   
    onAvatarChanged(avatar) {
        this.service.avatar = avatar;
    }
    onServiceChanged(value) {
    	this.service.service = value;
    }
    onContactChanged(value) {
        this.service.contact = value;
    }

    saveProfile() {
    	let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
        user.avatar = this.service.avatar || user.avatar;
    	var service = this.service.service || {};
        this.updateService(this.state.service).
    	then(function() {
    		this.setStateView();
    	}.bind(this));
    }


    // Rendering functions //
    // --------------------------------------------------------------------------------

	render() { 
		return(
            <Form horizontal>
                <br/>
                <Col sm={12}>
                    <div style={{textAlign:'right'}}>
                        <Button bsStyle='default' onClick={this.setStateView.bind(this)}>Annuler</Button>
                        {' '}
                        <Button bsStyle='success' onClick={this.saveProfile.bind(this)}>Enregistrer modifications</Button>
                    </div>
                </Col>
                <br/>
                <br/>
                <Row>
                    <Panel>
                        <Col sm={6}>
                            <ServiceDetails 
                                edit={true}
                                society={this.state.service.society}
                                socialReason={this.state.service.socialReason}
                                siret={this.state.service.siret}
                                onChange={this.onServiceChanged.bind(this)}/>
                        </Col>
                        <Col sm={6}>
                            <Contact 
                                edit={true}
                                address={this.state.service.contact.address}
                                phone={this.state.service.contact.phone}
                                email={this.state.service.contact.email}
                                onChange={this.onContactChanged.bind(this)}/>
                        </Col>
                    </Panel>
                </Row>
            </Form>
		);
	}
}

export default ServiceProfileEdit;
