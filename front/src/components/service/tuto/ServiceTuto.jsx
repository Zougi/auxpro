import React from 'react'
import { Carousel, ResponsiveEmbed, Grid, Row, Col, Button } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'

let TUTO_ITEMS = [
	{ src: './../../../../../assets/img/tutoservices1.JPG' },
	{ src: './../../../../../assets/img/tutoservices2.JPG' },
	{ src: './../../../../../assets/img/tutoservices3.JPG' },
	{ src: './../../../../../assets/img/tutoservices4.JPG' },
	{ src: './../../../../../assets/img/tutoservices5.JPG' }
];

class ServiceTuto extends React.Component {

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
		Dispatcher.issue('NAVIGATE', { path: '/sad' });
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
		<div className='container'>
			<br/>
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
						<Button bsStyle="success" bsSize='large' block onClick={this.onClose.bind(this)}>Passer</Button>
					</Col>
				</Row>
			</Grid>
			<br/>
		</div>
	);}
}
export default ServiceTuto;