import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import TicketPage from './routes/ticket-page.jsx'
import EditTicket from './routes/edit-ticket.jsx'
import CreateTicket from './routes/create-ticket.jsx'
import DeleteTicket from './routes/delete-ticket.jsx'
import { FirebaseAppProvider } from 'reactfire'
import './index.css'

const firebaseConfig = {
  apiKey: "AIzaSyB9GSGbgN4TSPoKSHUEW_39FkkNwGHayFo",
  authDomain: "devlift-challenge.firebaseapp.com",
  projectId: "devlift-challenge",
  storageBucket: "devlift-challenge.appspot.com",
  messagingSenderId: "447473551670",
  appId: "1:447473551670:web:caf2c1340b0c2e029c0b97"
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/ticket/:id',
    element: <TicketPage />
  },
  {
    path: '/ticket/:id/edit',
    element: <EditTicket />
  },
  {
    path: '/ticket/:id/delete',
    element: <DeleteTicket />
  },
  {
    path: '/ticket/create',
    element: <CreateTicket />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <RouterProvider router={router} />
  </FirebaseAppProvider>
)
