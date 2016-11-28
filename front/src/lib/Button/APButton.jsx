import React from 'react'
import Base from 'lib/Base'
// Style
import './ap-buttons.css'

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
export default class APButton extends Base {

	constructor(props) {
		super(props);
	}


	// Callback functions //
	// --------------------------------------------------------------------------------

	_onClick(event) {
		event.preventDefault()
		if (this.props.onClick) {
			this.props.onClick(event)
		}
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

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
		if (this.props.disabled) {
			clazz += ' disabled';
		}
		if (this.props.block) {
			clazz += ' btn-block';
		}
		return clazz;
	}
	_buildClassBg() {
		var clazz = 'ap-button-bg';
		
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

	render() { return (
		<button
			type={this._buildType()}
			className={this._buildClass()}
			disabled={this.props.disabled}
			onClick={this._onClick.bind(this)}>
			<div className='ap-button-content'>
				{this._buildIcon()}
				{this._buildText()}
				{this.props.children}
			</div>
		</button>
	);}
}