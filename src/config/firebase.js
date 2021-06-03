import firebase from 'firebase/app';
import 'firebase/firebase-firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCn2jikBR2ud_VbPjLgtn4tQ8Zxu98QWwk',
  authDomain: 'shoesize-87ccf.firebaseapp.com',
  projectId: 'shoesize-87ccf',
  storageBucket: 'shoesize-87ccf.appspot.com',
  messagingSenderId: '158366405329',
  appId: '1:158366405329:web:a31f87565fe889c39a2bf0',
};

firebase.initializeApp(firebaseConfig);

const Firestore = firebase.firestore();

export { Firestore };
export default firebase;
