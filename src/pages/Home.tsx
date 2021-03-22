import React, { useRef, useState, useEffect } from 'react';
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";

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
  attachmentUrl?:string
}


function Home( { userObj }:HomeProps ) {

  const [ attachment, setAttachment ] = useState( "" );
  const [ posts, setPosts ] = useState<PostType[]>( [] );
  const postRef = useRef<HTMLTextAreaElement>( null );
  const formRef = useRef<HTMLFormElement>( null );
  

  const handlePostUpload = async  ( e:React.FormEvent ) => {
    e.preventDefault();

    const attachmentRef = myFirebase.storage.ref().child( `${userObj?.uid}/${uuidv4()}` );
    const response = await attachmentRef.putString( attachment, "data_url" ); //put(file) 통째로! or
    const attachmentUrl =  await response.ref.getDownloadURL(); 


    myFirebase.firestore.collection( "posts" ).add( {
      text: postRef.current!.value,
      createdAt: Date.now(),
      creatorId: userObj?.uid,
      attachmentUrl
    } );
    formRef.current!.reset();
    setAttachment( "" );
  };

  const handleChangeFile = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    const file = e.target.files![ 0 ];
    const reader = new FileReader();
    reader.onloadend = ( done ) => {
      const imageString = ( done.currentTarget as FileReader ).result as string;
      setAttachment( imageString );
    };
    reader.readAsDataURL( file );
  };

  const handleClearPreview = () => setAttachment( "" );

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
        <button type="submit">Post</button>
        <input type="file" accept="image/*" onChange={handleChangeFile}/>
        {attachment && (
          <div>
            <img src={attachment} width="50px" alt="preview"/>
            <button type="button" onClick={handleClearPreview}>Clear</button>
          </div>
        )}
      </form>
      {posts.map( ( post ) => <Post key={post.id} post={post} isOwner={userObj?.uid === post.creatorId} /> )}
    </div>
  );
}

export default Home;
