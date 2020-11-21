import React,{useState,useEffect} from 'react'
import Avatar from  '@material-ui/core/Avatar'
import './Posts.css'
import { db } from '../firebase';
import firebase from 'firebase'


function PostsData(props) {
    const [comments,setComments] = useState([])
    const [comment,setComment] = useState('')
    const {
        username,
        avatarUrl,
        imageUrl,
        caption,
        postId,
        user
    } = props;
    useEffect(()=>{
        if(postId){
            db.collection('posts')
            // passing postId to doc method gives access to individual post Comments
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot=>{ 
                setComments(snapshot.docs.map(doc=>doc.data()))
            })
        }
    },[postId])

    const handleClick = (event)=>{
        event.preventDefault()
        db.collection('posts')
        .doc(postId)
        .collection('comments')
        .add({
            text : comment,
            username : user.displayName,  
            timestamp : firebase.firestore.FieldValue.serverTimestamp()  
        })
        setComment('')
    }
    return (
        <div className='posts__container'>
            <div className='posts__single'>
                    <div className='posts__header'>
                        <div className='posts__avatar'>
                        <Avatar className='posts__avatarImage' alt={username} src={avatarUrl} />
                        </div>
                    <div className='posts__username'>
                        <h3> {username} </h3>
                    </div>
                    </div>
                    <div className='posts__post Posts__bottom'>
                        <img className='posts__image' src={imageUrl} alt='post_image'></img>
                    </div>
                    <div className='posts__caption'>
                        <p><strong> {username} </strong></p>
                        <p> {caption} </p>
                    </div>
                    {
                        comments.map(comment=>(
                            <div className='posts__comments'>
                                <strong>{comment.username} </strong>
                                <p> {comment.text}</p>
                            </div>
                        ))
                    }
                    {user && (
                            <form className='posts__commentForm'>
                                <input
                                className='posts__comment'
                                type='text'
                                placeholder='Add A Comment'
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}
                                ></input>
                                <button 
                                className='posts__commentBtn'
                                disabled={!comment} 
                                type='submit' 
                                onClick={handleClick}
                                >Add</button>
                            </form>
                    )}
                </div>
            </div>
    )
}

export default PostsData
