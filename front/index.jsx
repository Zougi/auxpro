
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import 'react-bootstrap';

import Bootstrap from './src/core/Bootstrap.js';

import App           from './src/components/app/App.jsx'
import Land          from './src/components/app/Land.jsx'
import Home          from './src/components/app/home/Home.jsx'
import About         from './src/components/app/static/About.jsx'
import Contact       from './src/components/app/static/Contact.jsx'
import Login         from './src/components/auth/Login.jsx'
import RegisterAux   from './src/components/auth/RegisterAux.jsx'
import RegisterSad   from './src/components/auth/RegisterSad.jsx'
import Map				from './src/components/map/Map.jsx'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>		
		<IndexRoute component={Land}/>
		
		<Route path="/login" component={Login}/>
		<Route path="/registerAux" component={RegisterAux}/>
		<Route path="/registerSad" component={RegisterSad}/>	
		<Route path="/home" component={Home}/>
		<Route path="/about" component={About}/>
		<Route path="/contact" component={Contact}/>
		<Route path="/map" component={Map}/>
	</Route>
  </Router>
), document.getElementById('app'))
