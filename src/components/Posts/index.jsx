import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usersActions from '../../actions/usersActions';
import * as postsActions from '../../actions/postsActions';

const { getAll: usersGetAll } = usersActions;
const { getByUser: postsGetByUser } = postsActions;

class Posts extends Component {
  async componentDidMount() {
    if (!this.props.usersReducer.users.length) {
      await this.props.usersGetAll();
    }
    await this.props.postsGetByUser(this.props.match.params.key);
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
  postsGetByUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
