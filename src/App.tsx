import React, { useState, useEffect }from 'react';

import Router from 'components/Router';
import myFirebase from 'firebase/myfirebase';
import firebase from 'firebase';

function App() {
  const [ initMyApp, setInitMyApp ] = useState( false );
  const [ isLoggedIn, setIsLoggedIn ] = useState( false );
  const [ userObj, setUserObj ] = useState<firebase.User | null>( null );

  useEffect( () => {
    myFirebase.auth.onAuthStateChanged( user => {
      setInitMyApp( true );
      if( user ) {
        setIsLoggedIn( true );  
        setUserObj( user );
      }
      else setIsLoggedIn( false );
    } );
  }, [] );
  return initMyApp ? <Router isLoggedIn={isLoggedIn} userObj={userObj}/> : <h1>initializing...</h1>;
}

export default App;
