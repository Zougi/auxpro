// react modules
import React from 'react'
import moment from 'moment'
import { Panel } from 'react-bootstrap';

import BusyIndicator from '../../../components-lib/BusyIndicator/BusyIndicator.jsx'

class Contact extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { return (
		<Panel className='container'>
			<BusyIndicator/>
		</Panel>
	);}
}

export default Contact;