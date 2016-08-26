// lib modules
import React from 'react';
import { Carousel, ResponsiveEmbed, Grid, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

class ServicesTuto extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            index: 0,
            direction: null
        };
	}

	handleSelect(selectedIndex, e) {
		this.setState({
			index: selectedIndex,
			direction: e.direction
		});
	}

	render() { return (
		<div className='container'><br/>
			<Grid>
				<Row>
					<Col smOffset={1} sm={10} mdOffset={2} md={8}>
						<Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect.bind(this)}>
							<Carousel.Item>
								<ResponsiveEmbed a4by3>
									<embed type='image/jpg' src='./../../../../assets/img/tutoservices1.JPG'/>
								</ResponsiveEmbed>
							</Carousel.Item>
							<Carousel.Item>
							  <ResponsiveEmbed a4by3>
									<embed type='image/jpg' src='./../../../../assets/img/tutoservices2.JPG'/>
								</ResponsiveEmbed>
							</Carousel.Item>
							<Carousel.Item>
							  <ResponsiveEmbed a4by3>
									<embed type='image/jpg' src='./../../../../assets/img/tutoservices3.JPG'/>
								</ResponsiveEmbed>
							</Carousel.Item>
							<Carousel.Item>
							  <ResponsiveEmbed a4by3>
									<embed type='image/jpg' src='./../../../../assets/img/tutoservices4.JPG'/>
								</ResponsiveEmbed>
							</Carousel.Item>
							<Carousel.Item>
							  <ResponsiveEmbed a4by3>
									<embed type='image/jpg' src='./../../../../assets/img/tutoservices5.JPG'/>
								</ResponsiveEmbed>
							</Carousel.Item>			
						  </Carousel>
					  </Col>
				  </Row>
				  <br/>
				  <Row>
					<Col smOffset={8} sm={3} mdOffset={7} md={3} className="left">
						<Button bsStyle="success" bsSize='large' block onClick={this.props.onClose}>Passer</Button>
					</Col>
				</Row>
			</Grid>
			<br/>
		</div>
	);}
}

export default ServicesTuto;