import React from 'react'
import { Panel } from 'react-bootstrap'
import { Col, Row, ITable } from 'lib/Lib.jsx'
// Core modules
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import AsyncImage from 'lib/image/AsyncImage.jsx'

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
		return {
			auxiliary: this.getAuxiliary()
		}
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildTable() {
		return [
			[
				{ th: 'Civilité' },
				{ td: this.state.auxiliary.person.civility }
			],
			[
				{ th: 'Nom'},
				{ td: this.state.auxiliary.person.firstName + ' ' + this.state.auxiliary.person.lastName }
			],
			[
				{th: 'Adresse electronique' },
				{td: this.state.auxiliary.contact.email }
			],
			[
				{th: 'Diplome' },
				{td: this.state.auxiliary.infos.diploma }
			]
		];
	}

	render() { return(
		<Panel>
			<Col sm={4}>
				<AsyncImage src={this.state.auxiliary.user.avatar} width={200} height={200}/>
			</Col>
			<Col sm={8}>
				<ITable rows={this._buildTable()} bordered striped hover fill/>
			</Col>
		</Panel>
	);}
}
export default AuxiliaryHeader;