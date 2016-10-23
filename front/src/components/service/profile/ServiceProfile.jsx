// lib modules
import React from 'react';
import { Row, Col, Panel, Button, Form } from 'react-bootstrap'
// core modules
import Dispatcher from 'core/Dispatcher.js';
import StoreRegistry from 'core/StoreRegistry.js';
// custom components
import ServiceHeader from '../ServiceHeader.jsx';
import ServiceDetails from './ServiceDetails.jsx';
import Contact from 'components/common/entity/Contact.jsx'
import Utils from 'utils/Utils.js'
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog.jsx';

let STATES = {
    VIEW: 'VIEW',
    EDIT: 'EDIT'
};

class ServiceProfile extends React.Component {

	constructor(props) {
		super(props);
		this.service = {};
        this.state = { 
			state: props.edit ? STATES.EDIT : STATES.VIEW,
			service: StoreRegistry.getStore('SERVICE_STORE').getData('/data/service')
			};
	}
	
	componentDidMount() {
		StoreRegistry.register('SERVICE_STORE', this, this.onStoreUpdate.bind(this));
	}


	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);   
	}
	
	onStoreUpdate() {
		this.setState({ 
			service: StoreRegistry.getStore('SERVICE_STORE').getData('/data/service')
		});

    }

    setStateView(event) {
        if (event) event.preventDefault();
        this.setState({ state: STATES.VIEW });
    }
    setStateEdit(event) {
        if (event) event.preventDefault();
        this.setState({ state: STATES.EDIT });
    }

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
        event.preventDefault();
    	let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
        user.avatar = this.service.avatar || user.avatar;
    	var service = this.service.service || {};
    	Dispatcher.issue('PUT_SERVICE', {
			serviceId: user.id,
        	token: user.token,
        	refresh: true,
            data: {
                id: user.id,
                user: user,
                contact: this.service.contact || this.state.service.contact,
                siret: service.siret || this.state.service.siret,
                socialReason: service.socialReason || this.state.service.socialReason,
                society: service.society || this.state.service.society,
            }
    	}).then(function() {
    		this.setStateView();
    	}.bind(this));
    	
    }

	render() { 
		return(
            <Form horizontal>
                <br/>
                <Col sm={12}>
                    { (this.state.state === STATES.EDIT) ?
                    <div style={{textAlign:'right'}}>
                        <Button bsStyle='default' onClick={this.setStateView.bind(this)}>Annuler</Button>
                        {' '}
                        <Button bsStyle='success' onClick={this.saveProfile.bind(this)}>Enregistrer modifications</Button>
                    </div>
                :
                    <div style={{textAlign:'right'}}>
                        <Button bsStyle='primary' onClick={this.setStateEdit.bind(this)}>Editer mon profil</Button>
                    </div>
                }
                </Col>
                <br/>
                <br/>
                <Row>
                    <Panel>
                        <Col sm={6}>
                            <ServiceDetails 
                                edit={this.state.state === STATES.EDIT}
                                society={this.state.service.society}
                                socialReason={this.state.service.socialReason}
                                siret={this.state.service.siret}
                                onChange={this.onServiceChanged.bind(this)}/>
                        </Col>
                        <Col sm={6}>
                            <Contact 
                                edit={this.state.state === STATES.EDIT}
                                address={this.state.service.contact ? this.state.service.contact.address : {}}
                                phone={this.state.service.contact ? this.state.service.contact.phone : ''}
                                email={this.state.service.contact ? this.state.service.contact.email : ''}
                                onChange={this.onContactChanged.bind(this)}/>
                        </Col>
                    </Panel>
                </Row>
            </Form>
		);
	}
}

export default ServiceProfile;
