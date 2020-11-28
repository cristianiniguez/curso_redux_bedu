import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as usersActions from '../../actions/usersActions';

class Users extends Component {
  componentDidMount() {
    this.props.getAll();
  }

  ponerContenido = () => {
    const { loading, error } = this.props;
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <Fatal mensaje={error} />;
    }
    return (
      <table className='tabla'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>{this.ponerFilas()}</tbody>
      </table>
    );
  };

  ponerFilas = () =>
    this.props.users.map(({ id, name, email, website }) => (
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
        <td>{website}</td>
      </tr>
    ));

  render() {
    console.log(this.props);
    return <div>{this.ponerContenido()}</div>;
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
};

export default connect(mapStateToProps, usersActions)(Users);
