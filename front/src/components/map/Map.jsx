import React from 'react'
import ReactDOM from 'react-dom'

class Map extends React.Component {

  constructor(props) {
    super(props);
	this.test = {
            initialZoom: 12,
            mapCenterLat: 48.856996,
            mapCenterLng: 2.346996,
        };
  }
  
  componentDidMount (rootNode) {
        var mapOptions = {
            center: this.mapCenterLatLng(),
            zoom: this.test.initialZoom
        },
        map = new google.maps.Map(this.refs.myMap, mapOptions);
        var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
        this.setState({map: map});
		console.log(this.state)
    }
  
  mapCenterLatLng () {
        var test = this.test;
        return new google.maps.LatLng(test.mapCenterLat, test.mapCenterLng);
    }
  
  render() {
      return (
		<div ref="myMap" className='map-gic container'></div>
  );
  }
}

export default Map;