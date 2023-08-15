require("dotenv").config();

const accountSid = process.env.twilio_auth_token;
const authToken = process.env.twilio_account_sid;

const client = require('twilio')(accountSid, authToken);

const sendTextMessage = (reqClient) => {
    try {
        let Customer_Reciept = ` Your Details :\n 
        email id :${reqClient.email}\n 
        name : ${reqClient.name}\n 
        Income per Month: ${reqClient.income}\n
        Savings per Month: ${reqClient.savings}\n
        contact Number : ${reqClient.phone}\n
        Thanks for your response !Have a nice day!`;
        client.messages
            .create({
                body: Customer_Reciept,
                to: '+918269568157', // In production it will be replaced by reqClient.body.phone and will appen +91 in  starting
                from: '+15736779342', // From a valid Twilio number
            });
        console.log("message sent 1");
    } catch (err) {
        console.log(err);
    }

};


module.exports = sendTextMessage;