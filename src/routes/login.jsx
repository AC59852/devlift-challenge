import React, { useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // User State
  const [user, setUser] = useState({
    email: '',
    password: '',
    error: '',
  });

  // onChange function
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    })
  };

  // Import firebase
  const firebase = useFirebaseApp();
  const auth = getAuth(firebase);

  const navigate = useNavigate();

  // Submit function (Log in user)
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Sign up code here.
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(error => {
        setUser({
          ...user,
          error: error.message,
        })
      })
  } 

  return (
    <section className='login'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" name="email" onChange={handleChange}/><br />
        <input type="password" placeholder="Password" name="password" onChange={handleChange}/><br />
        <button type="submit">Log in</button>
      </form>
      {user.error && <h4 className='login__error'>{user.error}</h4>}
    </section>
  )
};

export default Login;