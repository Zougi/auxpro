import React from 'react'
import ReactDOM from 'react-dom'
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

class Map extends React.Component {

  constructor(props) {
    super(props);
  }

   componentDidMount() {
		var latlng = new google.maps.LatLng(46.779231, 6.659431);
			var options = {
				center: latlng,
				zoom: 19,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		var input = this.refs.myMap;
		var carte = new google.maps.Map(input, options);
		console.log(carte);
   }
  
  render() {
      return (
		<div style="width:100%; height:100%"><div ref="myMap"></div></div>
  );
  }
}

export default Map;