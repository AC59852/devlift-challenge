import { collection, getFirestore, query } from 'firebase/firestore'
import { FirestoreProvider, useFirestoreCollectionData, useFirestore, useFirebaseApp, useAuth, useSigninCheck, AuthProvider } from 'reactfire';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './App.css'
import { Link } from 'react-router-dom';


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
          <h3>{ticket.type}</h3>
          <p>{ticket.body}</p>
          {/* create a dynamic route to the card */}
          <Link to={`/ticket/${ticket.id}`}>View Ticket</Link>
        </li>
      ))}
    </ul>
  )
}

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());

  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  return (
    <>
    <AuthProvider sdk={auth}>
     <FirestoreProvider sdk={firestoreInstance}>
      <div className="App">
        <h1>DevLift Challenge</h1>
        <p>Here are some tickets:</p>
        <TicketsComponent />
        <Link to='/ticket/create'>Create New Ticket</Link>
      </div>
     </FirestoreProvider>
    </AuthProvider>
    </>
  )
}

export default App
