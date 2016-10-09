import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import APGauge from 'components-lib/charts/APGauge.jsx'

class Contact extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 
		return (
			<Grid>
				<Col xs={4}>
					<APGauge value='26' title='Profile complété'/>
				</Col>
			</Grid>
		);
	}
}

export default Contact;