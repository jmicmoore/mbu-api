require('dotenv').config(); // reads .env file
const http = require('superagent');

const mailChimpApi = process.env.MAIL_CHIMP_API;
const MAIL_CHIMP_API_KEY = process.env.MAIL_CHIMP_API_KEY;
const sendEmailsAction = process.env.SEND_EMAILS_ACTION;

const sendTestEmail = () => {
    http.post(`${mailChimpApi}${sendEmailsAction}`)
        .auth('anystring', MAIL_CHIMP_API_KEY, {type:'auto'})
        .type('application/json')
        .send({
            email_address: 'jmicmoore@gmail.com'
        })
        .end(function(err, res) {
            if (err) {
                console.log("Error while trying to send an e-mail ", err);
            } else {
                console.log('Success');
            }
    });
};

sendTestEmail();