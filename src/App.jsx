import { collection, getFirestore, query } from 'firebase/firestore'
import { FirestoreProvider, useFirestoreCollectionData, useFirestore, useFirebaseApp, useUser, AuthProvider } from 'reactfire';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Header from './components/header';


function TicketsComponent() {
  // get the tickets collection
  const ticketsRef = collection(useFirestore(), 'tickets')

  // build the query
  const ticketsQuery = query(ticketsRef)

  // request the query as a hook
  const { data: tickets } = useFirestoreCollectionData(ticketsQuery, { idField: 'id' })

  // render the tickets
  return (
    <ul className='tickets'>
      {tickets?.map(ticket => (
        <li className='ticket' key={ticket.id}>
          <div className='ticket__content'>
            <h2>Name: {ticket.name}</h2>
            <h3>Type: {ticket.type}</h3>
            <h3 className='ticket__website'>Website: {ticket.website}</h3>
          </div>
          <Link className='ticket__button' to={`/ticket/${ticket.id}`}>View Ticket</Link>
        </li>
      ))}
    </ul>
  )
}

const UserDetails = () => {
  const {data: user} = useUser();
  if(user) {
  return (
    <>
      <Header />
      <main>
        <h1 className='title'>All Tickets</h1>
        <TicketsComponent />
        <div className="viewTicket">
          <Link className='viewTicket__link' to='/ticket/create'>Create Ticket</Link>
        </div>
      </main>
    </>
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

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());

  const firebase = useFirebaseApp();
  const auth = getAuth(firebase);

  // only show the page if the user is signed in. otherwise show a form for the user to sign in
  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>
        <div className="App">
          <UserDetails />
        </div>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App
