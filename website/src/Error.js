import React from 'react';
import ErrorLogo from './empty.png';
import './Home.css';

export default function Error (props) {

  return (
    <div className='ErrorWrapper'>
      <img alt='error' src={ErrorLogo} />
      <div>Nothing, Search Again</div>
    </div>
  )

}