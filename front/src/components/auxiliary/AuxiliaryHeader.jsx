// react modules
import React from 'react';
// react-bootstrap modules
import { Row, Col, Table, Panel, Image } from 'react-bootstrap'
// core modules
import StoreRegistry from '../../core/StoreRegistry';

class AuxiliaryHeader extends React.Component {

	constructor(props) {
		super(props);
		this.img= props.data.person.civility==='Mme'?'./../../../assets/img/profil-f.jpeg':'./../../../assets/img/profil.jpeg'
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
						<td>{this.props.data.person.firstName} {this.props.data.person.lastName}</td>
					</tr>
					<tr>
						<th>Adresse electronique</th>
						<td>{this.props.data.user.email}</td>
					</tr>
					<tr>
						<th>Civilité</th>
						<td>{this.props.data.person.civility}</td>
					</tr>
					<tr>
						<th>Diplome</th>
						<td>{this.props.data.diploma}</td>
					</tr>
				</tbody>
				</Table>
				</Panel>
			</Col>
		</Row>
	);}
}

export default AuxiliaryHeader;
