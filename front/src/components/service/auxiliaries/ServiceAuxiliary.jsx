import React from 'react'
import { Panel, Row, Col } from 'react-bootstrap'
// Core modules
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import { APButton } from 'ap-react-bootstrap'

class ServiceAuxiliary extends ServiceBaseComponent {
	
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
		return { auxiliary: this.getAuxiliary(this.props.params.auxiliaryId) };
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onBack() {
		Dispatcher.issue('NAVIGATE', {path: '/sad/auxiliaries'});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { return (
		<Row>
			<APButton
				block
				text='Retour'
				onClick={this.onBack} />
			<br/>
			<br/>
			<Panel header={(<strong>{this.state.auxiliary.civility} {this.state.auxiliary.lastName} {this.state.auxiliary.firstName}</strong>)} bsStyle='warning'>
			</Panel>
		</Row>
	);}
}

export default ServiceAuxiliary;