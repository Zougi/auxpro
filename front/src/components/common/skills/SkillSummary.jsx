import React from 'react';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

class SkillSummary extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let tooltip = (
			<Tooltip id="tooltip">{this.props.title}</Tooltip>
		);

		return (
			<OverlayTrigger placement='top' overlay={tooltip}>
				<div className="skill-small"><Glyphicon glyph={this.props.icon}/> {this.props.value} </div>
			</OverlayTrigger>
		);
	}
}

export default SkillSummary;