import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC-4I0ufTJaVbuG58iROQoIhBBGl0QRp84',
  authDomain: 'notes-app-7684c.firebaseapp.com',
  projectId: 'notes-app-7684c',
  storageBucket: 'notes-app-7684c.appspot.com',
  messagingSenderId: '100650675787',
  appId: '1:100650675787:web:ad937f9b9530b45f3ae7ce',
  measurementId: 'G-2WJT9Y5BK6'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const db = getFirestore(app)

export {
  db
}