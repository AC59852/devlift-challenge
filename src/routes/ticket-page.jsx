// load the ticket data based on the id
import { getFirestore, doc } from 'firebase/firestore'
import { AuthProvider, useFirebaseApp, useFirestoreDocData, useUser } from 'reactfire';
import { getAuth } from 'firebase/auth';
import '../App.css'
import { Link, useParams } from 'react-router-dom';
import Header from '../components/header';


function TicketContent() {
  // get the ticket document
  const { id } = useParams();
  const firestoreInstance = getFirestore(useFirebaseApp());
  const ticketRef = doc(firestoreInstance, 'tickets', id);
  const { data: ticket } = useFirestoreDocData(ticketRef, { idField: 'id' })

  // check if the ticket exists
  if (!ticket) {
    return (
      <div className='ticketCreated'>
        <h1>Ticket does not exist</h1>
        <Link to='/'>Go back</Link>
      </div>
    )
  }

  // render the ticket
  return (
    <section className='ticketPage'>
      <div className='ticketPage__heading'>
        <h1>Ticket by: {ticket?.name}</h1>
        <h2>Employee No. {ticket?.employeeNumber}</h2>
      </div>
      <div className="ticketPage__site">
        <h3>Ticket type: {ticket?.type}</h3>
        <h3>For website: <a href={ticket?.website} target='_blank'>{ticket?.website}</a></h3>
      </div>
      <div className='ticketPage__body'>
        <h3>Description:</h3>
        <p>{ticket?.body}</p>
      </div>
      {/* add links to edit/delete the ticket */}
      <div className='ticketLinks'>
        <div className="ticketLinks__crud">
          <Link to={`/ticket/${ticket?.id}/edit`} className='ticketLinks__crud--edit'>Edit Ticket</Link>
          <Link to={`/ticket/${ticket?.id}/delete`} className='ticketLinks__crud--delete'>Delete Ticket</Link>
        </div>
        <Link to="/" className='ticketLinks__back'>Back to Tickets</Link>
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

function TicketPage() {
  const firebase = useFirebaseApp();
  const auth = getAuth(firebase);

  return (
    <AuthProvider sdk={auth}>
      <TicketUser />
    </AuthProvider>
  )
}

export default TicketPage