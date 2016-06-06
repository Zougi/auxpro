// react modules
import React from 'react'
import moment from 'moment'

class About extends React.Component {

	constructor(props) {
		super(props);
		moment.locale('fr');
		console.log(moment().format());
		console.log(moment().startOf('week').format());
	}

	render() { return (
		<div className='container'>About</div>
	);}
}

export default About;