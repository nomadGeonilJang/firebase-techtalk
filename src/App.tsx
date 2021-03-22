import React, { useState, useEffect }from 'react';

import Router from 'components/Router';
import myFirebase from 'firebase/myfirebase';

function App() {
  const [ initMyApp, setInitMyApp ] = useState( false );
  const [ isLoggedIn, setIsLoggedIn ] = useState( false );

  useEffect( () => {
    myFirebase.auth.onAuthStateChanged( user => {
      setInitMyApp( true );
      if( user ) setIsLoggedIn( true );  
      else setIsLoggedIn( false );
    } );
  }, [] );
  return initMyApp ? <Router isLoggedIn={isLoggedIn} /> : <h1>initializing...</h1>;
}

export default App;
