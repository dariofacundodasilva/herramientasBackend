import rp from 'request-promise'
import { fcmAuthorization } from '../../config'


export const sendNotification = (body) =>{
    var options = {
        host: 'https://fcm.googleapis.com/fcm',
        path: '/send',
        method: 'POST'
    };
  
    var options = {
        method: 'POST',
        uri: "https://fcm.googleapis.com/fcm/send",
        body:body,
        json: true,
        headers: {
                'Content-Type': 'application/json',
                'Authorization': fcmAuthorization
        }
    };

    rp(options)
    .then(function (body) {
        console.log("success: ",body);
    })
    .catch(function (err) {
        console.log("error: ",err);
    });
      
  }


    