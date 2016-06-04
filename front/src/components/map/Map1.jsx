import React from 'react'
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

class Map extends React.Component {

  constructor(props) {
    super(props);
	this.state = {
    markers: [{
      position: {
			lat: 25.0112183,
			lng: 121.52067570000001,
		  },
		  key: `Taiwan`,
		  defaultAnimation: 2,
		}],
	  };
  }

  render() {
      return (
	<section style={{height: "100%"}}>
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props.containerElementProps}
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
            onClick={this.props.onMapClick}
          >
            {this.state.markers.map((marker, index) => {
              return (
                <Marker
                  {...marker}
                  onRightclick={() => this.props.onMarkerRightclick(index)} />
              );
            })}
          </GoogleMap>
        }
      />
    </section>
  );
  }
}

export default Map;