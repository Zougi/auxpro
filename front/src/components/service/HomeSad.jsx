// react modules
import React from 'react';
// react-bootstrap modules
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal, Button } from 'react-bootstrap'
// core modules
import Dispatcher from '../../core/Dispatcher';
import StoreRegistry from '../../core/StoreRegistry';
// custom components
import HomeSadHead from './HomeSadHead.jsx'
import ServicesTuto from './ServicesTuto.jsx'
import ServiceProfile from './profile/ServiceProfile.jsx'
import ServiceCustomers from './customers/ServiceCustomers.jsx'
import ServiceInterventions from './interventions/ServiceInterventions.jsx'
import Match from './match/Match.jsx'
import ServicesMap from './map/ServicesMap.jsx'

class HomeSad extends React.Component {

	constructor(props) {
		super(props);
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		this.state = {
			user: user,
			showTuto: !user.tutoSkipped,
			showProfilePrompt: true,
			data: StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + user.id)
		};
	}

	 _tutoClose() {
    	this.state.showTuto = false;
    	this.setState(this.state);
    }
    _tutoSkip() {
    	this.state.showTuto = false;
    	this.setState(this.state);
    }
    _profilePromptClose() {
    	this.state.showProfilePrompt = false;
    	this.setState(this.state);
    }

	render() { 
		if (this.state.showTuto) {
			return(
				<div className='container'>
					<br/>
					<ServicesTuto onClose={this._tutoClose.bind(this)} onNeverShow={this._tutoSkip.bind(this)}/>
					<br/>
				</div>
			);
		}
		return(
			<div className='container'>
				<br/>
				<Grid>
					<Row>
						<HomeSadHead sad={this.state.service}/>
					</Row>
					<Row>
						<Tabs defaultActiveKey={this.props.defaultTab || 0} id="sadTabs">
							<Tab eventKey={0} title="Smaching"><br/><Match/></Tab>
							<Tab eventKey={1} title="Ma Zone"><br/><ServicesMap/></Tab>
							<Tab eventKey={2} title="Mes Informations"><br/><ServiceProfile service={this.state.data.service}/></Tab>
							<Tab eventKey={3} title="Mes Clients"><br/><ServiceCustomers/></Tab>
							<Tab eventKey={4} title="Mes Interventions"><br/><ServiceInterventions/></Tab>
						</Tabs>
					</Row>
				</Grid>
				<br/>
				<Modal show={this.state.showProfilePrompt}>
					<Modal.Header>
						<Modal.Title>Completez votre profil</Modal.Title>
					</Modal.Header>
					<Modal.Footer>
						<Button className='btn btn-success' onClick={this._profilePromptClose.bind(this)}>Continuer</Button>
						<Button className='btn btn-primary' onClick={this._profilePromptClose.bind(this)}>Pas Maintenant</Button>
					</Modal.Footer> 
				</Modal>
			</div>
		);
	}
}

HomeSad.contextTypes = {
	router: React.PropTypes.object
}

export default HomeSad;
