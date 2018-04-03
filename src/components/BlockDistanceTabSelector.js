import React, { Component } from 'react';

const style = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '12px',
  color: '#716DF9',
  marginBottom: '5px'
}

const unselectedStyle = {
  padding: '10px',
  borderBottom: '1px solid #716DF9',
  cursor: 'pointer'
}

const selectedStyle = {
  padding: '10px',
  borderBottom: '3px solid #716DF9'
}

class BlockDistanceTabSelector extends Component {
  constructor(props) {
    super(props);

    this.changeSelectedDistance = this.changeSelectedDistance.bind(this);
  }
  render() {
    return (
      <div className="BlockDistanceTabSelector" style={style}>
        {this.props.distanceselections.map((selection, i) => {   
           if (selection.selected) {
            return (
              <div style={selectedStyle} key={i}>
                {selection.name}
              </div>
            );
           } else {
            return (
              <div style={unselectedStyle} name={selection.name} onClick={this.changeSelectedDistance} key={i}>
                {selection.name}
              </div>
            );
           }
        })}
      </div>
    );
  }
  changeSelectedDistance(e) {
    let name = e.currentTarget.getAttribute('name');
    let selectedDistance = this.props.distanceselections.find(el => {
      return el.name === name;
    });
    this.props.changeselecteddistance(selectedDistance);
  }
}

export default BlockDistanceTabSelector;
