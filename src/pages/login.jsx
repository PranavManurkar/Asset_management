import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

// Initialize FirebaseUI
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// Temp variable to hold the anonymous user data if needed.
var data = null;

// Hold a reference to the anonymous current user.
var anonymousUser = firebase.auth().currentUser;

ui.start('#firebaseui-auth-container', {
  autoUpgradeAnonymousUsers: true,
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInFailure: function(error) {
      if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
        console.error('Sign-in error:', error);
        return Promise.resolve();
      }
      
      var cred = error.credential;
      
      // Implement your data copying logic here
      // For example:
      return firebase.auth().signInWithCredential(cred).then((result) => {
        // Handle data copying if necessary
        // copyDataToPermanentUser(anonymousUser, result.user);
      });
    }
  }
});
