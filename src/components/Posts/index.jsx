import React, { Component } from 'react';
import { connect } from 'react-redux';

import Comments from './Comments';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as usersActions from '../../actions/usersActions';
import * as postsActions from '../../actions/postsActions';

const { getAll: usersGetAll } = usersActions;
const { getByUser: postsGetByUser, openClose, getComments } = postsActions;

class Posts extends Component {
  async componentDidMount() {
    const {
      usersGetAll,
      postsGetByUser,
      match: {
        params: { key },
      },
    } = this.props;
    if (!this.props.usersReducer.users.length) {
      await usersGetAll();
    }
    if (this.props.usersReducer.error) {
      return;
    }
    if (!('postsKey' in this.props.usersReducer.users[key])) {
      console.log('getting posts');
      await postsGetByUser(this.props.match.params.key);
    }
  }

  putUser = () => {
    const {
      usersReducer,
      match: {
        params: { key },
      },
    } = this.props;
    if (usersReducer.error) {
      return <Fatal mensaje={usersReducer.error} />;
    }
    if (!usersReducer.users.length || usersReducer.loading) {
      return <Spinner />;
    }
    const name = usersReducer.users[key].name;
    return <h1>Publicaciones de {name}</h1>;
  };

  putPosts = () => {
    const {
      usersReducer,
      usersReducer: { users },
      postsReducer,
      postsReducer: { posts },
      match: {
        params: { key },
      },
    } = this.props;

    if (!users.length) return;
    if (usersReducer.error) return;

    if (postsReducer.loading) {
      return <Spinner />;
    }

    if (postsReducer.error) {
      return <Fatal mensaje={postsReducer.error} />;
    }
    if (!posts.length) return;

    if (!('postsKey' in users[key])) return;

    const { postsKey } = users[key];

    return this.showInfo(posts[postsKey], postsKey);
  };

  showInfo = (posts, postsKey) =>
    posts.map((post, postSubkey) => (
      <div key={post.id} onClick={() => this.showComments(postsKey, postSubkey, post.comments)}>
        <h2 className='post__title'>{post.title}</h2>
        <h3>{post.body}</h3>
        {post.open ? <Comments /> : ''}
      </div>
    ));

  showComments = (postsKey, postSubkey, comments) => {
    this.props.openClose(postsKey, postSubkey);
    if (!comments.length) {
      this.props.getComments(postsKey, postSubkey);
    }
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.putUser()}
        {this.putPosts()}
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer, postsReducer }) => {
  return { usersReducer, postsReducer };
};

const mapDispatchToProps = {
  usersGetAll,
  postsGetByUser,
  openClose,
  getComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
