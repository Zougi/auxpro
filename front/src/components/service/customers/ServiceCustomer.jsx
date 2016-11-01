import React from 'react';
import { Panel, Row, Col, Form } from 'react-bootstrap';
import { APButton } from 'lib/Lib.jsx';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import Contact from 'components/common/entity/Contact.jsx'
import Person from 'components/common/entity/Person.jsx'
import SkillDetailsList from 'components/common/skills/SkillDetailsList.jsx'

class ServiceCustomer extends ServiceBaseComponent {
	
	constructor(props) {
		super(props);
        this.state = this._buildState();
	}
	

	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('SERVICE_STORE', this, this.onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);
	}
	onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		return { customer: this.getCustomer(this.props.params.customerId) };
    }


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onBack() {
		Dispatcher.issue('NAVIGATE', {path: '/sad/customers'});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { return (
		<Row>
			<Panel header={(<strong>Détails client</strong>)}>
				<Form horizontal>
					<Row>
						<Col sm={6}>
		            		<Person 
		            			edit={false}
		            			civility={this.state.customer.person.civility}
								lastName={this.state.customer.person.lastName}
								firstName={this.state.customer.person.firstName}
								birthDate={this.state.customer.person.birthDate}
								birthCity={this.state.customer.person.birthCity}
								birthCountry={this.state.customer.person.birthCountry}
								nationality={this.state.customer.person.nationality}
								socialNumber={this.state.customer.person.socialNumber} />
		            	</Col>
		            	<Col sm={6}>
		            		<Contact 
		            			edit={false}
		            			address={this.state.customer.contact.address}
		            			phone={this.state.customer.contact.phone}
		            			email={this.state.customer.contact.email} />
		            	</Col>
	            	</Row>
	            	<Row>
						<Col sm={12}>
		            		<SkillDetailsList 
		            			edit={false}
		            			skills={this.state.customer.skills} />
		            	</Col>
	            	</Row>
		        </Form>
				<br/>
				<APButton bsStyle='primary' onClick={this.onBack.bind(this)} block>Retour à la liste</APButton>
			</Panel>
		</Row>
	);}
}

export default ServiceCustomer;