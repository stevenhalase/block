import React, { Component } from 'react';

const style = {
  height: '300px',
  width: '500px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

class BlockDistanceMapCircle extends Component {
  render() {
    return (
      <div className="BlockDistanceMapCircle" style={style}>
        <svg width={this.props.width+50} height={this.props.height+50} xmlns="http://www.w3.org/2000/svg">
        <g>
          <ellipse strokeOpacity="0.5" ry={this.props.height/2} rx={this.props.width/2} id="svg_1" cy={(this.props.height+50)/2} cx={(this.props.width+50)/2} strokeWidth="5" stroke="#716df9" fill="none"/>
        </g>
        </svg>
      </div>
    );
  }
}

export default BlockDistanceMapCircle;
