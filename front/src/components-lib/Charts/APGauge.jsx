import React from 'react'
import { Panel } from 'react-bootstrap'

import './APGauge.css'

let THRESHOLD = [
{ valueMin: 80, valueMax: 100, color: '#5CB85C' },
{ valueMin: 50, valueMax: 80, color: '#F0AD4E' },
{ valueMin: 0, valueMax: 50, color: '#D9534F' }
]

/**
* A react component wrapping a GoogleChart
*/
class APGauge extends React.Component {

	constructor(props) {
		super(props);
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	_getValue() {
		return this.props.value ? (Math.max(Math.min(100, this.props.value), 0)) : 0
	}

	componentDidMount () {
		this._drawChart();
		window.addEventListener('resize', this._drawChart.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this._drawChart.bind(this));
	};

	componentDidUpdate () {
		console.log('UPDATED')
		this._drawChart();
	}

	_drawChart() {
		let value = this._getValue();
		var color = THRESHOLD[0].color
		for (var i = 1; i < THRESHOLD.length; i++) {
			var t = THRESHOLD[i];
			if (value < t.valueMax && value >= t.valueMin) {
				color = t.color;
			}
		}
		let w = this.gaugeContainer.getBoundingClientRect().width;
		this.gaugeBackground.style.background = color;
		this.gaugeBackground.style['border-width'] = (w / 40) + 'px';
		this.gaugeContainer.style.height = w + 'px';
		this.gaugeValue.style.height = (100 - value) + '%';
		this.gaugeTextContainer.style.top = '-' + (100 - value) + '%';
		this.gaugeText.style.fontSize = (w / 4) + 'px';
	}

	render() { return (
		<Panel className='ap-gauge' header={this.props.title ||  ''}>
			<div ref={ (c) => this.gaugeContainer = c } className='ap-gauge-container'>
				<div ref={ (c) => this.gaugeBackground = c } className='ap-gauge-background'>
					<div ref={ (c) => this.gaugeValue = c } className='ap-gauge-value'/>
						<div ref={ (c) => this.gaugeTextContainer = c } className='ap-gauge-text-container'>
						<span ref={ (c) => this.gaugeText = c } className='ap-gauge-text'>
						<strong>{this._getValue()}</strong>%
						</span>
					</div>
				</div>
			</div>
		</Panel>
	);}
}

export default APGauge;
