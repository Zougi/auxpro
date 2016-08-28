import React from 'react'

import { SKILLS } from './SkillData.js'

import GoogleChart from 'components-lib/charts/GoogleChart.jsx'

class SkillChart extends React.Component {

	constructor(props) {
		super(props);
	}

    _buildData() {
        console.log()
        if (!this.props.skills) {
            return [['', '']];
        }
        let result = SKILLS.map(function(skill) {
            return [skill.title, this.props.skills[skill.field]];
        }.bind(this));
        result.unshift(['Compétences', 'Score']);
        return result;
    }

    _buildOptions() {
        return {
            hAxis: { 
                textPosition: 'none',
                gridlines: {
                    count: 2
                },
                direction: this.props.hFlip ? -1 : 1
            },
            vAxis: { 
                textPosition: 'none',
                baselineColor: '#000000'
            },
            legend: { 
                position: 'none' 
            }
        }
    }

	render() { 
        console.log('render');
        if (this.props.skills) {
    		return (
    			<GoogleChart
    				data={this._buildData()}
    				options={this._buildOptions()}
    				height={400}
    				type='BarChart'/>
    		);
        }
        return <div/>;
	}
}

export default SkillChart;