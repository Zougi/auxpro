import React from 'react'
import Base from '../Base.jsx';

import { Row, Col, APButton } from 'lib/lib.jsx'

import './ap-buttons.css'
	
class APButtons extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { return (
		<Row>
			<Col sm={6}>
				<Button bsStyle='primary'
						onClick={this.props.onCancel} 
						block>
					{this.props.cancelTitle}
				</Button>
			</Col>
			<br className='hidden-sm hidden-md hidden-lg'/>
			<Col sm={6}>
				<Button bsStyle={this.props.okDisabled ? 'warning' : 'success' }
						disabled={this.props.okDisabled}
						onClick={this.props.onOk} 
						block>
					{this.props.okTitle}
				</Button>
			</Col>
		</Row>
	)}
}

export default APButtons;