import React from 'react'
import { Panel } from 'react-bootstrap'
// Core modules
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import { Col, Row, ITable, AsyncImage, ImageUploader } from 'lib/Lib'

class ServiceHeader extends ServiceBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
	 	StoreRegistry.register('SERVICE_STORE', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);
	}
	_onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		return { service: this.getService() };
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildTable() {
		return [
			[
				{th: 'Raison sociale'},
				{td: this.state.service.socialReason}
			],
			[
				{th: 'Addresse électronique'},
				{td: this.state.service.email}
			],
			[
				{th: 'N° Siret'},
				{td: this.state.service.siret}
			],
			[
				{th: 'Fonctionnement'},
				{td: this.state.service.function}
			]
		];
	}

	render() { return(
		<Row>
			<Panel>
				<Col sm={4}>
					<AsyncImage src={this.state.service.avatar} width={200} height={200}/>
				</Col>
				<Col sm={8}>
					<ITable rows={this._buildTable()} bordered striped hover fill/>
				</Col>
			</Panel>
		</Row>
	);}
}
export default ServiceHeader;