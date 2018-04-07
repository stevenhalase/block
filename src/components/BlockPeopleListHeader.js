import React, { Component } from 'react';

const style = {
  width: '100%',
  display: 'flex',
  padding: '10px',
  fontSize: '12px',
  borderRadius: '4px 4px 0 0',
  borderBottom: '1px solid rgb(233, 235, 238)',
  color: '#716DF9',
  cursor: 'pointer'
}

class BlockPeopleListHeader extends Component {
  render() {
    return (
      <div className="BlockPeopleListHeader" style={style} onClick={this.props.toggleexpand}>
        People List
      </div>
    );
  }
}

export default BlockPeopleListHeader;
