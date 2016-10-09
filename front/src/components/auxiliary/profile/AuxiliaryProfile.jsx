import React from 'react';
import { Button, Form, FormGroup, Panel, Grid, Row, Col } from 'react-bootstrap'
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// cuistom components
import AuxiliaryHeader from '../AuxiliaryHeader.jsx'
import Person from 'components/common/entity/Person.jsx'
import Contact from 'components/common/entity/Contact.jsx'
import SkillSummaryList from 'components/common/skills/SkillSummaryList.jsx'
import AsyncImage from 'lib/image/AsyncImage.jsx'
import ImageUploader from 'lib/image/ImageUploader.jsx'


class AuxiliaryProfile extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 
		return (
		<Form horizontal>
			<div>
				<Col md={9}>
					<Row>
						<Col sm={6}>
							<Panel bsStyle='info' header='Ajouter une expérience'>
								Décrivez vos expériences professionnelles pour mettre en évidence vos compétences.
							</Panel>
						</Col>
						<Col sm={6}>
							<Panel bsStyle='info' header="Mes zones d'intervention">
								Spécifiez vos zones d'intervention afin de vous voir proposez des missions adaptées.
							</Panel>
						</Col>
					</Row>
					<Row>
						<Col sm={12}>
							<Panel header='Informations personnelles' bsStyle='info'>
								<Col sm={6}>
									<Person 
			            				civility={this.props.auxiliary.person ? this.props.auxiliary.person.civility : 'Mr'}
			            				lastName={this.props.auxiliary.person ? this.props.auxiliary.person.lastName : ''}
			            				firstName={this.props.auxiliary.person ? this.props.auxiliary.person.firstName : ''}
			            				birthDate={this.props.auxiliary.person ? this.props.auxiliary.person.birthDate : []}
			            				birthCity={this.props.auxiliary.person ? this.props.auxiliary.person.birthPlace.city : ''}
			            				birthCountry={this.props.auxiliary.person ? this.props.auxiliary.person.birthPlace.country : ''}
			            				nationality={this.props.auxiliary.person ? this.props.auxiliary.person.nationality : ''}
			            				socialNumber={this.props.auxiliary.person ? this.props.auxiliary.person.socialNumber : ''}/>
								</Col>
								<Col sm={6}>
									<Contact 
			            				address={this.props.auxiliary.contact ? this.props.auxiliary.contact.address : {}}
			            				phone={this.props.auxiliary.contact ? this.props.auxiliary.contact.phone : ''}
			            				email={this.props.auxiliary.contact ? this.props.auxiliary.contact.email : ''} />
								</Col>
							</Panel>
						</Col>
					</Row>
				</Col>
				<Col md={3}>
					<Panel>
						<br/>
						<Panel bsStyle='warning' header='Mes Diplômes'>
							{this.props.auxiliary.infos.diploma}
						</Panel>
						<Panel bsStyle='info' header='Mes Compétences'>
							<SkillSummaryList skills={this.props.auxiliary.skills}/>
						</Panel>
					</Panel>
				</Col>
			</div>
		</Form>
		);
	}
}
export default AuxiliaryProfile;

