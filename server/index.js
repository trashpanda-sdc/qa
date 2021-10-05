const express = require('express');
const db = require('../db/index.js');
const cors = require('cors');


const PORT = 3030;
const app = express();

app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
  console.log(req.url);
  next();
});

app.listen(PORT, ()=> {
  console.log('listening on port 3030');
})

  // get specific answers
  app.get('/qa/*/answers', (req, res)=>{
    console.log(0);
    const stopIndex = req.url.lastIndexOf('/');
    const productID = req.url.slice(4, stopIndex);
    db.getAnswersByQuestionID(productID)
    .then((data) => {
      console.log(data);
      res.send({results: data});
    })
    .catch((error) => {
      res.statusCode = 500;
      res.end(error);
    });
  });

  app.get('/qa/*', (req, res)=>{
    const productID = req.url.slice(4);
    db.getQuestionsByID(productID)
    .then((data) => {
      res.send({results: data});
    })
    .catch((error) => {
      res.statusCode = 500;
      res.end(error);
    });
  });

  // ask Question
  app.post('/qa/*', (req, res)=>{
    console.log(2);
    const productID = req.url.slice(4);
    db.getQuestionsByID(productID)
    .then((data) => {
      res.send({results: data});
    })
    .catch((error) => {
      res.statusCode = 500;
      res.end(error);
    });
  });

  // answer Question
  app.post('/qa/*/answers', (req, res)=>{
    console.log(3);
    const productID = req.url.slice(4);
    db.getQuestionsByID(productID)
    .then((data) => {
      res.send({results: data});
    })
    .catch((error) => {
      res.statusCode = 500;
      res.end(error);
    });
  });

 // mark Q As Helpful
 app.put('/qa/question/*/helplful', (req, res)=>{
  console.log(4);
  const productID = req.url.slice(4);
  db.getQuestionsByID(productID)
  .then((data) => {
    res.send({results: data});
  })
  .catch((error) => {
    res.statusCode = 500;
    res.end(error);
  });
});

 // report Question
 app.put('/qa/question/*/report', (req, res)=>{
  console.log(5);
  const productID = req.url.slice(4);
  db.getQuestionsByID(productID)
  .then((data) => {
    res.send({results: data});
  })
  .catch((error) => {
    res.statusCode = 500;
    res.end(error);
  });
});


 // mark Answer As Helpful
 app.put('/qa/answer/*/helplful', (req, res)=>{
  console.log(6);
  const productID = req.url.slice(4);
  db.getQuestionsByID(productID)
  .then((data) => {
    res.send({results: data});
  })
  .catch((error) => {
    res.statusCode = 500;
    res.end(error);
  });
});

 // report Answer
 app.put('/qa/answer/*/report', (req, res)=>{
  console.log(7);
  const productID = req.url.slice(4);
  db.getQuestionsByID(productID)
  .then((data) => {
    res.send({results: data});
  })
  .catch((error) => {
    res.statusCode = 500;
    res.end(error);
  });
});

