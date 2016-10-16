import React from 'react'
import moment from 'moment'
import { Button } from 'react-bootstrap';

import GlyphButton from '../GlyphButton/GlyphButton.jsx'

import './Calendar.css';

moment.locale('fr')

class SelectorMonth extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { moment: props.moment || moment() };
	}

	onComponentWillReceiveProps(props) {
		this.setState({ moment: props.moment || moment() });
	}

	onChange() {
		if (this.props.onChange) {
			this.props.onChange(this.state.moment.month());
		}
	}
	
	_onPreviousMonth() {
		this.setState({ moment: this.state.moment.subtract(1, 'month') });
		this.onChange();
	}
	_onNextMonth() {
		this.setState({ moment: this.state.moment.add(1, 'month') });
		this.onChange();	
	}

	render() { 
		let month = this.state.moment.format('MMMM');
		month = ' ' + month.charAt(0).toUpperCase() + month.slice(1) + ' ';
		return (
			<div className='ap-selector-month'>
				<GlyphButton bsSize='xsmall' glyph='chevron-left' onClick={this._onPreviousMonth.bind(this)}/>
				<Button onClick={this.props.onMonthMode}>{month}</Button>
				<GlyphButton bsSize='xsmall' glyph='chevron-right' onClick={this._onNextMonth.bind(this)}/>
			</div>
		);
	}
}

export default SelectorMonth;