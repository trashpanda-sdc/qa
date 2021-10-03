const express = require('express');
const db = require('../db/index.js');

const PORT = 3030;
const app = express();

app.listen(PORT, ()=> {
  console.log('listening on port 3030');
})

app.get('/', (req, res)=>{
    db.getQuestionsByID(1)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.statusCode = 500;
      res.end(error);
    });
  });
