import React from 'react';
import { Panel } from 'react-bootstrap'
import { Col, Row} from 'lib/Lib.jsx';
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent.jsx'
import StoreRegistry from 'core/StoreRegistry';

class AuxiliaryHome extends AuxiliaryBaseComponent {
	
	constructor(props) {
		super(props);
		this.state = this._buildState();
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('AUXILIARY_STORE', this, this.onStoreUpdate.bind(this));
	}

	componentWillUnmount() {
		StoreRegistry.unregister('AUXILIARY_STORE', this);
	}
	onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		return {
			profileCompleted: this.getAuxiliary().profileCompleted
		}
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() {
		return(
			<Row>
				<Col sm={12}>
				{ (this.state.profileCompleted) ?
					<Panel bsStyle='success' header='Statut profil'>
						Votre profil est actif.
					</Panel>
				:
					<Panel bsStyle='danger' header='Statut profil'>
						Votre profil est incomplet.
					</Panel>
				}
				</Col>
			</Row>
		);
	}
}

export default AuxiliaryHome;