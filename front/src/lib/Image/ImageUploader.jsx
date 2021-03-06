import React from 'react';

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

class ImageUploader extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { 
			loading: false,
			selected: false
		};
	}

	imageSubmitted(e) {
		e.preventDefault();
		if (this.fileInput.files.length && this.fileInput.files[0]) {
			this.setState({ loading: true });
			var params = {
				data: {
					name: 'img',
					file: this.fileInput.files[0]
				},
				token: StoreRegistry.getStore('LOGIN_STORE').getData('/token')			
			};
			Dispatcher.issue('POST_IMAGE', params).
			then(function (oResult) {
				if (this.props.onUploadComplete) {
					this.props.onUploadComplete(params.data.id);
				}
				this.setState({ loading: false });
			}.bind(this));
		} else {
			console.log('no file selected');
		}
	}

	render() {
		return (
			<div>
				<input ref={(c) => this.fileInput = c} type='file' />
				<button onClick={this.imageSubmitted.bind(this)}>{this.state.loading ? 'Chargement...' : 'Envoyer'}</button>
			</div>
		);
	}
}

export default ImageUploader;