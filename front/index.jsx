// Globally import the bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
// React modules
import React from 'react'
import { render } from 'react-dom'

// Our internal bootstrap, required to declare actions & stores
import Bootstrap from 'core/Bootstrap.js';
// Our root component handling routing in the application
import AppRouter from 'components/app/AppRouter.jsx'

render((
	<AppRouter/>
), document.getElementById('app'))
