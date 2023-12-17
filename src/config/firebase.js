import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyApUwBoRkeIFa1DxGSgo0AbKtnI51KraQ0",
    authDomain: "pokemon-api-453c6.firebaseapp.com",
    projectId: "pokemon-api-453c6",
    storageBucket: "pokemon-api-453c6.appspot.com",
    messagingSenderId: "27129769933",
    appId: "1:27129769933:web:cd86d3e28300f2dedede84"
};

firebase.initializeApp( firebaseConfig );

export default firebase;
