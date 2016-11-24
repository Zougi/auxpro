import React from 'react'
import Base from 'lib/Base.jsx';
// Custom components
import { Row, Col } from 'lib/lib'
import { APButton } from 'ap-react-bootstrap'
// Style
import './ap-buttons.css'
	
export default class APButtons extends React.Component {

	constructor(props) {
		super(props);
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

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