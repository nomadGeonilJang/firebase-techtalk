import React, { useState } from 'react';
import myFirebase from 'firebase/myfirebase';

type LogInFormState = {
  email:string;
  password:string
}

function Auth() {

  const [ { email, password }, setLogInFormState ] = useState<LogInFormState>( INITALT_LOGIN_FORM_STATE ); 

  const handleLogIn = async ( e:React.FormEvent ) => {
    e.preventDefault();
    try {
      await myFirebase.auth.signInWithEmailAndPassword( email, password );
    } catch ( error ) {
      alert( error.message );
    }finally{
      setLogInFormState( INITALT_LOGIN_FORM_STATE );
    }
  };

  const handleLogInWithSocial = async ( providerName:"GoogleAuthProvider" | "GithubAuthProvider" ) => {
    const provider = new ( myFirebase.firebase.auth as any )[ providerName ]();
    await myFirebase.auth.signInWithPopup( provider );
  };

  const handleChangeForm = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target; 
    setLogInFormState( prev => ( { ...prev, [ name ]: value } ) );
  };

  const handleSignUp = async () => {
    try {
      await myFirebase.auth.createUserWithEmailAndPassword( email, password );
    } catch ( error ) {
      alert( error.message );
    }finally{
      setLogInFormState( INITALT_LOGIN_FORM_STATE );
    }
  };
  
  return (
    <div>
      <form onSubmit={handleLogIn}>
        <input onChange={handleChangeForm} value={email}  name="email" type="email" placeholder="Email" required/>
        <input onChange={handleChangeForm} autoComplete="true" value={password} name="password" type="password" placeholder="Password" required/>
        <input type="submit" value="Log In"/>
      </form> 
      <div>
        <button onClick={handleSignUp}>sign up</button>
        <button onClick={() => {handleLogInWithSocial( "GoogleAuthProvider" );}}>with google</button>
        <button onClick={() => {handleLogInWithSocial( "GithubAuthProvider" );}}>with gitgub</button>
      </div>
    </div>
  );
}


const INITALT_LOGIN_FORM_STATE = {
  email: "",
  password: ""
}; 


export default Auth;
