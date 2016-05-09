// react modules
import React from 'react';
// react-bootstrap modules
import { Grid, Row, Col, Table, Panel, PageHeader } from 'react-bootstrap'
// core modules
import Dispatcher from '../../core/Dispatcher';
import StoreRegistry from '../../core/StoreRegistry';

class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: StoreRegistry.getStore('AUXILIARY_STORE').getData('/auxiliary/' + StoreRegistry.getStore('LOGIN_STORE').getData('/name'))
		};
	}

	componentWillMount() {
        let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (!logged) {
			this.context.router.push('/login');
		}
    }

	render() { 
	console.log(this.state);
	let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		return(
			<div className='container'>
			<PageHeader>Mon Profil <small>{this.state.data.firstName} {this.state.data.lastName}</small></PageHeader>
			<br/>
			<Grid>
				<Row>
					<Col sm={4}>
						<img src='./../../../assets/img/profil.jpeg'/>
					</Col>
					<Col smOffset={1} sm={7}>
						<Panel>
						<Table bordered striped hover fill>
							<tr>
								<th>Nom</th>
								<td>{this.state.data.firstName} {this.state.data.lastName}</td>
							</tr>
							<tr>
								<th>Adresse electronique</th>
								<td>{this.state.data.email}</td>
							</tr>
							<tr>
								<th>Telephone</th>
								<td>{this.state.data.phone}</td>
							</tr>
							<tr>
								<th>Diplome</th>
								<td>{this.state.data.diploma}</td>
							</tr>
						</Table>
						</Panel>
					</Col>
				</Row>
			</Grid>
			<br/>
			</div>
		);
	}
}

Profile.contextTypes = {
	router: React.PropTypes.object
}

export default Profile;
