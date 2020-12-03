import React, { Component } from 'react';

class Save extends Component {
  render() {
    return (
      <div>
        <h1>Guardar tarea</h1>
        Usuario id: <input type='number' />
        <br />
        <br />
        Título: <input type='text' />
        <br />
        <br />
        <button>Guardar</button>
      </div>
    );
  }
}

export default Save;
