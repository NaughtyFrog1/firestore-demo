import db from './firebase/config'
import { getDocuments } from './helpers/getDocuments'

const user = {
  name: 'Pedro',
  active: true,
  birthday: 0,
}

const id = 'G3da7WNR9xfCfvzQ4q74' // id de un documento en users

//* AGREGAR INFORMACIÓN
// db.collection('users').add(user).then(console.log)

//* ACTUALIZAR INFORMACIÓN
// db.collection('users').doc(id).update({ active: true, age: 20 })
// db.collection('users').doc(id).set({ name: 'Pedro' })

//* ELIMINAR UN DOCUMENTO
// db.collection('users').doc(id).delete()

//* SELECCIONAR TODOS LOS REGISTROS DE UNA COLECCIÓN - observando cambios
// db.collection('users').onSnapshot(console.log)

//* EXTRAER EL CONTENIDO - observando cambios
// Ver getDocuments()
// db.collection('users').onSnapshot(getDocuments)

//* SELECCIONAR TODOS LOS REGISTROS DE UNA COLECCIÓN - una única vez
// db.collection('users').get().then(getDocuments)

//* SELECCIONAR LOS REGISTROS CONDICIONALMENTE
db.collection('users').where('active', '==', true).get().then(getDocuments)

/**
`where` recibe tres argumentos: el campo a evaluar, tipo de condición, el valor a evaluar.

Si queremos poner varias condiciones sobre un mismo campo podemos encadenar varios where()
 */

db.collection('users')
  .where('salary', '>', 1500)
  .where('salary', '<', 2300)
  .get()
  .then(getDocuments)

/**
Si queremos poner varias condiciones sobre distintos campos tenemos que crear un índice.

Los indices le permite a la base de datos encontrar registros rápidamente. Por defecto firebase y firestore crean indices por cada campo que hay en la colección (name, salary, active, etc.)

Pero como en este caso queremos usar dos índices simultaneamente necesitamos crear un índice especial
 */

db.collection('users')
  .where('salary', '>', 1500)
  .where('active', '==', true)
  .get()
  .then(getDocuments)