import React, { Component } from 'react';
import BlockAvatar from './BlockAvatar';
import Ionicon from 'react-ionicons'

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px'
}

const detailContainer = {
  display: 'flex',
  alignItems: 'center'
}

const nameContainer = {
  marginLeft: '5px',
  fontSize: '12px',
}

const actionContainer = {

}

const messageButton = {
  borderRadius: '4px',
  backgroundColor: '#716DF9',
  color: '#FFF',
  border: 'none',
  padding: '5px',
  fontSize: '12px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

class BlockPeopleListPerson extends Component {
  render() {
    return (
      <div className="BlockPeopleListPerson" style={style}>
        <div style={detailContainer}>
          <BlockAvatar imagesrc={'https://robohash.org/fugitcorruptiexercitationem.bmp?size=50x50&set=set1'} size={25} />
          <div style={nameContainer}>{this.props.personname}</div>
        </div>
        <div style={actionContainer}>
          <button style={messageButton}>
            <Ionicon icon="ios-text-outline" color="#FFFFFF" fontSize="16px" />
          </button>
        </div>
      </div>
    );
  }
}

export default BlockPeopleListPerson;
