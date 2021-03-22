import myFirebase from 'firebase/myfirebase';
import React from 'react';
import { useHistory } from 'react-router';

function Profile() {
  const history = useHistory();
  const handleLogOut = () => {
    myFirebase.auth.signOut();
    history.push( "/" );
  };
  return (
    <div>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}

export default Profile;
