import React from 'react';
import { Grid, Row, Col, Table, Panel, PageHeader, Tabs, Tab, Modal, Button } from 'react-bootstrap'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import ModalDialog from 'components-lib/Modal/ModalDialog.jsx'
import ServiceHeader from './ServiceHeader.jsx'
import ServicesTuto from './ServicesTuto.jsx'
import ServiceProfile from './profile/ServiceProfile.jsx'
import ServiceCustomers from './customers/ServiceCustomers.jsx'
import ServiceInterventions from './interventions/ServiceInterventions.jsx'
import ServiceMap from './map/ServiceMap.jsx'
import ServiceHome from './home/ServiceHome.jsx'

class Service extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			storeData: StoreRegistry.getStore('SERVICE_STORE').getData(),
			data: StoreRegistry.getStore('SERVICE_STORE').getData('/data'),
			showTuto: !StoreRegistry.getStore('LOGIN_STORE').getData('/tutoSkipped'),
			showUserHeader: StoreRegistry.getStore('SERVICE_STORE').getData('/display/home/showUserHeader')
		};
	}

	componentWillMount() {
        let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (!logged) {
			this.context.router.push('/login');
		}
    }
	
	componentDidMount() {
		StoreRegistry.register('SERVICE_STORE', this, this.onStoreUpdate.bind(this));
	}


	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);   
	}
	
	onStoreUpdate(first) {
		this.setState({ 
			storeData: StoreRegistry.getStore('SERVICE_STORE').getData(),
			showUserHeader: StoreRegistry.getStore('SERVICE_STORE').getData('/display/home/showUserHeader'),
			data: StoreRegistry.getStore('SERVICE_STORE').getData('/data')
		});

    }

	_tutoClose() {
		this.setState({ showTuto: false });
	}
	_tutoSkip() {
		this.setState({ showTuto: false });
	}
	_profilePromptClose() {
		this.setState({ showProfilePrompt: false });
	}

	_buildProfilePromptModal() { return (
		<ModalDialog
			show={this.state.showProfilePrompt}
			title='Completez votre profil'
			buttons={[
				{ bsStyle: 'success', onClick: this._profilePromptClose.bind(this), text: 'Continuer' },
				{ bsStyle: 'primary', onClick: this._profilePromptClose.bind(this), text: 'Pas maintenant' }
			]} />
	);}

	render() {
		console.log(this.props);
		if (this.state.showTuto) {
			return(
				<div className='container'>
					<br/>
					<ServicesTuto onClose={this._tutoClose.bind(this)} onNeverShow={this._tutoSkip.bind(this)}/>
					<br/>
				</div>
			);
		}
		return(
			<div className='container'>
				{this.state.showUserHeader ? 
					<Row>
						<ServiceHeader storeData={this.state.storeData} />
					</Row>
				:
					''
				}
				<Row>
					{this.props.children}
				</Row>
			</div>
		);
	}
}

Service.contextTypes = {
	router: React.PropTypes.object
}

export default Service;