import React from 'react';
// react-bootstrap modules
import { Carousel, ResponsiveEmbed, Grid, Row, Col, Button } from 'react-bootstrap';
// react-router-bootstrap modules
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

class AuxiliaryTuto extends React.Component {

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
									<embed type='image/jpg' src='./../../../../assets/img/tutoaux1.JPG'/>
								</ResponsiveEmbed>
							</Carousel.Item>
							<Carousel.Item>
							  <ResponsiveEmbed a4by3>
									<embed type='image/jpg' src='./../../../../assets/img/tutoaux2.JPG'/>
								</ResponsiveEmbed>
							</Carousel.Item>
							<Carousel.Item>
							  <ResponsiveEmbed a4by3>
									<embed type='image/jpg' src='./../../../../assets/img/tutoaux3.JPG'/>
								</ResponsiveEmbed>
							</Carousel.Item>
							<Carousel.Item>
							  <ResponsiveEmbed a4by3>
									<embed type='image/jpg' src='./../../../../assets/img/tutoaux4.JPG'/>
								</ResponsiveEmbed>
							</Carousel.Item>
							<Carousel.Item>
							  <ResponsiveEmbed a4by3>
									<embed type='image/jpg' src='./../../../../assets/img/tutoaux5.JPG'/>
								</ResponsiveEmbed>
							</Carousel.Item>
							<Carousel.Item>
							  <ResponsiveEmbed a4by3>
									<embed type='image/jpg' src='./../../../../assets/img/tutoaux6.JPG'/>
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

export default AuxiliaryTuto;