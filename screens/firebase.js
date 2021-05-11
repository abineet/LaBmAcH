import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDnQp-P3ZFJklAdWlBT8Q00s6kmH6SGOi0",
    authDomain: "labmach-ca37d.firebaseapp.com",
    projectId: "labmach-ca37d",
    storageBucket: "labmach-ca37d.appspot.com",
    messagingSenderId: "190491728067",
    appId: "1:190491728067:web:53db9a8fad79a0d30c2a76"
};
let app;
if (firebase.apps.length == 0){
    app=firebase.initializeApp(firebaseConfig);
}
else{
    app=firebase.app();
}

const auth=firebase.auth();

export { auth };