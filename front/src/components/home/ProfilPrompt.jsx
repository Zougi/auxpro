// Import React Core
import React from 'react';

import Dispatcher from '../../core/Dispatcher';
import StoreRegistry from '../../core/StoreRegistry';

import { IndexLink, Link } from 'react-router'
import { Modal, Button } from 'react-bootstrap';

class ProfilPrompt extends React.Component {

	componentWillMount() {
        let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (!logged) {
			this.context.router.push('/login');
		}
    }

	render() { 
		return(
			<div className='static-modal'>
			<Modal.Dialog>
			  <Modal.Header>
				<Modal.Title>Completez votre profil</Modal.Title>
			  </Modal.Header>
			  <Modal.Footer>
				<Link to='/profiledit' className='btn btn-success'>Continuer</Link>
				 <Link to='/home' className='btn btn-primary'>Pas Maintenant</Link>
			  </Modal.Footer>

			</Modal.Dialog>
		  </div>
		);
	}
}

ProfilPrompt.contextTypes = {
	router: React.PropTypes.object
}
		
export default ProfilPrompt;
