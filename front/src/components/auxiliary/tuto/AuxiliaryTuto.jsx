import React from 'react';
import { Carousel, ResponsiveEmbed, Grid, Row, Col } from 'react-bootstrap';
// Core modules
import Dispatcher from 'core/Dispatcher'
// Custom components
import { APButton } from 'ap-react-bootstrap'

let TUTO_ITEMS = [
	{ src: './../../../../../assets/img/tutoaux1.JPG' },
	{ src: './../../../../../assets/img/tutoaux2.JPG' },
	{ src: './../../../../../assets/img/tutoaux3.JPG' },
	{ src: './../../../../../assets/img/tutoaux4.JPG' },
	{ src: './../../../../../assets/img/tutoaux5.JPG' },
	{ src: './../../../../../assets/img/tutoaux6.JPG' }
];

class AuxiliaryTuto extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			direction: null
		};
	}


	// Callback functions //
	// --------------------------------------------------------------------------------

	onClose() {
		Dispatcher.issue('NAVIGATE', { path: '/aux' });
	}

	handleSelect(selectedIndex, e) {
		this.setState({
			index: selectedIndex,
			direction: e.direction
		});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildItems() {
		return TUTO_ITEMS.map(function (item, i) {
			return (
				<Carousel.Item key={i}>
					<ResponsiveEmbed a4by3>
						<embed type='image/jpg' src={item.src}/>
					</ResponsiveEmbed>
				</Carousel.Item>
			);
		});
	}

	render() { return (
		<div className='container'><br/>
			<Grid>
				<Row>
					<Col smOffset={1} sm={10} mdOffset={2} md={8}>
						<Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect.bind(this)}>
							{this._buildItems()}
						</Carousel>
					</Col>
				</Row>
				<br/>
				<Row>
					<Col smOffset={8} sm={3} mdOffset={7} md={3} className="left">
						<APButton
							block
							bsSize='large'
							bsStyle='success'
							text='Passer'
							onClick={this.onClose.bind(this)} />
					</Col>
				</Row>
			</Grid>
			<br/>
		</div>
	);}
}
export default AuxiliaryTuto;