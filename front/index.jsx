
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import 'react-bootstrap';

import Bootstrap from './src/core/Bootstrap.js';

import About         from './src/components/about/About.jsx'
import Contact       from './src/components/about/Contact.jsx'
import App           from './src/components/app/App.jsx'
import Home          from './src/components/home/Home.jsx'
import ProfilePrompt from './src/components/home/ProfilePrompt.jsx'
import ProfileEdit   from './src/components/home/ProfileEdit.jsx'
import Land          from './src/components/land/Land.jsx'
import Login         from './src/components/login/Login.jsx'
import RegisterAux   from './src/components/register/RegisterAux.jsx'
import RegisterSad   from './src/components/register/RegisterSad.jsx'
import AuxiliaryTuto from './src/components/users/auxiliaries/AuxiliaryTuto.jsx'
import ServicesTuto  from './src/components/users/services/ServicesTuto.jsx'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
		<IndexRoute component={Land}/>
		<Route path="/about" component={About}/>
		<Route path="/contact" component={Contact}/>
		<Route path="/login" component={Login}/>
		<Route path="/home" component={Home}/>
		<Route path="/registerAux" component={RegisterAux}/>
		<Route path="/registerSad" component={RegisterSad}/>
		<Route path="/auxiliaryTuto" component={AuxiliaryTuto}/>
		<Route path="/servicesTuto" component={ServicesTuto}/>
		<Route path="/profileprompt" component={ProfilePrompt}/>
		<Route path="/profileedit" component={ProfileEdit}/>
	</Route>
  </Router>
), document.getElementById('app'))
