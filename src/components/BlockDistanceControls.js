import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import BlockModal from './BlockModal';
import BlockDistanceMap from './BlockDistanceMap';
import BlockDistanceTabSelector from './BlockDistanceTabSelector';

const style = {

}

const controlStyle = {
  color: '#716DF9',
  flex: '0 0 100%',
  margin: '5px',
  display: 'flex',
  cursor: 'pointer',
  fontSize: '12px'
}

const distanceStyle = {
  display: 'flex',
  alignItems: 'center',
  marginRight: '5px',
}

class BlockDistanceControls extends Component {
  constructor(props) {
    super(props);
    let distanceSelections = [
      { name: '1 mile', radius: 1609.3, zoom: 14, selected: false },
      { name: '2 miles', radius: 3218.69, zoom: 13, selected: false },
      { name: '3 miles', radius: 4828.03, zoom: 12, selected: true }
    ];
    this.state = {
      distanceSelections: distanceSelections,
      selectedDistance: distanceSelections.find(selection => { 
        return selection.selected === true;
      })
    }

    this.changeSelectedDistance = this.changeSelectedDistance.bind(this);
  }
  render() {
    return (
      <div className="BlockDistanceControls" style={style}>
        <div style={controlStyle} onClick={() => this.refs.modal.open()}>
          <span style={distanceStyle}>
            Distance ({this.state.selectedDistance.name})
          </span>
          <Ionicon 
            icon="md-funnel" 
            color="#716DF9" 
            fontSize="12px" />
        </div>
        <BlockModal title="Adjust Feed Distance" ref="modal">
          <BlockDistanceTabSelector
            changeselecteddistance={this.changeSelectedDistance}
            distanceselections={this.state.distanceSelections}/>
          <BlockDistanceMap
            selecteddistance={this.state.selectedDistance}
            locationservice={this.props.locationservice} />
        </BlockModal>
      </div>
    );
  }
  changeSelectedDistance(selectedDistance) {
    let distanceSelections = this.state.distanceSelections;
    for (let distanceSelection of distanceSelections) {
      if (selectedDistance.name === distanceSelection.name) {
        distanceSelection.selected = true;
      } else {
        distanceSelection.selected = false;
      }
    }
    this.setState({
      distanceSelections: distanceSelections,
      selectedDistance: distanceSelections.find(selection => { 
        return selection.selected === true;
      })
    })
  }
}

export default BlockDistanceControls;
