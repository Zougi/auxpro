import React from 'react'
import Base from '../Base.jsx';

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
		var clazz = 'btn';
		clazz += ' btn-' + (this.props.outline ? 'outline' : '') + (this.props.bsStyle || 'secondary');
		if (this.props.bsSize) {
			clazz += ' btn-' + this.props.bsSize;
		}
		if (this.props.active) {
			clazz += ' active';
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
		if (this.props.onClick) {
			this.props.onClick(event);
		}
	}
	
	render() { 
		return(
			<button type={this._buildType()} className={this._buildClass()} disabled={this.props.disabled} onClick={this._onClick.bind(this)}>
				{this._buildIcon()}
				{this._buildText()}
			</button>
	);}
}

export default APButton;