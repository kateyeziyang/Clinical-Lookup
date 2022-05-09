import React, { useState } from 'react';
import Searching from './Searching';
import Home from './Home';
import Header from './Header';

export default function Page() {
  const [searching, setSearching] = useState(false);

  return (
    <>
      <Header searching={searching} setSearching={setSearching} />
      {searching ? <Searching /> : <Home />}
    </>
  )
}