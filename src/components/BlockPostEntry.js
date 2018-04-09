import React, { Component } from 'react';

const style = {
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '4px',
  boxShadow: '1px 3px 3px rgba(0,0,0,0.1)',
  margin: '0 0 20px'
}

const input = {
  flex: '0 0 80%',
  borderRadius: '4px 4px 0 0',
  padding: '10px',
  fontFamily: "'Roboto', sans-serif",
  resize: 'none',
  lineHeight: '1.5',
  overflow: 'hidden',
  border: 'none'
}

const postButton = {
  flex: '0 0 20%',
  borderRadius: '0 0 4px 4px',
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
    this.validate = this.validate.bind(this);
  }
  render() {
    return (
      <div className="BlockPostEntry" style={style}>
        <textarea rows="1" id="post-entry-input" placeholder="Write a post..." 
          style={input} onChange={this.handleInputChange}></textarea>
        <button type="submit" style={postButton} onClick={this.validate}>POST</button>
      </div>
    );
  }
  handleInputChange(e) {
    e.target.style.height = "5px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }
  validate() {
    let input = document.getElementById('post-entry-input');
    let postContent = input.value;
    if (postContent.length) {
      let post = {
        User: this.props.user._id,
        Date: new Date(),
        Content: postContent
      }
      this.props.apiservice.submitPost(post)
        .then(post => {
          input.value = '';
          this.props.newpost();
          this.props.showalert('Post created successfully...');
        })
        .catch(error => {
          console.log(error);
          this.props.showalert('Post creation failed...');
        })
    } else {
      this.props.showalert('Post cannot be empty...');
    }
  }
}

export default BlockPostEntry;
