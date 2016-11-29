import React from 'react'
import { Panel } from 'react-bootstrap'
// Core modules
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent'
import { Col, Row, ITable, AsyncImage } from 'lib/Lib'

class AuxiliaryHeader extends AuxiliaryBaseComponent {

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
		return { auxiliary: this.getAuxiliary() };
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildTable() {
		return [
			[
				{ th: 'Civilité' },
				{ td: this.state.auxiliary.civility }
			],
			[
				{ th: 'Nom'},
				{ td: this.state.auxiliary.firstName + ' ' + this.state.auxiliary.lastName }
			],
			[
				{th: 'Adresse electronique' },
				{td: this.state.auxiliary.email }
			],
			[
				{th: 'Diplome' },
				{td: this.state.auxiliary.diploma }
			]
		];
	}

	render() { return(
		<Panel>
			<Col sm={4}>
				<AsyncImage src={this.state.auxiliary.avatar} width={200} height={200}/>
			</Col>
			<Col sm={8}>
				<ITable rows={this._buildTable()} bordered striped hover fill/>
			</Col>
		</Panel>
	);}
}
export default AuxiliaryHeader;