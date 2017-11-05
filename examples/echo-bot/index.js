'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'Rsw1ieLVk1eaMuz+krL0xmREKqUmmNGU1xr3R+0kDtbR/WWO+ZVoniwMFQQh6DWUOXiBNXW0PcCnqUHfUxgO9BbcOioGgojTBS36AV9id0DWtxlu2pups6Ho1QXMJtuqTiBq5IpaLANYCdmyCMi2hgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'd0171b7464ffce8211d1231e659800e5',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 1234 || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
