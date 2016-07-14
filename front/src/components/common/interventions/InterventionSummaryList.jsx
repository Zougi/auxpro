// lib modules
import React from 'react';
// custom components
import InterventionSummary from './InterventionSummary.jsx';

class InterventionSummaryList extends React.Component {
	
	constructor(props) {
		super(props);
	}

	_buildInterventions() {
		return (this.props.interventions || []).map(function(intervention) {
            return (
               	<InterventionSummary key={intervention.id} intervention={intervention}/>
            );
        });
	}

	render() {
		return (
			<div>
	            {this._buildInterventions()}
			</div>
		);
	}
}

export default InterventionSummaryList;