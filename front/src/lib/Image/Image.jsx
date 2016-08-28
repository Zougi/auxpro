import React from 'react'
import Base from '../Base.jsx';

class Image extends Base {

	constructor(props) {
		super(props);
		this.buildProps();
	}
	
	buildProps() {
		this.imageProps = {};
		this.copyFromObj(this.props, 'src', this.imageProps);
		this.addClassIf(this.props.rounded, this.imageProps, "img-rounded");
	}
	
	render() {
		return(
			<img {...this.imageProps}/>
		);
	}
}

export default Image;
