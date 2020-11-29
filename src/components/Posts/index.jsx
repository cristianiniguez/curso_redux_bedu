import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usersActions from '../../actions/usersActions';
import * as postsActions from '../../actions/postsActions';

const { getAll: usersGetAll } = usersActions;
const { getAll: postsGetAll } = postsActions;

class Posts extends Component {
  componentDidMount() {
    if (!this.props.usersReducer.users.length) {
      this.props.usersGetAll();
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Publicaciones de -nombre-</h1>
        {this.props.match.params.key}
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer, postsReducer }) => {
  return { usersReducer, postsReducer };
};

const mapDispatchToProps = {
  usersGetAll,
  postsGetAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
