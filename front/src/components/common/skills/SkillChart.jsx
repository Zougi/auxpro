import React from 'react'

import { SKILLS } from './SkillData.js'

import GoogleChart from 'components-lib/charts/GoogleChart.jsx'

class SkillChart extends React.Component {

	constructor(props) {
		super(props);
	}

    _buildData() {
        if (!this.props.skills) {
            return [['', '']];
        }
        let cusSkills = this.props.skills[0] || {};
        let auxSkills = this.props.skills[1] || {};
        let result = SKILLS.map(function(skill) {
            return [skill.title, cusSkills[skill.field] || 0, auxSkills[skill.field] || 0];
        }.bind(this));
        result.unshift(['Compétences', 'Client', 'Auxiliaire']);
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
            },
            animation:{
                duration: 1000,
                easing: 'out'
            }
        }
    }

	render() { 
        if (this.props.skills) {
    		return (
    			<GoogleChart
    				data={this._buildData()}
    				options={this._buildOptions()}
    				height={400}
    				type='ColumnChart'/>
    		);
        }
        return <div/>;
	}
}

export default SkillChart;