const express = require('express');
const axios = require('axios');
const path = require('path');
const port = 3000;
const fs = require('fs')

const app = express();

app.use(express.static(path.join(__dirname, './dist')));
app.use(express.json());

app.post('/github', (req, res) => {
  // console.log(req.body)
  // let filepath = path.join(__dirname, '/gists', req.body.title)
  // console.log(filepath)
  // fs.writeFileSync(filepath, req.body.body)
  let gist = {
    "description": 'gist created by Gistify',
    "public": true,
    "files": req.body.files,
  }
  axios.post('https://api.github.com/gists', gist, req.body.option)
    .then((response) => {
      console.log('success')
      res.status(200).send('success')
    })
    .catch((err) => {
      console.log("error", err)
      res.status(500).send('there was a problem making your gist')
    })

})
app.listen(port, (error) => {
  if (error) console.log(error);
  console.log(`Listening to port ${port}`);
})