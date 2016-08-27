import React from 'react'

import './GoogleChart.css'

/**
 * A react component wrapping a GoogleChart
 */
class GoogleChartPie extends React.Component {

  	constructor(props) {
  		super(props);
  	}
  
	componentDidMount () {
		this.chart = new google.visualization.PieChart(this.chartDiv);
	}	
	
	componentDidUpdate () {
		this.data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
	        ['Mushrooms', 3],
	        ['Onions', 1],
	        ['Olives', 1],
	        ['Zucchini', 1],
	        ['Pepperoni', 2]
        ]);
        this.options = {
        	'title':'How Much Pizza I Ate Last Night',
            'width':400,
            'height':300
        };
		this.chart.draw(this.data, this.options);
	}
	
	render() {
		return (
			<div ref={(c) => this.chartDiv = c} className='ap-google-chart pie'></div>
  		);
  	}
}

export default GoogleChartPie;
