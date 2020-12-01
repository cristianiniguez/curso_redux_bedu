import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as usersActions from '../../actions/usersActions';
import * as postsActions from '../../actions/postsActions';

const { getAll: usersGetAll } = usersActions;
const { getByUser: postsGetByUser } = postsActions;

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

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.match.params.key}
        {this.putUser()}
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
