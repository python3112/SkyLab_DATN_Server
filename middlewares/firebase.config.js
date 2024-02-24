const admin = require('firebase-admin');
const serviceAccount = require('./skylap-md03-firebase-adminsdk-3eozc-33e545dfbb.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://skylap-md03-default-rtdb.asia-southeast1.firebasedatabase.app',
  storageBucket: 'gs://skylap-md03.appspot.com',
});

const db = admin.firestore();
const realtimeDatabase = admin.database();

module.exports = { admin, db  , realtimeDatabase};
