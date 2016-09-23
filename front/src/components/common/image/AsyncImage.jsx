import React from 'react';

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import BusyIndicator from 'components-lib/BusyIndicator/BusyIndicator.jsx'

import './Image.css'

/**
 * props:
 *
 * @src    :
 * @height :
 * @width  :
 */
class AsyncImage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { source: null };
	}

	componentWillReceiveProps(props) {
		this.setState({ source: null });
		this._loadImageSource(props);
	}

	componentDidMount() {
	 	StoreRegistry.register('APP_STORE', this, this._onStoreUpdate.bind(this));
		this._loadImageSource(this.props);
    }
    
    componentWillUnmount() {
        StoreRegistry.unregister('APP_STORE', this);   
    }

    _loadImageSource(props) {
    	if (props.src) {
	    	let source = this._getImageSource(props);
			if (!source) {
				let params = {
					image: props.src,
					token: StoreRegistry.getStore('LOGIN_STORE').getData('/token')
				}
				this.setState({ loading: true });
				Dispatcher.issue('GET_IMAGE', params);
			} else {
				this._onImageLoaded(source);
			}
		}
	}

	_getImageSource(props) {
		return StoreRegistry.getStore('APP_STORE').getData('/images/' + props.src)
    }
    
	_onStoreUpdate() {
		let source = this._getImageSource(this.props);
		if (source) {
			this._onImageLoaded(source);
		}
    }

    _onImageLoaded(source) {
    	this.setState({ source: source, loading: false });
    }

    _renderContent() {
    	if (this.state.source) {
			//return ( <img className='ap-async-image-img' src={this.state.source.src} /> );
			return <div className='ap-async-image-img' style={{ backgroundImage: 'url(' + this.state.source.src + ')' }}/>
		}
		if (this.state.loading) {
			return <BusyIndicator/> ;
		}
		return <div />
	}

	render() {
		return (
			<div 
				className='ap-async-image'
				style={{ width: this.props.width, height: this.props.height }}>				
				{this._renderContent()}
			</div>
		);
	}
}

export default AsyncImage;