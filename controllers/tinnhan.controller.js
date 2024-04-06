const { realtimeDatabase } = require('../middlewares/firebase.config');
const Account = require('../models/Account');
exports.home = async (req, res, next) => {
    try {
        var listAccounts = [];
        var lisMess = [];
        realtimeDatabase.ref('/Chat').on('value', async (snapshot) => {
            const dataArray = Object.values(snapshot.val());
            
            for (const element of dataArray) {
                let user = await Account.findById(element.Nguoigui);
                
                const check = await realtimeDatabase.ref('/messages')
                .orderByChild('idChat')
                .equalTo(element.id)
                .once('value')
                if(check.exists){
                    const messArray = Object.values(check.val());
                    listAccounts.push(user)
                    lisMess.push(messArray[0])
                    console.log(listAccounts)
                }
               
                
               
                
            }
          
           
           
               
                
                
            
            
            await res.render('tinnhan/home_tinnhan', { title: 'màn hình nhắn tin', list: listAccounts, listmess: lisMess });
        });

    } catch (error) {
        console.log(error)
    }
}
