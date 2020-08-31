const gcm = require('node-gcm');

function send(callback) {
    console.log('sending notification');

    const sender = new gcm.Sender('AIzaSyBiMXxNPs-O45jhkgEXHZs2S9RoGJN_Pjk');

    const message = new gcm.Message({
        data: { 'message': 'new_movie_added' }
    });

    const regTokens = ['ejQ0d647-Go:APA91bH98NkwsFuqocdik9peUPp4UJod6pc9PuBIjV_nCFyWdsa-7civkuMnOgbOBP_YcOEbNdqT9l2lVg0cnPV3-KrPI-mVSnnv33xb3LCRprC5MHYHYO1dScqfnyr3j6BtCrsYfzXB'];

    sender.send(message, regTokens, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
        }

        callback();
    });
}

module.exports = {
    send: send
};