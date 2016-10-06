
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import 'react-bootstrap';

import Bootstrap from './src/core/Bootstrap.js';

// Initial display
import App  from './src/components/app/App.jsx'
import Land from './src/components/app/Land.jsx'
import Home from './src/components/app/home/Home.jsx'
// Authentication pages
import Login       from './src/components/app/auth/Login.jsx'
import RegisterAux from './src/components/app/auth/RegisterAux.jsx'
import RegisterSad from './src/components/app/auth/RegisterSad.jsx'
// Static pages
import About        from 'components/app/static/About.jsx'
import Contact      from 'components/app/static/Contact.jsx'
import CGV          from 'components/app/static/CGV.jsx'
import CGU          from 'components/app/static/CGU.jsx'
import Presentation from 'components/app/static/Presentation.jsx'
// Documentation pages
import Documentation from './src/documentation/Documentation.jsx'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>		
		<IndexRoute component={Land}/>		
		<Route path='/login' component={Login}/>
		<Route path='/registerAux' component={RegisterAux}/>
		<Route path='/registerSad' component={RegisterSad}/>
		<Route path='/home' component={Home}/>
		<Route path='/home/:nav' component={Home}/>

		<Route path='/presentation' component={Presentation}/>
		<Route path='/about' component={About}/>
		<Route path='/contact' component={Contact}/>
	</Route>
	<Route path='/doc/:nav' component={Documentation}/>
  </Router>
), document.getElementById('app'))
