import React from 'react'
import './Posts.css'
import Avatar from  '@material-ui/core/Avatar'

function Tests(props) {
    const {
        username,
        avatarUrl,
        postsImageUrl,
        caption
    } = props;
    return (
        <div className='posts__container'>
            <div className='posts__header'>
                <div className='posts__avatar'>
                   <Avatar className='posts__avatarImage' alt={username} src={avatarUrl} />
                </div>
               <div className='posts__username'>
                   <h3> {username} </h3>
               </div>
            </div>
            <div className='posts__post'>
            <img className='posts__image' src={postsImageUrl} alt='post_image'></img>
            </div>
            <div className='posts__caption'>
                <p><strong> {username} </strong> :  {caption} </p>
            </div>
        </div>
    )
}

export default Tests
