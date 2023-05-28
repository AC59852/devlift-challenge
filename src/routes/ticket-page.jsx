// load the ticket data based on the id
import { collection, getFirestore, query, doc, getDoc } from 'firebase/firestore'
import { FirestoreProvider, useFirestoreCollectionData, useFirestore, useFirebaseApp, useFirestoreDocData } from 'reactfire';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../App.css'
import { Link, useParams } from 'react-router-dom';

function TicketPage() {
  // get the ticket document
  const { id } = useParams();
  const firestoreInstance = getFirestore(useFirebaseApp());
  const ticketRef = doc(firestoreInstance, 'tickets', id);
  const { data: ticket } = useFirestoreDocData(ticketRef, { idField: 'id' })

  // check if the ticket exists
  if (!ticket) {
    return (
      <div>
        <h1>Ticket does not exist</h1>
        <Link to='/'>Go back</Link>
      </div>
    )
  }

  // render the ticket
  return (
    <>
      <div>
        <h1>Ticket by: {ticket?.name}</h1>
        <h2>Employee No. {ticket?.employeeNumber}</h2>
      </div>
      <h3>Ticket type: {ticket?.type}</h3>
      <h3>For website: <a href={ticket?.website} target='_blank'>{ticket?.website}</a></h3>
      <div>
        <h3>Description:</h3>
        <p>{ticket?.body}</p>
      </div>
      {/* add links to edit/delete the ticket */}
      <div className='links'>
        <Link to={`/ticket/${ticket?.id}/edit`}>Edit</Link>
        <Link to={`/ticket/${ticket?.id}/delete`}>Delete</Link>
      </div>
      <Link to="/">Back to tickets</Link>
    </>
  )
}

export default TicketPage