const { realtimeDatabase } = require('../middlewares/firebase.config');

const Account = require('../models/Account');




exports.home = async (req, res, next) => {
    try { 
        const user = req.session.Account;
        
        var listAccounts = [];
        var lisMess = [];
        realtimeDatabase.ref('/Chat').once('value', async (snapshot) => {
            const dataArray = Object.values(snapshot.val());
            for (const element of dataArray) {
                let user = await Account.findById(element.Nguoigui);
                listAccounts.push(user)
                const check = await realtimeDatabase.ref('/messages')
                    .orderByChild('idAccount')
                    .equalTo(element.Nguoigui)
                    .once('value')
                if (check.exists()) {
                    const messArray = Object.values(check.val());    
                    lisMess.push(messArray.at(messArray.length - 1))
                   
                }


            }
          
            

            await res.render('tinnhan/home_tinnhan', { title: 'màn hình nhắn tin' , listAccounts :  listAccounts , listMess :lisMess  , user : user});
      
           
        });
            
    } catch (error) {
        console.log(error)
    }
}

