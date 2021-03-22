import React, { useRef, useState, useEffect } from 'react';
import firebase from "firebase";

import myFirebase from 'firebase/myfirebase';
import Post from 'components/Post';
type HomeProps = {
  userObj:firebase.User | null
}

export type PostType ={
  id:string;
  text:string;
  creatorId:string;
  createdAt:number;
}


function Home( { userObj }:HomeProps ) {

  const [ posts, setPosts ] = useState<PostType[]>( [] );
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

    myFirebase.firestore
      .collection( "posts" )
      .onSnapshot( ( snapshot ) => {
        const postList = snapshot.docs.map( doc => ( {
          id: doc.id,
          ...doc.data()
        } ) );
        setPosts( postList as unknown as PostType[] );
      } );
     
  }, [] );
  return (
    <div>
      <form ref={formRef} onSubmit={handlePostUpload}>
        <textarea ref={postRef} cols={30}/>
        <button type="submit">form</button>
      </form>
      {posts.map( ( post ) => <Post key={post.id} post={post} isOwner={userObj?.uid === post.creatorId} /> )}
    </div>
  );
}

export default Home;
