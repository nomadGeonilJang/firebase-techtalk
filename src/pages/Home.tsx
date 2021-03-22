import React, { useRef, useState, useEffect } from 'react';
import firebase from "firebase";

import myFirebase from 'firebase/myfirebase';
type HomeProps = {
  userObj:firebase.User | null
}
function Home( { userObj }:HomeProps ) {

  const [ posts, setPosts ] = useState<any>( [] );
  const postRef = useRef<HTMLTextAreaElement>( null );
  const formRef = useRef<HTMLFormElement>( null );

  const handlePostUpload = ( e:React.FormEvent ) => {
    e.preventDefault();
    myFirebase.firestore.collection( "posts" ).add( {
      text: postRef.current!.value,
      createdAt: Date.now(),
      creatorId: userObj?.uid
    } );
    formRef.current!.reset();
  };

  useEffect( () => {
    // myFirebase.firestore.collection( "posts" ).get().then( snapshot => {
    //   snapshot.forEach( doc => {
    //     const newPost = {
    //       ...doc.data(),
    //       id: doc.id
    //     };
    //     setPosts( ( prev:any ) => [ newPost, ...prev, ] );
    //   } );
    // } );

    myFirebase.firestore
      .collection( "posts" )
      .onSnapshot( ( snapshot ) => {
        const postList = snapshot.docs.map( doc => ( {
          id: doc.id,
          ...doc.data()
        } ) );
        setPosts( postList );
      } );
     
  }, [] );
  return (
    <div>
      <form ref={formRef} onSubmit={handlePostUpload}>
        <textarea ref={postRef} cols={30}/>
        <button type="submit">form</button>
      </form>
      {posts.map( ( item:any ) => <div key={item.id}>{item.text}</div> )}
    </div>
  );
}

export default Home;
