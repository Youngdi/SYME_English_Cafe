const express = require('express');
const line = require('@line/bot-sdk');
const bodyParser = require('body-parser');
const config = {
  channelAccessToken: 'wkVMfW4q27td/y53WrLM7e7Ooy+JfH4WOSrYaksn9KgL+tZoQDhui6rL0sIb7GNVU1Eq4j/yr9Wpj+5Hgf5UkmFHatmy6jk9w//ngIAdbb1VB6yu6QFU4JPzQueJax0OhYfv196HV+HfU5QCzFXi4wdB04t89/1O/w1cDnyilFU=',
  channelSecret: '227738d158bdbee5e1aa58f19cb99e13'
};
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed

const app = express();

app.use('/webhook', line.middleware(config))
app.use(bodyParser.json())

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
})

app.post('/webhook', (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

const client = new line.Client(config);
function handleEvent(event) {
  console.log(event);
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000);