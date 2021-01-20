import * as firebase from 'firebase';
//import firestore from 'firebase/firestore';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBSUW-RYw24ylJQ7Wy-ixVStDpyDyvrJaM",
    authDomain: "tracktask-90e8c.firebaseapp.com",
    projectId: "tracktask-90e8c",
    storageBucket: "tracktask-90e8c.appspot.com",
    messagingSenderId: "293424535751",
    appId: "1:293424535751:web:69db6b081e2a27dae0c6e2",
    measurementId: "G-BLCHSM3BDN"
};

// firebase.initializeApp(firebaseConfig);

// firebase.firestore();

export default !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();;