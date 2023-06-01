// use firebase to delete the ticket
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'
import { AuthProvider, useFirestoreDocData, useFirebaseApp, useUser } from 'reactfire';
import { getAuth } from 'firebase/auth';
import '../App.css'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/header';

function TicketContent() {
  const { id } = useParams();
  const firestoreInstance = getFirestore(useFirebaseApp());
  const ticketRef = doc(firestoreInstance, 'tickets', id);
  const navigate = useNavigate();

  // check if the ticket exists
  const { data: ticket } = useFirestoreDocData(ticketRef, { idField: 'id' })

  const deleteTicket = async () => {
    await deleteDoc(ticketRef);

    navigate('/');
  }

  if(!ticket) {
    return (
      <div className='ticketCreated'>
        <h1>Ticket does not exist</h1>
        <Link to='/'>Go back</Link>
      </div>
    )
  }

  return (
    <section className='deleteTicket'>
      <div>
        <h1>Delete Ticket</h1>
        <h2>Are you sure you want to delete this ticket?</h2>
        <h3>Name: {ticket.name}</h3>
        <p>"{ticket.body}"</p>
      </div>
      <div className='deleteTicket__buttons'>
        <button onClick={deleteTicket} className='deleteTicket__btn deleteTicket__btn--red'>Yes</button>
        <Link to={`/ticket/${id}`} className='deleteTicket__btn'>No</Link>
      </div>
    </section>
  )
}

const TicketUser = () => {
  const {data: user} = useUser();

  if(user) {
    return (
      <div>
        <Header />
        <TicketContent />
      </div>
    )
  } else {
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
}

function DeleteTicket() {
  const firebase = useFirebaseApp();
  const auth = getAuth(firebase);

  return (
    <AuthProvider sdk={auth}>
      <TicketUser />
    </AuthProvider>
  )
}

export default DeleteTicket