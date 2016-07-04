// lib modules
import React from 'react';
// custom components
import InterventionOneTime from './InterventionOneTime.jsx';

class InterventionOneTimeList extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let interventions = (this.props.interventions || []).map(function(intervention) {
            return (
               	<InterventionOneTime key={intervention.id} intervention={intervention}/>
            );
        });

		return (
			<div>
	            {interventions}
			</div>
		);
	}
}

export default InterventionOneTimeList;