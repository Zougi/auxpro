// lib modules
import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap';

class GlyphButton extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 
		return (
			<Button className='glyph-button' bsSize={this.props.bsSize} bsStyle={this.props.bsStyle} onClick={this.props.onClick}>
				<Glyphicon glyph={this.props.glyph}/>
			</Button>
		);
	}
}

export default GlyphButton;