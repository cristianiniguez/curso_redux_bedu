import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      usuarios: [],
    };
  }

  async componentDidMount() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({
      usuarios: data,
    });
  }

  ponerFilas = () =>
    this.state.usuarios.map(({ id, name, email, website }) => (
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
        <td>{website}</td>
      </tr>
    ));

  render() {
    console.log(this.state.usuarios);
    return (
      <div>
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
      </div>
    );
  }
}

export default Users;
