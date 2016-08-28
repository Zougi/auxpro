// react modules
import React from 'react';

import { Panel } from 'lib/Lib.jsx';

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