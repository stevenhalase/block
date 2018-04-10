import React, { Component } from 'react';
import BlockPeopleListHeader from './BlockPeopleListHeader';
import BlockPeopleListPerson from './BlockPeopleListPerson';

const style = {
  position: 'fixed',
  bottom: '0',
  right: '50px',
  width: '250px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFF',
  borderRadius: '4px 4px 0 0',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px -2px 3px 2px'
}

const listContainer = {
  height: '0',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  jusifyContent: 'center'
}

const expandedListContainer = {
  height: '600px',
  display: 'flex',
  flexDirection: 'column',
  jusifyContent: 'center'
}

class BlockPeopleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }

    this.toggleExpand = this.toggleExpand.bind(this);
  }
  render() {
    return (
      <div className="BlockPeopleList" style={style}>
        <BlockPeopleListHeader toggleexpand={this.toggleExpand} />
        <div style={this.state.expanded ? expandedListContainer : listContainer}>
          {this.props.user.People.map((person, i) => {
            return (
              <BlockPeopleListPerson 
                person={person.User}
                openconversation={this.props.openconversation}
                key={i} />
            )
          })}
        </div>
      </div>
    );
  }
  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }
}

export default BlockPeopleList;
