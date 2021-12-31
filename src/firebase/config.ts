// Usamos la version compat para que sea igual a la version del curso
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore' // Habilita todas las funcionalidades de firestore

const firebaseConfig = {
  apiKey: 'AIzaSyApZTy4al3UKlsVFnWe98j5_M5Ji6bzeGs',
  authDomain: 'firestore-demo-d0766.firebaseapp.com',
  projectId: 'firestore-demo-d0766',
  storageBucket: 'firestore-demo-d0766.appspot.com',
  messagingSenderId: '413238965903',
  appId: '1:413238965903:web:fe5177be6fc8488e1662fa',
  measurementId: 'G-3C2C7PMMD2',
}

firebase.initializeApp(firebaseConfig)

export default firebase.firestore()
