import React from 'react';
import { Panel } from 'react-bootstrap'
import { Col, Row} from 'lib/Lib.jsx';

import StoreRegistry from 'core/StoreRegistry';

class AuxiliaryHome extends React.Component {
	
	constructor(props) {
		super(props);
		var data = StoreRegistry.getStore('AUXILIARY_STORE').getData('/data');
		this.state = { 
			profileCompleted: data.auxiliary.profileCompleted
		};
	}
	
	componentDidMount() {
	 	StoreRegistry.register('AUXILIARY_STORE', this, this.onStoreUpdate.bind(this));
    }
    
    componentWillUnmount() {
        StoreRegistry.unregister('AUXILIARY_STORE', this);
    }
	
	onStoreUpdate() {
		var data = StoreRegistry.getStore('AUXILIARY_STORE').getData('/data');
		this.setState({ 
			profileCompleted: data.auxiliary.profileCompleted
		});
    }
	render() { 
			return(
				<Col sm={12}>
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
			</Col>
			);

		}
}

export default AuxiliaryHome;