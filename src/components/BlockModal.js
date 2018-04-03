import React, { Component } from 'react';
import Ionicon from 'react-ionicons';

const openStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const closedStyle = {
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
}

const modalBackdropStyle = {
  position: 'fixed',
  left: '0',
  top: '0',
  width: '100vw',
  height: '100vh',
  zIndex: '100',
  backgroundColor: 'rgba(0,0,0,0.5)'
}

const modalWrapperStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  minWidth: '50vw',
  maxWidth: '80vw',
  display: 'flex',
  flexWrap: 'wrap',
  zIndex: '101',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  padding: '15px'
}

const modalHeaderStyle = {
  flex: '0 0 100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '25px',
  borderBottom: '1px solid #e9ebee'
}

const modalTitleStyle = {
  margin: '0',
  fontWeight: '300',
  fontSize: '16px'
}

const modalCloseButtonStyle = {
  float: 'right',
  cursor: 'pointer'
}

const modalContentStyle = {
  flex: '1',
  minHeight: '150px',
  padding: '15px'
}

class BlockModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  render() {
    if (this.state.open) {
      return (
        <div className="BlockModal" style={this.state.open ? openStyle : closedStyle}>
          <div style={modalWrapperStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>{this.props.title}</h3>
              <Ionicon 
                icon="ios-close" 
                color="#716DF9" 
                fontSize="32px"
                style={modalCloseButtonStyle}
                onClick={this.close} />
            </div>
            <div style={modalContentStyle}>
              {this.props.children}
            </div>
          </div>
          <div style={modalBackdropStyle} onClick={this.close}></div>
        </div>
      );
    } else {
      return (
        <div className="BlockModal" style={this.state.open ? openStyle : closedStyle}>
        </div>
      );
    }
  }
  open() {
    this.setState({ open: true });
  }
  close() {
    this.setState({ open: false });
  }
}

export default BlockModal;