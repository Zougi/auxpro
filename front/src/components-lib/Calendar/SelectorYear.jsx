import React from 'react'
import moment from 'moment'
import { Button } from 'react-bootstrap';

import GlyphButton from '../GlyphButton/GlyphButton.jsx'

import './Calendar.css';

class SelectorYear extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { moment: props.moment || moment() };
	}

	onComponentWillReceiveProps(props) {
		this.setState({ moment: props.moment || moment() });
	}

	onChange() {
		if (this.props.onChange) {
			this.props.onChange(this.state.moment.year());
		}
	}
	
	_onPreviousYear() {
		this.setState({ moment: this.state.moment.subtract(1, 'year') });
		this.onChange();
	}
	_onNextYear() {
		this.setState({ moment: this.state.moment.add(1, 'year') });
		this.onChange();	
	}

	render() { 
		return (
			<div className='ap-selector-year'>
				<GlyphButton bsSize='xsmall' glyph='chevron-left' onClick={this._onPreviousYear.bind(this)}/>
				<Button onClick={this.props.onYearMode}>{' ' + this.state.moment.year() + ' '}</Button>				
				<GlyphButton bsSize='xsmall' glyph='chevron-right' onClick={this._onNextYear.bind(this)}/>
			</div>
		);
	}
}

export default SelectorYear;