import React from 'react';

import BusyIndicator from 'components-lib/BusyIndicator/BusyIndicator.jsx'

import './AppPreload.css';

class AppPreload extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='ap-app-preload'>
				<div className='ap-app-preload-container'>
					<div className='ap-app-preload-text'>Chargement</div>
					<BusyIndicator className='ap-app-preload-indicator' />
				</div>
			</div>
		);
	}
}

export default AppPreload;