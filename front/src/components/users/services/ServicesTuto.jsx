// Import React Core
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { IndexLink, Link } from 'react-router'

class ServicesTuto extends React.Component {

	render() { return (
		<div className="container">
			<Carousel>
				<Carousel.Item>
				  <img width={1200} height={500} alt="1200x500" src="./../../../../assets/img/tutoservices1.JPG"/>
				</Carousel.Item>
				<Carousel.Item>
				  <img width={1200} height={500} alt="1200x500" src="./../../../../assets/img/tutoservices2.JPG"/>
				</Carousel.Item>
				<Carousel.Item>
				  <img width={1200} height={500} alt="1200x500" src="./../../../../assets/img/tutoservices3.JPG"/>
				</Carousel.Item>
				<Carousel.Item>
				  <img width={1200} height={500} alt="1200x500" src="./../../../../assets/img/tutoservices4.JPG"/>
				</Carousel.Item>
				<Carousel.Item>
				  <img width={1200} height={500} alt="1200x500" src="./../../../../assets/img/tutoservices5.JPG"/>
				</Carousel.Item>
			  </Carousel>
			  <div className="row">
				<div className="col-sm-3"></div>
				<div className="col-sm-3"></div>
				<div className="col-sm-3"></div>
				<div className="col-sm-3">
					<Link to="/profileprompt" className="btn btn-success">Passer</Link>
				</div>
			</div>
		</div>
	);}
}

export default ServicesTuto;