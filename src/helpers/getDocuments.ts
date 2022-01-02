import firebase from 'firebase/compat'

const getDocuments = (snapshot: firebase.firestore.QuerySnapshot): object[] => {
  const documents: object[] = []

  snapshot.forEach((document: firebase.firestore.QueryDocumentSnapshot) => {
    documents.push({ id: document.id, ...document.data() })
  })

  console.log(documents)
  return documents
}

export { getDocuments }