require("dotenv").load();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const textOwner = () => {
  client.messages
    .create({
      body: "\nA new order has been received.\n Please respond on the website!",
      from: "+15103234604",
      to: "+15877006592",
    })
    .then((message) => console.log(message.sid));
};

const textUser = (phone_number, order_id, duration, name) => {
  client.messages
    .create({
      body: `\nDO NOT REPLY \nThank you ${name} for ordering!!
      \n Your order number is ${order_id}.\n It will be ready in ${duration} minutes.`,
      from: "+15103234604",
      to: phone_number,
    })
    .then((message) => console.log(message.sid));
};

module.exports = { textOwner, textUser };