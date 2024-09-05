#! /usr/bin/env node

import express from 'express';
import ejs from 'ejs';
// import pkg from 'twilio';
// const {Twilio} = pkg;

let app = express();


const accountSid = 'ACa02924c1e57b35de0a56c70700167e87';
const authToken = 'cabe4602e62e1cec3171f36bf22f4bf0';
// const client = new Twilio(accountSid, authToken);

app.use(express.static('public'));
app.set('view engine','ejs');

app.listen(1080);


// localhost: 1080
app.get('/', function(req,res){

    res.render('pages/index');

})


app.get('/about', function(req,res){
    res.render('pages/about')
})

app.get('/contact', function(req,res){
    res.render('pages/contact')
})

// function sendMessageToWhatsApp(userMessage) {
//     client.messages
//         .create({
//             body: 'User Message: ${userMessage}',
//             from: 'whatsapp: +18777804236',
//             to: 'whatsapp: +923433020932'
//         })
//         .then(message => console.log(`Message sent with SID: ${message.sid}`))
//         .catch(error => console.error(`Error sending message: ${error.message}`));
// }

app.post('/send-message', express.json(), (req, res) => {
    const { message } = req.body;
    if(message) {
        sendMessageToWhatsApp(message);
        res.status(200).send('Message sent to WhatsApp!');
    } else {
        res.status(400).send('No message provided!');
    }
});