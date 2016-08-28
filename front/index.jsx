
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react'
import moment from 'moment'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import 'react-bootstrap';

import Bootstrap from './src/core/Bootstrap.js';

import App           from './src/components/app/App.jsx'
import Land          from './src/components/app/Land.jsx'
import Home          from './src/components/app/home/Home.jsx'
import About         from './src/components/app/static/About.jsx'
import Contact       from './src/components/app/static/Contact.jsx'
import Login         from './src/components/app/auth/Login.jsx'
import RegisterAux   from './src/components/app/auth/RegisterAux.jsx'
import RegisterSad   from './src/components/app/auth/RegisterSad.jsx'

import Documentation   from './src/documentation/Documentation.jsx'

moment.locale('fr');

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>		
		<IndexRoute component={Land}/>
		
		<Route path="/login" component={Login}/>
		<Route path="/registerAux" component={RegisterAux}/>
		<Route path="/registerSad" component={RegisterSad}/>
		<Route path="/home/:nav" component={Home}/>
		<Route path="/about" component={About}/>
		<Route path="/contact" component={Contact}/>
	</Route>
	<Route path="/doc/:nav" component={Documentation}/>
  </Router>
), document.getElementById('app'))
