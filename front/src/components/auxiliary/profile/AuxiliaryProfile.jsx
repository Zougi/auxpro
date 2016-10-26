import React from 'react';
import { Button, Form, FormGroup, Panel, Grid, Row, Col } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import AuxiliaryHeader from '../AuxiliaryHeader.jsx'
import Person from 'components/common/entity/Person.jsx'
import Contact from 'components/common/entity/Contact.jsx'
import SkillSummaryList from 'components/common/skills/SkillSummaryList.jsx'
import AsyncImage from 'lib/image/AsyncImage.jsx'
import ImageUploader from 'lib/image/ImageUploader.jsx'

class AuxiliaryProfile extends AuxiliaryBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
	 	StoreRegistry.register('AUXILIARY_STORE', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('AUXILIARY_STORE', this);
	}
	_onStoreUpdate() {
		this.setState(this._buildState());
    }
    _buildState() {
    	return {
    		auxiliary: this.getAuxiliary()
    	}
    }
	

	// Callbacks functions //
	// --------------------------------------------------------------------------------


	// Rendering functions //
	// --------------------------------------------------------------------------------
	
	render() { 
		return (
		<Row>
			<Form horizontal>
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
										civility={this.state.auxiliary.person ? this.state.auxiliary.person.civility : 'Mr'}
										lastName={this.state.auxiliary.person ? this.state.auxiliary.person.lastName : ''}
										firstName={this.state.auxiliary.person ? this.state.auxiliary.person.firstName : ''}
										birthDate={this.state.auxiliary.person ? this.state.auxiliary.person.birthDate : []}
										birthCity={this.state.auxiliary.person ? this.state.auxiliary.person.birthPlace.city : ''}
										birthCountry={this.state.auxiliary.person ? this.state.auxiliary.person.birthPlace.country : ''}
										nationality={this.state.auxiliary.person ? this.state.auxiliary.person.nationality : ''}
										socialNumber={this.state.auxiliary.person ? this.state.auxiliary.person.socialNumber : ''}/>
								</Col>
								<Col sm={6}>
									<Contact 
										address={this.state.auxiliary.contact ? this.state.auxiliary.contact.address : {}}
										phone={this.state.auxiliary.contact ? this.state.auxiliary.contact.phone : ''}
										email={this.state.auxiliary.contact ? this.state.auxiliary.contact.email : ''} />
								</Col>
							</Panel>
						</Col>
					</Row>
				</Col>
				<Col md={3}>
					<Panel>
						<br/>
						<Panel bsStyle='warning' header='Mes Diplômes'>
							{this.state.auxiliary.infos ? this.state.auxiliary.infos.diploma : ''}
						</Panel>
						<Panel bsStyle='info' header='Mes Compétences'>
							<SkillSummaryList skills={this.state.auxiliary.skills}/>
						</Panel>
					</Panel>
				</Col>
			</Form>
		</Row>
		);
	}
}
export default AuxiliaryProfile;

