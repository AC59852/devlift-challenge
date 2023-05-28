// use firebase to delete the ticket
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'
import { useFirestoreDocData, useFirebaseApp } from 'reactfire';
import '../App.css'
import { Link, useParams, useNavigate } from 'react-router-dom';

function DeleteTicket() {
  const { id } = useParams();
  const firestoreInstance = getFirestore(useFirebaseApp());
  const ticketRef = doc(firestoreInstance, 'tickets', id);

  // check if the ticket exists
  const { data: ticket } = useFirestoreDocData(ticketRef, { idField: 'id' })

  const deleteTicket = async () => {
    await deleteDoc(ticketRef);

    if(!ticket) {
    // navigate back to the home page
    const navigate = useNavigate();
    navigate('/');
    }
  }

  if(!ticket) {
    return (
      <div>
        <h1>Ticket does not exist</h1>
        <Link to='/'>Go back</Link>
      </div>
    )
  }

  return (
    <>
      <div>
        <h1>Delete Ticket</h1>
        <h2>Are you sure you want to delete this ticket?</h2>
      </div>
      <div className='links'>
        <button onClick={deleteTicket}>Yes</button>
        <Link to={`/ticket/${id}`}>No</Link>
      </div>
    </>
  )
}

export default DeleteTicket