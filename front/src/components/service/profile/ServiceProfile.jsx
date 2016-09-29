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
        this.state = { state: props.edit ? STATES.EDIT : STATES.VIEW };
	}

    componentWillReceiveProps(props) {
        this.service = {};
        this.setState({ state: props.edit ? STATES.EDIT : STATES.VIEW });
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
                contact: this.service.contact || this.props.service.contact,
                siret: service.siret || this.props.service.siret,
                socialReason: service.socialReason || this.props.service.socialReason,
                society: service.society || this.props.service.society,
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
                        <ServiceHeader 
                            service={this.props.service}
                            onAvatarChanged={this.onAvatarChanged.bind(this)}
                            edit={this.state.state === STATES.EDIT}/>
                    </Panel>
                </Row>
                <Row>
                    <Panel>
                        <Col sm={6}>
                            <ServiceDetails 
                                edit={this.state.state === STATES.EDIT}
                                society={this.props.service.society}
                                socialReason={this.props.service.socialReason}
                                siret={this.props.service.siret}
                                onChange={this.onServiceChanged.bind(this)}/>
                        </Col>
                        <Col sm={6}>
                            <Contact 
                                edit={this.state.state === STATES.EDIT}
                                address={this.props.service.contact ? this.props.service.contact.address : {}}
                                phone={this.props.service.contact ? this.props.service.contact.phone : ''}
                                email={this.props.service.contact ? this.props.service.contact.email : ''}
                                onChange={this.onContactChanged.bind(this)}/>
                        </Col>
                    </Panel>
                </Row>
            </Form>
		);
	}
}

export default ServiceProfile;
