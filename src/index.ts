import db from './firebase/config'

const user = {
  name: 'Manuel',
  active: true,
  birthday: 0,
}


const id = 'G3da7WNR9xfCfvzQ4q74'  // id de un documento en users

// AGREGAR INFORMACIÓN
// db.collection('users').add(user).then(console.log)

// ACTUALIZAR INFORMACIÓN
// db.collection('users').doc(id).update({ active: true, age: 20 })
// db.collection('users').doc(id).set({ name: 'Pedro' })

// ELIMINAR UN DOCUMENTO
// db.collection('users').doc(id).delete()