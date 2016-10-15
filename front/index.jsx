import 'bootstrap/dist/css/bootstrap.css';

import React from 'react'
import { render } from 'react-dom'
import 'react-bootstrap';

import Bootstrap from 'core/Bootstrap.js';
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import APRouter from 'components-lib/Router/APRouter.jsx'

import App  from './src/components/app/App.jsx'

function onLogon() {
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!logon')
	console.log(StoreRegistry.getStore('LOGIN_STORE').getData('/type'));
}

StoreRegistry.register('LOGIN_STORE', null, onLogon);

render((
	<APRouter/>
), document.getElementById('app'))
