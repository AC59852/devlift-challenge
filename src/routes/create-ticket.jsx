// allow for creating a ticket
// use firebase to create the ticket
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore'
import { AuthProvider, useFirebaseApp, useUser } from 'reactfire';
import { getAuth } from 'firebase/auth';
import '../App.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function CreateTicket() {
  // get the firestore instance
  const firestoreInstance = getFirestore(useFirebaseApp());

  // create a reference to the tickets collection
  const ticketsRef = collection(firestoreInstance, 'tickets');

  // create a new ticket
  const [ticket, setTicket] = useState({
    name: '',
    email: '',
    employeeNumber: '',
    type: 'bug',
    website: '',
    body: ''
  });

  // create the ticket
  const createTicket = async (e) => {
    // use firestore auto generated id
    const ticketId = doc(ticketsRef).id;

    // set the id of the ticket and set the email to the user's email
    setTicket({ ...ticket, id: ticketId, created: true });

    e.preventDefault();
    await setDoc(doc(ticketsRef, ticketId), ticket);
  }

  // update the ticket
  const updateTicket = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  }
  const {data: user} = useUser();

  // if the ticket is created, return new component
  if (ticket.created) {
    return (
      <div>
        <h1>Ticket created</h1>
        <Link to={`/ticket/${ticket.id}`}>View Ticket</Link>
      </div>
    )
  }


  if(user) {
    // set the email to the user's email
    ticket.email = user.email;
  return (
    <div>
      <h1>Create Ticket</h1>
      <form onSubmit={createTicket}>
        <label>
          Name:
          <input type="text" name="name" value={ticket.name} onChange={updateTicket} />
        </label>
        <label>
          Employee Number:
          <input type="text" name="employeeNumber" value={ticket.employeeNumber} onChange={updateTicket} />
        </label>
        <label>
          Ticket Type:
          <select name="type" value={ticket.type} onChange={updateTicket}>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
            <option value="documentation">Documentation</option>
          </select>
        </label>
        <label>
          Website:
          <input type="text" name="website" value={ticket.website} onChange={updateTicket} />
        </label>
        <label>
          Description:
          <textarea name="body" value={ticket.body} onChange={updateTicket} />
        </label>
        <input type="submit" value="Create Ticket" />
      </form>
      <Link to="/">Back to tickets</Link>
    </div>
  )
  }

  return (
    <>
    <h1>You must be logged in to create a ticket</h1>
    <Link to='/login'>Log in</Link>
    </>
  )
  
}

const UserTicket = () => {
  const firebase = useFirebaseApp();
  const auth = getAuth(firebase);
    return (
      <AuthProvider sdk={auth}>
        <CreateTicket />
      </AuthProvider>
    )
}

export default UserTicket