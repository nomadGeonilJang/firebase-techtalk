import React from 'react';
import { PostType } from 'pages/Home';
import myFirebase from 'firebase/myfirebase';

type PostProps = {
    post:PostType
    isOwner:boolean;
}

function Post( { post, isOwner }:PostProps ) {

  const handleDeletePost = () => {
    if( window.confirm( "You want to delete post?" ) ){
      myFirebase.firestore.doc( `/posts/${post.id}` ).delete();
    }else{
      //   
    }
  };

  return (
    <div>
      <h4>{post.text}</h4>
      {isOwner && (
        <>
          <button onClick={handleDeletePost}>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
}

export default Post;
