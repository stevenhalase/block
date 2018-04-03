import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { meters2ScreenPixels } from 'google-map-react/utils';
import BlockDistanceMapCircle from './BlockDistanceMapCircle';

const style = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const mapWrapperStyle = {
  height: '300px',
  width: '500px',
  pointerEvents: 'none'
}

class BlockDistanceMap extends Component {
  render() {
    let defaultMapOptions = { disableDefaultUI: true };
    let center = {
      lat: parseFloat(this.props.locationservice.location ? 
        this.props.locationservice.location.latitude :
        '38.312142'),
      lng: parseFloat(this.props.locationservice.location ?
        this.props.locationservice.location.longitude :
        '-99.846854')
    };
    let radius = this.props.selecteddistance.radius;
    let zoom = this.props.selecteddistance.zoom;
    let scaledCircle = this.getScaledCircle(center, radius, zoom);
    let width = scaledCircle.w;
    let height = scaledCircle.h;
    return (
      <div className="BlockDistanceMap" style={style}>
        <div style={mapWrapperStyle}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyA93slNNXAhimGvDmWolTweIyx4HVJb4H4' }}
            center={center}
            zoom={zoom}
            options={defaultMapOptions}
          >
            <BlockDistanceMapCircle width={width} height={height} />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
  getScaledCircle(center, radius, zoom) {
    return meters2ScreenPixels(radius, { lat: center.lat, lng: center.lng }, zoom);
  }
}

export default BlockDistanceMap;
