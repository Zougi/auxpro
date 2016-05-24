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
import ProfileAux from '../profile/ProfileAux.jsx'

class HomeAux extends React.Component {

	constructor(props) {
		super(props);
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
				<Tabs defaultActiveKey={this.props.defaultTab || 0} id="auxTabs">
					<Tab eventKey={0} title="Mon Planning"><br/><Planing/></Tab>
					<Tab eventKey={1} title="Ma Zone"><br/>Ma Zone</Tab>
					<Tab eventKey={2} title="Mes Informations"><br/><ProfileAux/></Tab>
					<Tab eventKey={3} title="Les Offres"><br/>Les Offres</Tab>
				</Tabs>
			</Row>
		</Grid>
		<br/>
		</div>
	);}
}

HomeAux.contextTypes = {
	router: React.PropTypes.object
}

export default HomeAux;
