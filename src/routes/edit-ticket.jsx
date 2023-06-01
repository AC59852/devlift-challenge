// using a form allow editing of ticket
// use firebase to update the ticket
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore'
import { useFirebaseApp, AuthProvider, useUser } from 'reactfire';
import { getAuth } from 'firebase/auth';
import '../App.css'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/header';

function EditTicket() {
  const { id } = useParams();
  const firestoreInstance = getFirestore(useFirebaseApp());
  const ticketRef = doc(firestoreInstance, 'tickets', id);

  const [ticket, setTicket] = useState({
    name: '',
    employeeNumber: '',
    type: '',
    website: '',
    body: ''
  });

  // load the ticket data based on the id
  const loadTicket = async () => {
    const ticketDoc = await getDoc(ticketRef);
    setTicket(ticketDoc.data());
  }

  // load the ticket on mount
  useEffect(() => {
    loadTicket();
  }, [])

  const editTicket = async (e) => {
    e.preventDefault();
    await updateDoc(ticketRef, ticket);

    // set the updated flag to true
    setTicket({ ...ticket, updated: true });
  }

  const {data: user} = useUser();

   // if the ticket is updated, return new component
   if (ticket.updated) {
    return (
      <div>
        <h1>Ticket updated</h1>
        <Link to={`/ticket/${id}`}>View Ticket</Link>
      </div>
    )
  }

  if(user) {
    return (
      <div className='createTicket'>
        <h1>Edit Ticket</h1>
        <form onSubmit={editTicket} className='createTicket__form'>
          <label>
            Name:
            <input type="text" value={ticket.name} onChange={(e) => setTicket({ ...ticket, name: e.target.value })} />
          </label>
          <label>
            Employee Number:
            <input type="text" value={ticket.employeeNumber} onChange={(e) => setTicket({ ...ticket, employeeNumber: e.target.value })} />
          </label>
          <label>
            Ticket Type:
            <select value={ticket.type} onChange={(e) => setTicket({ ...ticket, type: e.target.value })}>
              <option value="bug">Bug</option>
              <option value="feature">Feature</option>
              <option value="documentation">Documentation</option>
            </select>
          </label>
          <label>
            Website:
            <input type="text" value={ticket.website} onChange={(e) => setTicket({ ...ticket, website: e.target.value })} />
          </label>
          <label>
            Description:
            <textarea value={ticket.body} onChange={(e) => setTicket({ ...ticket, body: e.target.value })} />
          </label>
          <input type="submit" value="Submit" className='createTicket__submit' />
        </form>
        <Link to={`/ticket/${id}`} className='createTicket__back'>Back to ticket</Link>
      </div>
    )
  }

  return (
    <section className='loggedOut'>
      <h1>You must be logged in to view tickets</h1>
      <div className="loggedOut__buttons">
        <Link to='/login' className='loggedOut__btn loggedOut__btn--login'>Log in</Link>
        <Link to='/signup' className='loggedOut__btn loggedOut__btn--signup'>Sign Up</Link>
      </div>
    </section>
  )
}

const UserTicket = () => {
  const firebase = useFirebaseApp();
  const auth = getAuth(firebase);
    return (
      <AuthProvider sdk={auth}>
        <Header />
        <EditTicket />
      </AuthProvider>
    )
}

export default UserTicket