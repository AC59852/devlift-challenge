import React, { useState } from 'react';
import { useFirebaseApp, AuthProvider } from 'reactfire';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Signup = () => {
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
      isSet: false,
    })
  };

  const firebase = useFirebaseApp();
  const auth = getAuth(firebase);

  // Submit function (Create account)
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Sign up code here.
    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(result => {
        console.log(result);
        setUser({
          isSet: true
        })
      })
      .catch(error => {
        setUser({
          ...user,
          error: error.message,
        })
      })
  }

  if(user.isSet) {
    return (
      <>
      <h2>Account created successfully!</h2>
      <Link to="/">Return to tickets</Link>
      </>
    )
  }

  return (
    <section className='login'>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" name="email" onChange={handleChange}/><br />
        <input type="password" placeholder="Password" name="password" onChange={handleChange}/><br />
        <button type="submit">Sign Up</button>
      </form>
      {user.error && <h4 className='login__error'>{user.error}</h4>}
    </section>
  )
};

export default Signup;