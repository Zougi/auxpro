import React from 'react'
import moment from 'moment';
import { Panel, Button, Row, Col, Modal, ListGroup, ListGroupItem } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import CustomerSummaryList from 'components/common/customers/CustomerSummaryList';
import DialogConfirmation from 'components-lib/DialogConfirmation/DialogConfirmation'
import ButtonAction from 'components-lib/ButtonAction/ButtonAction.jsx'
import SkillSummaryList from 'components/common/skills/SkillSummaryList.jsx'
import SearchBar from 'components-lib/SearchBar/SearchBar.jsx';
// Lib modules
import Utils from 'utils/Utils'

class ServiceCustomers extends ServiceBaseComponent {
	
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
		return { 
			customers: this.getCustomers(),
			serach: ''
		};
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onSearch(value) {
		this.setState({ search: value });
	}

	onAddCustomer() {
		Dispatcher.issue('NAVIGATE', {path: '/sad/customers/new'});
	}
	onEditCustomer(customer) {
		return function() {
			Dispatcher.issue('NAVIGATE', {path: '/sad/customers/' + customer.id + '/edit'});	
		}		
	}
	onViewCustomer(customer) {
		return function() {
			Dispatcher.issue('NAVIGATE', {path: '/sad/customers/' + customer.id});
		}
	}
	onDeleteCustomer(customer) {
		return function() {
			this.setState({
				showDeleteConfirm: true,
				customerToDelete: customer.id
			});
		}.bind(this)
	}

	doDeleteCustomer() {
		this.deleteCustomer(this.state.customerToDelete);
		this.cancelDeleteCustomer();
	}
	cancelDeleteCustomer() {
		this.setState({ 
			showDeleteConfirm: false,
			customerToDelete: null
		});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildCustomers() {
		return Utils.map(this.state.customers).filter(this._filterCustomer.bind(this)).map(this._buildCustomer.bind(this))
	}
	_filterCustomer(customer) {
		if (this.state.search) {
			let s = this.state.search.toUpperCase();
			return (customer.firstName.toUpperCase().startsWith(s) || customer.lastName.toUpperCase().startsWith(s));
		}
		return false;
	}
	_buildCustomer(customer, i) {
		let age = moment(customer.birthDate).toNow(true);
		return (
			<ListGroupItem key={i}>
				<Row>
                    <Col xs={6}>
                        {customer.firstName} {customer.lastName} - {age}
                    </Col>
                    <Col style={{textAlign:'right'}} xs={6}>
                        <ButtonAction
							bsSize='xsmall' 
							glyph='user'
							tooltip='Voir informations client'
							onClick={this.onViewCustomer(customer)} />
						<ButtonAction
							bsSize='xsmall' 
							glyph='pencil'
							tooltip='Editer informations client'
							onClick={this.onEditCustomer(customer)} />
						<ButtonAction
							bsStyle='danger'
							bsSize='xsmall' 
							glyph='remove'
							tooltip='Supprimer client'
							onClick={this.onDeleteCustomer(customer)} />
					</Col>
				</Row>
				<br className='hidden-sm hidden-md hidden-lg'/>
				<Row>
					<Col sm={12}>
						<SkillSummaryList skills={customer}/>
					</Col>
				</Row>
			</ListGroupItem>
		);
	}
	_buildCustomerActions(action, i) {
		return (
			<ButtonAction
				key={i}
				bsSize='xsmall' 
				bsStyle={action.bsStyle} 
				glyph={action.glyph}
				tooltip={action.tooltip}
				onClick={action.callback} />
			);
	}

	render() {
		let customers = this._buildCustomers();
		return (
			<Row>
				<Panel header={(<strong>Usagers enregistrés</strong>)} bsStyle='warning'>
					<Button block bsStyle='info' onClick={this.onAddCustomer.bind(this)}>Saisir un nouvel usager</Button>
					<br/>
					<SearchBar placeholder="Veuillez saisir le nom d'un usager" onChange={this.onSearch.bind(this)}/>
					<Panel>
						<ListGroup fill>
							{customers}
						</ListGroup>
						<strong>Total : {this.state.search ? customers.length : Utils.map(this.state.customers).length} usagers{this.state.search ? ' trouvés' : ''}.</strong>
					</Panel>
				</Panel>
				<DialogConfirmation
					show={this.state.showDeleteConfirm}
					title='Supprimer usager ?'
					onConfirm={this.doDeleteCustomer.bind(this)}
					confirmStyle='danger'
					confirmText='Supprimer'
					onCancel={this.cancelDeleteCustomer.bind(this)}
					cancelStyle='default'
					cancelText='Annuler'/>
			</Row>
		);
	}
}

export default ServiceCustomers;