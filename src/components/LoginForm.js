import React from 'react'

function LoginForm({handleLogin,email,password,handleEmail,handlePassword}) {
    return (
        <form className='app__loginForm app__form'>
            <input 
                type='text' 
                id='email'
                name='email'
                className='app__loginEmail input'
                value={email}
                placeholder='Email'
                onChange={handleEmail}
            ></input>
            <input 
                type='password' 
                id='password'
                name='password'
                value={password}
                className='app__loginPassword input'
                placeholder='Password'
                onChange={handlePassword}
            ></input>
            <button onClick={handleLogin} className='app__loginButton button'>Log In</button>
        </form>
    )
}

export default LoginForm
