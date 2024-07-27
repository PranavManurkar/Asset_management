// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set, push, update } from "firebase/database";

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

// Define your asset data
const asset_name = "MA";
const count = 2;
const maintainence_period = 1;
const last_maintainence = 88;
const warranty = 4;
const criticality = "critical";

// Get a reference to the database
const db = getDatabase();

// Set the data in the database
set(ref(db, 'assets/' + Date.now().toString()), {
  name: asset_name,
  count: count,
  cost: 0,  // You need to define 'cost' or remove this field if not needed
  maintainence_period: maintainence_period,
  last_maintainence: last_maintainence,
  next_maintainence: last_maintainence + maintainence_period,
  remaining_warranty: warranty,
  criticality: criticality
})
.then(() => {
  console.log('Data saved successfully!');
})
.catch((error) => {
  console.error('The write failed...', error);
});
