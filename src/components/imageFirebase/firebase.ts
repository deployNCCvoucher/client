import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyDYaoBsoZSEu81F4D_pEAkfnWuPaWBZYHA',
    authDomain: 'console.firebase.google.com/u/0/project/nestjsproject-388201/storage/nestjsproject-388201.appspot.com/files',
    projectId: 'nestjsproject-388201',
    storageBucket: 'gs://nestjsproject-388201.appspot.com',
  };

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)