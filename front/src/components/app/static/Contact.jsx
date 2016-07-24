// react modules
import React from 'react'
import moment from 'moment'
import { Panel } from 'react-bootstrap';

import Calendar from '../../../components-lib/calendar/Calendar.jsx'

class Contact extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { return (
		<Panel className='container'>
			<Calendar 
				selected={moment().subtract(2, 'day')}
				specialsSuccess={[moment()]} 
				specialsWarning={[moment().add(1, 'day')]} 
				specialsDanger={[moment().add(2, 'day')]} 
				specialsInfo={[moment().add(3, 'day')]} 
				specialsPrimary={[moment().add(4, 'day')]} />
		</Panel>
	);}
}

export default Contact;