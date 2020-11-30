import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Table from './Table';

import * as usersActions from '../../actions/usersActions';

class Users extends Component {
  componentDidMount() {
    if (!this.props.users.length) this.props.getAll();
  }

  ponerContenido = () => {
    const { loading, error } = this.props;
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <Fatal mensaje={error} />;
    }
    return <Table />;
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Usuarios</h1>
        {this.ponerContenido()}
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
};

export default connect(mapStateToProps, usersActions)(Users);
