import React from 'react';

const App = () => {
  return (
    <div className='margen'>
      <table className='tabla'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cristian</td>
            <td>felizpc1@gmail.com</td>
            <td>cristianiniguez.github.io</td>
          </tr>
          <tr>
            <td>Mary</td>
            <td>maryluna@gmail.com</td>
            <td>luna.github.io</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
