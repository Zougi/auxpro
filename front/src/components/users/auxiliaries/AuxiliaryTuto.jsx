// react modules
import React from 'react';
// react-bootstrap modules
import { Carousel } from 'react-bootstrap';

import { IndexLink, Link } from 'react-router'

class AuxiliaryTuto extends React.Component {

	render() { return (
		<div className='container'>
			<Carousel>
				<Carousel.Item>
				  <img width={1200} height={500} alt='1200x500' src='./../../../../assets/img/tutoaux1.JPG'/>
				</Carousel.Item>
				<Carousel.Item>
				  <img width={1200} height={500} alt='1200x500' src='./../../../../assets/img/tutoaux2.JPG'/>
				</Carousel.Item>
				<Carousel.Item>
				  <img width={1200} height={500} alt='1200x500' src='./../../../../assets/img/tutoaux3.JPG'/>
				</Carousel.Item>
				<Carousel.Item>
				  <img width={1200} height={500} alt='1200x500' src='./../../../../assets/img/tutoaux4.JPG'/>
				</Carousel.Item>
				<Carousel.Item>
				  <img width={1200} height={500} alt='1200x500' src='./../../../../assets/img/tutoaux5.JPG'/>
				</Carousel.Item>
				<Carousel.Item>
				  <img width={1200} height={500} alt='1200x500' src='./../../../../assets/img/tutoaux6.JPG'/>
				</Carousel.Item>
			  </Carousel>
			<div className='row'>
				<div className='col-sm-3'></div>
				<div className='col-sm-3'></div>
				<div className='col-sm-3'></div>
				<div className='col-sm-3'>
					<Link to='/profileprompt' className='btn btn-success'>Passer</Link>
				</div>
			</div>
		</div>
	);}
}

export default AuxiliaryTuto;