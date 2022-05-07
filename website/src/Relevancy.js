import React from 'react';
import './Home.css'

export default function Relevancy(props) {
  let stars = [];
  for (let i = 0; i < props.num; i++) {
    stars.push(<img alt='star' src="https://img.icons8.com/material-outlined/24/000000/star--v2.png"/>);
  }
  return (
    <div className='stars'>
      {stars}
    </div>
  )
}