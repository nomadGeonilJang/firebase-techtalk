import React, { useState, useEffect }from 'react';

import Router from 'components/Router';
import myfirebase from "firebase/myfirebase";

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState( false );

  useEffect( () => {
    console.log( myfirebase.auth.currentUser );
  }, [] );
  return <Router isLoggedIn={isLoggedIn}/>;
}

export default App;
