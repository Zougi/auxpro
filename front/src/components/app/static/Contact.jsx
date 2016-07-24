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
				specialsSuccess={[ { date: moment() }]} 
				specialsWarning={[ { date: moment().add(1, 'day') }]} 
				specialsDanger={[{ date: moment().add(2, 'day')}]} 
				specialsInfo={[{ date: moment().add(3, 'day')}]} 
				specialsPrimary={[{ date: moment().add(4, 'day')}]} />
		</Panel>
	);}
}

export default Contact;