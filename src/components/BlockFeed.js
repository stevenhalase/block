import React, { Component } from 'react';
import BlockPost from './BlockPost';
import BlockFeedControls from './BlockFeedControls';

const style = {
  margin: '15px',
  width: '768px',
  overflow: 'hidden',
  display: 'flex',
  flexWrap: 'wrap'
}

class BlockFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      displayedPosts: [],
      dateSortDescending: true
    }

    this.props.apiservice.getPosts()
      .then(posts => {

        this.setState({
          posts: posts,
          displayedPosts: this.sortPosts(posts).slice(0,12)
        }, this.sortDisplayedPosts);
        this.attachInfiniteScroll();
      })

    this.sortDisplayedPosts = this.sortDisplayedPosts.bind(this);
    this.sortPosts = this.sortPosts.bind(this);
    this.handleDateToggle = this.handleDateToggle.bind(this);
    this.attachInfiniteScroll = this.attachInfiniteScroll.bind(this);
    this.loadMorePosts = this.loadMorePosts.bind(this);
  }
  render() {
    return (
      <div className="BlockFeed" style={style}>
        <BlockFeedControls descending={this.state.dateSortDescending} handledatetoggle={this.handleDateToggle} />
        {this.state.displayedPosts.map((post, i) => {   
           return (<BlockPost post={post} key={i} />) 
        })}
      </div>
    );
  }
  sortDisplayedPosts() {
    let displayedPosts = this.state.displayedPosts;
    displayedPosts.sort((a, b) => {
      if (this.state.dateSortDescending) {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    })
    this.setState({displayedPosts});
  }
  sortPosts(posts) {
    var sortedPosts = posts;
    sortedPosts.sort((a, b) => {
      if (this.state.dateSortDescending) {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    })
    return sortedPosts;
  }
  handleDateToggle() {
    this.setState({dateSortDescending: !this.state.dateSortDescending}, this.sortDisplayedPosts);
  }
  attachInfiniteScroll() {
    let container = document.querySelector('.BlockPageContainer');
    container.addEventListener('scroll', () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        this.loadMorePosts();
      }
    });
  }
  loadMorePosts() {
    let currentDisplayedLength = this.state.displayedPosts.length;
    let totalLength = this.state.posts.length;
    let totalRemaining = totalLength - currentDisplayedLength;
    if (totalRemaining > 0) {
      let addLength = totalRemaining >= 12 ? 12 : totalRemaining
      let displayedPosts = this.state.displayedPosts;
      let allPosts = this.sortPosts(this.state.posts);
      displayedPosts = displayedPosts.concat(allPosts.slice(currentDisplayedLength, currentDisplayedLength + addLength))
      this.setState({displayedPosts});
    }
  }
}

export default BlockFeed;
