import React from 'react'

import { Panel } from 'react-bootstrap';

import BusyIndicator from 'components-lib/BusyIndicator/BusyIndicator.jsx'
import GoogleChartPie from 'components-lib/charts/GoogleChartPie.jsx'

class Contact extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { return (
		<Panel className='container'>
			<GoogleChartPie/>
		</Panel>
	);}
}

export default Contact;