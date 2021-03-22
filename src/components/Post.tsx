import React, { useState } from 'react';

import { PostType } from 'pages/Home';
import myFirebase from 'firebase/myfirebase';

type PostProps = {
    post:PostType
    isOwner:boolean;
}

function Post( { post, isOwner }:PostProps ) {

  const [ isEdit, setIsEdit ] = useState( false );
  const [ editPost, setEditPost ] = useState( post.text );

  const handleDeletePost = () => {
    if( window.confirm( "You want to delete post?" ) ){
      myFirebase.firestore.doc( `/posts/${post.id}` ).delete();
    }
  };

  const toggleEdit = () => setIsEdit( !isEdit );

  const handleEditText = ( e:React.ChangeEvent<HTMLInputElement> ) => setEditPost( e.target.value );
  
  const handleUpdatePost = ( e:React.FormEvent ) => {
    e.preventDefault();
    myFirebase.firestore.doc( `/posts/${post.id}` ).update( {
      ...post,
      text: editPost
    } );
    setIsEdit( false );
  };



  return (
    <div>
      { isEdit && (
        <>
          <form onSubmit={handleUpdatePost}>
            <input type="text" value={editPost}  onChange={handleEditText} required/>
            <button type="submit">Update Post</button>
          </form>
          <button onClick={toggleEdit}>cancel</button>
        </>
      )}
      { !isEdit && ( <div>
        {post.attachmentUrl &&  <img src={post.attachmentUrl} alt={"post image"}/>}
        <h4>{post.text}</h4>
      </div> )}
      
      {isOwner && (
        <>
          <button onClick={handleDeletePost}>Delete</button>
          <button onClick={toggleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}

export default Post;
