// react modules
import React from 'react';

class Image extends React.Component {

	constructor(props) {
		super(props);
		this.imageProps = {};
		this.fillImageProps(props);
	}
	
		fillImageProps(props) {
		if (props.src)
			this.imageProps.src = props.src;
		
		if (props.rounded) {
			this.imageProps.className = "img-rounded";
		}
	}
	
	render() {
		return(
			<img {...this.imageProps}/>
		);
	}
}

export default Image;
