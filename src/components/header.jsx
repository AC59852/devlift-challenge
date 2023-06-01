import React from 'react';
import { Link } from 'react-router-dom';
import { useUser, useAuth } from 'reactfire';

const UserDetails = () => {
  const {data: user} = useUser();
  const auth = useAuth();
  if(user) {
  return (
    <>
      <header className='header'>
        <h2>Logged in as: </h2>
        <p>{user.email}</p>
        <button onClick={() => auth.signOut()}>Sign out</button>
      </header>
    </>
  )
  } else {
    return (
      <>
        <h1>You must be logged in to view tickets</h1>
        <Link to='/login'>Log in</Link>
        <Link to='/signup'>Sign Up</Link>
      </>
    )
  }
}

export default UserDetails;