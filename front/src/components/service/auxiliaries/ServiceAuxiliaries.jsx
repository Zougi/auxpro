import React from 'react'
import moment from 'moment'
import { Panel, Row, Col } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import APPanelBasic from 'components-lib/Panel/APPanelBasic'
import SearchBar from 'components-lib/SearchBar/SearchBar'
// Lib modules
import Utils from 'utils/Utils'

class ServiceAuxiliaries extends ServiceBaseComponent {
	
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
			auxiliaries: this.getAuxiliaries(),
			search: ''
		};
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onSearch(value) {
		this.setState({ search: value });
	}
	onViewAuxiliary(auxiliary) {
		Dispatcher.issue('NAVIGATE', { path: '/sad/auxiliaries/' + auxiliary.id });
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildAuxiliaries() {
		return Utils.map(this.state.auxiliaries).
		filter(this.__filterAuxiliary.bind(this)).
		map(this.__buildAuxiliary.bind(this))
	}
	__filterAuxiliary(auxiliary) {
		if (this.state.search) {
			let s = this.state.search.toUpperCase();
			return (auxiliary.firstName.toUpperCase().startsWith(s) || auxiliary.lastName.toUpperCase().startsWith(s));
		}
		return true;
	}
	__buildAuxiliary(auxiliary, i) {
		let age = moment(auxiliary.birthDate).toNow(true);
		let text = [
			(<strong>{auxiliary.civility} {auxiliary.lastName} {auxiliary.firstName}</strong>),
			auxiliary.address,
			auxiliary.postalCode + ' ' + auxiliary.city,
		];
		let actions = [{
			tooltip: 'Voir détails auxiliaire',
			glyph: 'user',
			callback: this.onViewAuxiliary.bind(this, auxiliary)
		}];
		return (
			<Col key={i} sm={6} md={4}>
				<APPanelBasic
					title='Auxiliaire'
					bsStyle='info'
					actions={actions}
					text={text} />
			</Col>
		);
	}

	render() {
		let auxiliaries = this._buildAuxiliaries();
		return (
			<Row>
				<Panel header={(<strong>Mes auxiliaires de vie</strong>)} bsStyle='warning'>
					<SearchBar placeholder='Rechercher un auxiliaire' onChange={this.onSearch.bind(this)}/>
					<Panel>
						<strong>Total : {this.state.search ? auxiliaries.length : Utils.map(this.state.auxiliaries).length} usagers{this.state.search ? ' trouvés' : ''}.</strong>
					</Panel>
					<Row>
						{auxiliaries}
					</Row>
				</Panel>
			</Row>
		);
	}
}
export default ServiceAuxiliaries;
