// react modules
import React from 'react';
// react-bootstrap modules
import { Row, Col, Table, Panel, Image } from 'react-bootstrap'
// core modules
import StoreRegistry from '../../core/StoreRegistry';

class HomeAuxHead extends React.Component {

	constructor(props) {
		super(props);
		this.img= props.aux.person.civility==='Mme'?'./../../../assets/img/profil-f.jpeg':'./../../../assets/img/profil.jpeg'
	}

	render() { return(
		<Row>
			<Col sm={4}>
				<Image src={this.img} rounded/>
			</Col>
			<Col smOffset={1} sm={6}>
				<Panel>
				<Table bordered striped hover fill>
				<tbody>
					<tr>
						<th>Nom</th>
						<td>{this.props.aux.person.firstName} {this.props.aux.person.lastName}</td>
					</tr>
					<tr>
						<th>Adresse electronique</th>
						<td>{this.props.aux.user.email}</td>
					</tr>
					<tr>
						<th>Telephone</th>
						<td>{this.props.aux.contact.phone}</td>
					</tr>
					<tr>
						<th>Diplome</th>
						<td>{this.props.aux.diploma}</td>
					</tr>
				</tbody>
				</Table>
				</Panel>
			</Col>
		</Row>
	);}
}

export default HomeAuxHead;
