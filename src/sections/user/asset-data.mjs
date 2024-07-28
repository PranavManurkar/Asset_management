// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set, push } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDg5EzmKMS3hWSRTkmMuAAjDgyxDITbL2Q",
  authDomain: "hackdb-d07a9.firebaseapp.com",
  databaseURL: "https://hackdb-d07a9-default-rtdb.firebaseio.com",
  projectId: "hackdb-d07a9",
  storageBucket: "hackdb-d07a9.appspot.com",
  messagingSenderId: "990952793817",
  appId: "1:990952793817:web:fcbafa0722180602f980c8",
  measurementId: "G-NPGCSR4709"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

console.log(Date.now().toString());

//Define your asset data
const asset_name = "MAAS";
const count = 2;
const maintainence_period = 1;
const last_maintainence = 88;
const warranty = 4;
const criticality = "critical";

// Get a reference to the database
// Initialize the database
const db = getDatabase();

// Use the database object with ref

const insertData = (object) => {
  const dbRef = ref(db, 'assets/' + Date.now().toString());
  console.log('assets/' + Date.now().toString());
  set(dbRef, object)
    .then(() => {
      console.log("Pushed successfully!");
    })
    .catch((e) => {
      console.log("Error: ", e);
    });
};

export default insertData;

// Export the firebaseConfig object
export { firebaseConfig, app, firestore };
