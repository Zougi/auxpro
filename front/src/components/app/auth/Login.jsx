import React from 'react';

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import BasicLogin from 'components-lib/BasicLogin/BasicLogin.jsx';

class Login extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
            error: ''
        };
	}

    componentDidMount() {
        StoreRegistry.register('ERROR_STORE', this, this.onLogonError.bind(this));
    }

    componentWillUnmount() {
        StoreRegistry.unregister('ERROR_STORE', this);   
    }

    onLogonError() {
        let error = StoreRegistry.getStore('ERROR_STORE').getData('/logon/error');
        if (error) {
            this.setState({ error: 'Echec de connexion' });
        }
    }

	onSubmit(values, event) {
		event.preventDefault();
		let params = {
			user: values.user, 
			pass: values.pass
		};
		Dispatcher.issue('LOGON', params);
	}
	
    render() { 

		return (
			<div className='container'>
				<BasicLogin 
					onSubmit={this.onSubmit.bind(this)} 
					error={this.state.error}/>
				<br/>
			</div>
		);}   
	}

export default Login;