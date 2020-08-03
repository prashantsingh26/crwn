import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB_aJ7HDIZ_pm4OhzMQ6RznsNZp4JRJ0cQ",
    authDomain: "crwn-db-df858.firebaseapp.com",
    databaseURL: "https://crwn-db-df858.firebaseio.com",
    projectId: "crwn-db-df858",
    storageBucket: "crwn-db-df858.appspot.com",
    messagingSenderId: "666545173834",
    appId: "1:666545173834:web:62ab04787ca0de00143db3",
    measurementId: "G-8G1DDCSZSY"
  };

  export const createUserProfileDocument = async(userAuth,additionalData) =>{
      if(!userAuth) return;

      const userRef =firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

      if(!snapShot.exists){
          const { displayName, email} =userAuth;
          const createdAt = new Date();

          try{
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              })
          }
          catch(error){
              console.log('error creating user',error.message);
          }
      }

      return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;