import React,{useState,useEffect} from 'react'
import {auth} from '../firebase'
import PostUpload from './PostUpload'

function Forms() {
    const [email,setEmail] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [user,setUser] = useState(null)
    const [loginForm,setLoginForm] = useState(false)

    useEffect(()=>{
        // auth is listnening to the onAuthStateChanged method
         const isUser = auth.onAuthStateChanged(authUser=>{
            authUser ? setUser(authUser) : setUser(null)
        })
        return isUser
      },[user,username])

      const handleSignUp = (event)=>{
        // we have this otherwise its gonna refresh the page after submitting
        event.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
        .then(createdUser=>{
    
          if(createdUser.displayName){
            // dont update anything
            return {
              message: 'User Already Has A Username'
            }
          }else {
            return createdUser.user.updateProfile({
              displayName : username
            })
          }
        })
        .then(()=>window.location = '/posts')
        .catch(err=>alert(err.message));
      }
      const handleLogin = (event)=>{
        event.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
        .then(()=>{
          setEmail(null)
          setPassword(null)
        })
        .then(()=>window.location = '/posts')
        .catch(err=>alert(err.message))
      }
      const buttonText = loginForm ? <span>Sign Up</span> : <span>Log In</span>
    return (
        <div>
          {         
          user && user?.displayName ? (
            <div className=''>
              <button onClick={()=>auth.signOut()}>Logout</button>
              <PostUpload username={user.displayName}/>
            </div>
          ) : (
            <div className='app__form'>
            <form className='app__signupForm'>
            {
              loginForm ? (<div>
                <form>
                <input 
                  type='text' 
                  id='email'
                  name='email'
                  value={email}
                  placeholder='Email'
                  onChange={(event)=>setEmail(event.target.value)}
                ></input>
                <input 
                  type='password' 
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Password'
                  onChange={(event)=>setPassword(event.target.value)}
                ></input>
                <button onClick={handleLogin}>Log In</button>
                </form>
              </div>): (<div>
                <form>
                <input 
                  type='text' 
                  id='email'
                  name='email'
                  value={email}
                  placeholder='Email'
                  onChange={(event)=>setEmail(event.target.value)}
                ></input>
                <input 
                  type='text'
                  id='username'
                  name='username'
                  value={username}
                  placeholder='Username'
                  onChange={(event)=>setUsername(event.target.value)}
                ></input>
                <input 
                  type='password' 
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Password'
                  onChange={(event)=>setPassword(event.target.value)}
                ></input>
                <button onClick={handleSignUp}>Sign In</button>
                </form>
              </div>)
            }
            {/* {checkingLoginAndLogout()}  */}
            </form>
            <button onClick={()=>setLoginForm(prevState=>!prevState)}>{buttonText}</button>
            </div>
          )
          }
        </div>
    )
}

export default Forms
