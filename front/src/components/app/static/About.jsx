import React from 'react'

import Calendar from 'components-lib/calendar/Calendar.jsx'

import GoogleChartPie from 'components-lib/charts/GoogleChartPie.jsx'

class About extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { return (
		<div className='container'>
			<GoogleChartPie/>
		</div>
	);}
}

export default About;