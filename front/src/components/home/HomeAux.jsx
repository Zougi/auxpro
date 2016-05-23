// react modules
import React from 'react';
// react-bootstrap modules
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab } from 'react-bootstrap'
// core modules
import Dispatcher from '../../core/Dispatcher';
import StoreRegistry from '../../core/StoreRegistry';
// custom components
import Planing from '../calendar/Planing.jsx'
import HomeAuxHead from './HomeAuxHead.jsx'

class ProfileAux extends React.Component {

	constructor(props) {
		super(props);
		console.log(StoreRegistry.getStore('LOGIN_STORE').getData('/'));
		console.log(StoreRegistry.getStore('AUXILIARY_STORE').getData('/'));
		this.state = {
			data: StoreRegistry.getStore('AUXILIARY_STORE').getData('/auxiliary/' + StoreRegistry.getStore('LOGIN_STORE').getData('/id'))
		};
	}

	componentWillMount() {
        let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (!logged) {
			this.context.router.push('/login');
		}
    }

	render() { return(
		<div className='container'>
		<PageHeader>Mon Profil <small>{this.state.data.person.firstName} {this.state.data.person.lastName}</small></PageHeader>
		<br/>
		<Grid>
			<Row>
				<HomeAuxHead aux={this.state.data}/>
			</Row>
			<Row>
				<Tabs defaultActiveKey={1} id="auxTabs">
					<Tab eventKey={0} title="Les Offres">Les Offres</Tab>
					<Tab eventKey={1} title="Mon Planning"><Planing/></Tab>
					<Tab eventKey={2} title="Ma Zone">Ma Zone</Tab>
					<Tab eventKey={3} title="Mes Informations">Mes Informations</Tab>
				</Tabs>
			</Row>
		</Grid>
		<br/>
		</div>
	);}
}

ProfileAux.contextTypes = {
	router: React.PropTypes.object
}

export default ProfileAux;
