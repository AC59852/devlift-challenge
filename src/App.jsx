import { collection, getFirestore, query } from 'firebase/firestore'
import { FirestoreProvider, useFirestoreCollectionData, useFirestore, useFirebaseApp, useUser, AuthProvider, useAuth } from 'reactfire';
import './App.css'
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';


function TicketsComponent() {
  // get the tickets collection
  const ticketsRef = collection(useFirestore(), 'tickets')

  // build the query
  const ticketsQuery = query(ticketsRef)

  // request the query as a hook
  const { data: tickets } = useFirestoreCollectionData(ticketsQuery, { idField: 'id' })

  // render the tickets
  return (
    <ul>
      {tickets?.map(ticket => (
        <li key={ticket.id}>
          <h2>{ticket.type}</h2>
          <p>{ticket.body}</p>
          <Link to={`/ticket/${ticket.id}`}>View Ticket</Link>
        </li>
      ))}
    </ul>
  )
}

const UserDetails = () => {
  const {data: user} = useUser();
  const auth = useAuth();
  if(user) {
  return (
    <>
      <header>
        <h2>Logged in as:</h2>
        <p>Email: {user.email}</p>
        <button onClick={() => auth.signOut()}>Sign out</button>
      </header>
      <main>
        <h1>Tickets</h1>
        <TicketsComponent />
        <Link to='/ticket/create'>Create Ticket</Link>
      </main>
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
