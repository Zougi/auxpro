// react modules
import React from 'react';

import Panel from 'components-lib/Panel/Panel.jsx';

class Home extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() { 
		return(
			<Panel>
				Bienvenu dans la superDoc
			</Panel>
	);}
}

export default Home;