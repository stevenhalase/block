import React, { Component } from 'react';

const style = {
  width: '768px',
  overflow: 'hidden',
  display: 'flex',
  borderRadius: '4px',
  boxShadow: '1px 3px 3px rgba(0,0,0,0.1)',
  margin: '0 20px 20px 20px'
}

const input = {
  flex: '0 0 80%',
  borderRadius: '4px 0 0 4px',
  padding: '10px',
  fontFamily: "'Roboto', sans-serif",
  resize: 'none',
  lineHeight: '1.5',
  overflow: 'hidden'
}

const postButton = {
  flex: '0 0 20%',
  borderRadius: '0 4px 4px 0',
  backgroundColor: '#716DF9',
  color: '#FFF',
  border: 'none',
  padding: '10px',
  cursor: 'pointer'
}

class BlockPostEntry extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  render() {
    return (
      <div className="BlockPostEntry" style={style}>
        <textarea rows="1" id="post-entry-input" placeholder="Write a post..." 
          style={input} onChange={this.handleInputChange}></textarea>
        <button type="submit" style={postButton}>POST</button>
      </div>
    );
  }
  handleInputChange(e) {
    e.target.style.height = "5px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }
}

export default BlockPostEntry;
