import React from 'react'

import BusyIndicator from 'components-lib/BusyIndicator/BusyIndicator.jsx'

import './GoogleChart.css'

/**
 * A react component wrapping a GoogleChart
 */
class GoogleChart extends React.Component {

  	constructor(props) {
  		  super(props);
  	}
 
    componentWillReceiveProps () {
        this.data = google.visualization.arrayToDataTable(this.props.data);
        this.options = this.props.options;
        this._drawChart();
    }

  	componentDidMount () {
    		this.chart = this._initChart();
        this.componentWillReceiveProps(this.props);
    		window.addEventListener('resize', this._drawChart.bind(this));
  	}

    componentWillUnmount() {
        window.removeEventListener('resize', this._drawChart.bind(this));
    };

    _initChart() {
        switch (this.props.type) {
            case 'ColumnChart': return new google.visualization.ColumnChart(this.chartDiv);
            case 'BarChart': return new google.visualization.BarChart(this.chartDiv);
        }
    }

    _drawChart() {
      	this.chartContainer.style.height = Math.min(this.chartContainer.getBoundingClientRect().width, this.props.height || 500) + 'px';
        this.chart.draw(this.data, this.options);
    }
	
  	render() {
    		return (
      			<div ref={(c) => this.chartContainer = c} className='ap-google-chart-container'>
                <div ref={(c) => this.chartDiv = c} className='ap-google-chart bar'>
                    <div className='ap-google-chart-loader'>
                        <BusyIndicator/>
                    </div>
                </div>
      			</div>
      	);
    }
}

export default GoogleChart;
