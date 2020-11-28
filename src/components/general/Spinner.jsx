import React from 'react';

import '../../css/Spinner.css';

const Spinner = () => {
  return (
    <div className='center'>
      <div className='lds-grid'>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Spinner;
