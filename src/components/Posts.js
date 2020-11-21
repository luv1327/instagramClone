import React,{useState,useEffect} from 'react'
import {db} from '../firebase'
import PostsData from './PostsData'
import {Link} from 'react-router-dom'


function Posts({user,handleLogout}) {
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
      // onSnapshot is a listener
      // if a new document is added to the db it gives me here
      // sorting the posts by timestamps
      db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
        const gettingPosts = snapshot.docs.map(doc=>(
          {
            id : doc.id,
            post : doc.data()
          }
        ))
        setPosts(gettingPosts)
      }) 
  },[])
  const logoStyle = {
    objectFit : 'contain',
    height : '50px',
  }
  const instagramLogo =  <img  style={logoStyle} className='app__instagramLogo' src='https://assets.stickpng.com/images/5a4e432a2da5ad73df7efe7a.png' alt='instagramLogo'></img>
    return (
        <div className='posts__body'>
          <header className='posts__nav'>
          {
            user ? <nav>
              {instagramLogo}
              <div>
              <Link to='/upload' className='posts__links'>Upload</Link>
              <Link  to='/' className='posts__links' onClick={handleLogout}>Log Out</Link>
              </div>
              </nav> : <nav> 
                {instagramLogo}
              <Link to='/' className='posts__links'>Sign Up Or Login To Upload</Link>
              </nav>
          }
          </header>
              {
              posts.map(({id,post})=>(
                      <PostsData
                      key={id}
                      postId={id}
                      user={user}
                      username={post.username}
                      avatarUrl={post.avatarUrl} 
                      imageUrl={post.imageUrl}
                      caption={post.caption}
                    />
                    ))
              }
        </div>
    )
}

export default Posts
