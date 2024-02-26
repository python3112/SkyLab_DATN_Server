const admin = require('firebase-admin');
const serviceAccount = require('./skylap-md03-firebase-adminsdk-3eozc-33e545dfbb.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://skylap-md03.appspot.com',
});

const db = admin.firestore();
module.exports = { admin, db  , realtimeDatabase};
