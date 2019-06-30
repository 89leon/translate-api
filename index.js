const express = require('express');
const app = express();
const port = 3011;
const axios = require('axios');


/*
We’ll tell a route to look for a GET request on the root (/) URL, and return some JSON.
*/
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express' })
});



app.get('/translate', (request, response) => {
  var targetLanguage = request.param('targetLanguage');
  var text = request.param('text');
  var text2 = request.param.text;
  let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
    + 'auto' + "&tl=" + targetLanguage + "&dt=t&q=" + fixedEncodeURI(text);
  axios.get(url)
    .then(res => {

      response.json({ error: 0, description: "OK", targetLanguage: targetLanguage, textToTranslate: text, result: res.data[0][0][0] });
      console.log(res);

    })
    .catch(error => {
      response.json({ error: -1, description: "NOT OK", targetLanguage: targetLanguage, textToTranslate: text });
      console.log(error);
    });
});


function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}


/*Now set the app to listen on the port you set.*/
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
