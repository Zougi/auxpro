import React from 'react'
import Base from '../Base.jsx';

import './ap-buttons.css';

/**
 * @props.type     :
 * @props.bsStyle  : 
 * @props.bsSize   :
 * @props.outline  :
 * @props.icon     :
 * @props.text     :
 * @props.active   :
 * @props.disabled :
 * @props.onClick  :
 */
class APButton extends Base {

	constructor(props) {
		super(props);
	}

	_buildType() {
		return this.props.type ? this.props.type : 'button';
	}

	_buildClass() {
		var clazz = 'ap-button btn';
		clazz += ' btn-' + (this.props.outline ? 'outline' : '') + (this.props.bsStyle || 'secondary');
		if (this.props.bsSize) {
			clazz += ' btn-' + this.props.bsSize;
		}
		if (this.props.active) {
			clazz += ' active';
		}
		if (this.props.block) {
			clazz += ' block';
		}
		return clazz;
	}

	_buildIcon() {
		if (this.props.icon) {
			return (<span className={'glyphicon glyphicon-' + this.props.icon} />);
		}
		return '';
	}

	_buildText() {
		if (this.props.text) {
			return (this.props.text);
		}
		return '';
	}

	_onClick(event) {
		event.preventDefault()
		if (this.props.onClick) {
			this.props.onClick(event);
		}
	}
	
	render() { 
		return(
			<button 
				type={this._buildType()} 
				className={this._buildClass()} 
				disabled={this.props.disabled} 
				onClick={this._onClick.bind(this)}>
				{this._buildIcon()}
				{this._buildText()}
				{this.props.children}
			</button>
	);}
}

export default APButton;