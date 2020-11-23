import React from 'react'

function SignInForm(props) {
    const   {handleUsername,
            handleSignUp,
            username,
            email,
            password,
            handleEmail,
            handlePassword} = props
    return (
        <form className='app__signinForm app__form'>
            <input 
            type='text' 
            id='email'
            name='email'
            className='app__signInEmail input'
            value={email}
            placeholder='Email'
            onChange={handleEmail}
            ></input>
            <input 
            type='text'
            id='username'
            name='username'
            value={username}
            className='app__signInUsername input' 
            placeholder='Username'
            onChange={handleUsername}
            ></input>
            <input 
            type='password' 
            id='password'
            name='password'
            value={password}
            className='app__signInPassword input'
            placeholder='Password'
            onChange={handlePassword}
            ></input>
            <button className='app__signInButton button' onClick={handleSignUp}>Sign In</button>
        </form>
    )
}

export default SignInForm
