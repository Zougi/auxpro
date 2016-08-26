import React from 'react'

import Calendar from 'components-lib/calendar/Calendar.jsx'

class About extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { return (
		<div className='container'>
			<Calendar/>
		</div>
	);}
}

export default About;