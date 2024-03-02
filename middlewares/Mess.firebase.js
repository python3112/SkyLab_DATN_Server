const {realtimeDatabase , admin} =  require('./firebase.config');
const  moment = require('moment');

const newMessageRef = realtimeDatabase.ref('/messages').push();
newMessageRef.set({
    id:newMessageRef.key,
  sender: 'user_id_1',
  message: 'Hello, world!',
  ngay: moment(Date.now()).format('DD-MM-YYYY HH:mm:ss')
});

module.exports =  {newMessageRef}