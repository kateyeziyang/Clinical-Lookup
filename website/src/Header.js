import React from 'react';
import './Home.css';
import Switch from '@mui/material/Switch';


export default function Header(props) {
  const {searching, setSearching} = props;

  return (
    <div className='Title'>
        <h1>Clinical LookUp</h1>
        <div>
          <Switch checked={searching} onChange={() =>{setSearching(!searching)}} name="search" />
        </div>
    </div>
  )
}