import db from './firebase/config'
import { getDocuments } from './helpers/getDocuments'

const user = {
  name: 'Fernando',
  active: true,
  birthday: 0,
  salary: 1200,
}

const id = 'G3da7WNR9xfCfvzQ4q74' // id de un documento en users

//
//
//* AGREGAR INFORMACIÓN
// db.collection('users').add(user).then(console.log)

//
//
//* ACTUALIZAR INFORMACIÓN
// db.collection('users').doc(id).update({ active: true, age: 20 })
// db.collection('users').doc(id).set({ name: 'Pedro' })

//
//
//* ELIMINAR UN DOCUMENTO
// db.collection('users').doc(id).delete()

//
//
//* SELECCIONAR TODOS LOS REGISTROS DE UNA COLECCIÓN - observando cambios
// db.collection('users').onSnapshot(console.log)

//
//
//* EXTRAER EL CONTENIDO - observando cambios
// Ver getDocuments()
// db.collection('users').onSnapshot(getDocuments)

//
//
//* SELECCIONAR TODOS LOS REGISTROS DE UNA COLECCIÓN - una única vez
// db.collection('users').get().then(getDocuments)

//
//
//* SELECCIONAR LOS REGISTROS CONDICIONALMENTE
// db.collection('users').where('active', '==', true).get().then(getDocuments)

/**
`where` recibe tres argumentos: el campo a evaluar, tipo de condición, el valor a evaluar.

Si queremos poner varias condiciones sobre un mismo campo podemos encadenar varios where()

db.collection('users')
  .where('salary', '>', 1500)
  .where('salary', '<', 2300)
  .get()
  .then(getDocuments)
*/

/**
Si queremos poner varias condiciones sobre distintos campos tenemos que crear un índice.

Los indices le permite a la base de datos encontrar registros rápidamente. Por defecto firebase y firestore crean indices por cada campo que hay en la colección (name, salary, active, etc.)

Pero como en este caso queremos usar dos índices simultaneamente necesitamos crear un índice especial, de esta manera firebase sigue siendo eficiente

db.collection('users')
  .where('salary', '>', 1500)
  .where('active', '==', true)
  .get()
  .then(getDocuments)
 */

//
//
//* ORDER BY
// db.collection('users').orderBy('name').get().then(getDocuments)

/**
`orderBy` recibe como argumento el campo por el cual ordenará los documentos. Por defecto los ordena en orden ascendente, si queremos ordenar los elementos en orden descendente debemos pasar *'desc'* como segundo argumento

Si un documento no cuenta con el campo por el cual se está ordenando, entonces quedará excluido de los resultados.

Si queremos ordenar los elementos por más de un campo necesitaremos indexarlos (de forma similar al where)

db.collection('users')
  .orderBy('name')
  .orderBy('salary')
  .get()
  .then(getDocuments)
 */

//
//
//* PAGINACIÓN
// db.collection('users').limit(3).get().then(getDocuments)

/**
`limit` muestra los primeros n resultados
 */

const btnNextPage = document.createElement('button')
btnNextPage.innerText = 'Next page'

const btnPrevPage = document.createElement('button')
btnPrevPage.innerText = 'Previous page'

const pageContent = document.createElement('pre')
pageContent.style.width    = '400px'
pageContent.style.height   = '400px'
pageContent.style.overflow = 'auto'
pageContent.style.border   = 'solid 1px grey'

document.body.appendChild(btnNextPage)
document.body.appendChild(btnPrevPage)
document.body.appendChild(pageContent)

let lastDocument:  any = null
let firstDocument: any = null

btnNextPage.addEventListener('click', () => {
  const query = db.collection('users').orderBy('name').startAfter(lastDocument)

  query.limit(2).get().then(documents => {
    lastDocument  = documents.docs[1] || null
    firstDocument = documents.docs[0] || null
    pageContent.innerText = JSON.stringify(getDocuments(documents), null, 2)
  })
})

btnPrevPage.addEventListener('click', () => {
  const query = db.collection('users').orderBy('name').endBefore(firstDocument)

  query.limit(2).get().then(documents => {
    lastDocument  = documents.docs[1] || null
    firstDocument = documents.docs[0] || null
    pageContent.innerText = JSON.stringify(getDocuments(documents), null, 2)
  })
})

btnNextPage.click()

/**
Para poder hacer la paginación necesitamos que firestore ordenen los documentos en un orden específico
 */

