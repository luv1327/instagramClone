import './App.css';
import {auth} from './firebase'
import {useState,useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import React from 'react'
// import Forms from './components/Forms'
import Posts from './components/Posts'
import PostUpload from './components/PostUpload'
import LoginForm from './components/LoginForm'
import SignInForm from './components/SignInForm'

function App() {
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
  const  handleLogin =  (event)=>{
    event.preventDefault()
    auth.signInWithEmailAndPassword(email,password)
    .then(()=>{
      setEmail(null)
      setPassword(null)
    })
    .then(()=>window.location = '/posts')
    .catch(err=>alert(err.message))
  }

  const handleUsername = (event)=>{
    setUsername(event.target.value)
  }

  const handleEmail = (event)=>{
    setEmail(event.target.value)
  }
  
  const handlePassword = (event)=>{
    setPassword(event.target.value)
  }

  const handleLogout = ()=>{
     auth.signOut()
    window.location = '/'
  }
  const isLogin = loginForm ? <LoginForm 
                                email={email} 
                                password={password} 
                                handleEmail={handleEmail} 
                                handlePassword={handlePassword} 
                                handleLogin={handleLogin}/> 
                              :<SignInForm 
                                email={email} 
                                handleUsername={handleUsername}
                                username={username}
                                password={password} 
                                handleEmail={handleEmail} 
                                handlePassword={handlePassword} 
                                handleSignUp={handleSignUp}
                              /> 
  const buttonText = loginForm ? 
                    <div className="app__loginAndSignUpButtonAndText" >
                      {isLogin}
                      <div className="app__formOption">
                        <p className='app__loginAndSignUpText'>Create A New Account ?</p>
                        <button className='app__loginAndSignUpButton button' onClick={()=>setLoginForm(prevState=>!prevState)}>Sign Up</button>
                      </div>
                    </div> 
                    :<div className="app__loginAndSignUpButtonAndText">
                      {isLogin}
                      <div className='app__formOption'>
                        <p className='app__loginAndSignUpText'>Already Have An Account ?</p>
                        <button className='app__loginAndSignUpButton button' onClick={()=>setLoginForm(prevState=>!prevState)}>Log In</button>
                      </div>
                    </div>
  const isUser = !user && (
    <div className='app__formContainer'>
    <img className='app__instagramLogo' src='https://assets.stickpng.com/images/5a4e432a2da5ad73df7efe7a.png' alt='instagramLogo'></img>
    <div className='app__wholeForm'>{buttonText} </div>
    </div> 
  )
  return (
    <Router>
        <div className="App">
          <Route exact path='/'>
          <div className="app__formBody">
             {isUser}
          </div>
           </Route>
          <Route  exact path='/posts'>
            <Posts  handleLogout={handleLogout} user={user}/>
          </Route>
            <Route exact path='/upload'>
              {
                user  ? <PostUpload username={user?.displayName ? user.displayName : user.email}/> : <div><h3>Login Or Sign Up To Upload</h3></div>
              }
          </Route> 
        </div>
    </Router>
  );
}

export default App;
