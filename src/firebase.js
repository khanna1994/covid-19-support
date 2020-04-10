// const config = {
//     apiKey: "AIzaSyDZepgRRs-sSnz0B69ZnmcNr7Q97I-poRs",
//     authDomain: "covid-19-support-6e193.firebaseapp.com",
//     databaseURL: "https://covid-19-support-6e193.firebaseio.com",
//   }
  
//   export default config;

  import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyDZepgRRs-sSnz0B69ZnmcNr7Q97I-poRs",
  authDomain: "covid-19-support-6e193.firebaseapp.com",
  databaseURL: "https://covid-19-support-6e193.firebaseio.com",
  // projectId: "ENTER YOURS HERE",
  // storageBucket: "ENTER YOURS HERE",
  // messagingSenderId: "ENTER YOURS HERE"
}
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const customerRef = databaseRef.child("customer")