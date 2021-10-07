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
    const stopIndex = req.url.lastIndexOf('/');
    const productID = req.url.slice(4, stopIndex);
    db.getAnswersByQuestionID(productID)
    .then((data) => {
      res.send({results: data});
    })
    .catch((error) => {
      res.statusCode = 500;
      res.end(error);
    });
  });

  //get all questions
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

  // answer Question
  app.post('/qa/*/answers', (req, res)=>{
    const stopIndex = req.url.lastIndexOf('/');
    const questionID = req.url.slice(4, stopIndex);
    db.setAnswerByQuestionID(questionID, req.body)
    .then((data) => {
      res.statusCode = 201;
      res.end();
    })
    .catch((error) => {
      res.statusCode = 500;
      res.end(error);
    });
  });

  // ask Question
  app.post('/qa/*', (req, res)=>{
    const productID = req.url.slice(4);
    if (Number(productID)) {
      db.setQuestionsByID(productID, req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.statusCode = 500;
        res.end(JSON.stringify(error));
      });
    } else {
      res.statusCode = 404;
      res.end('invalid product id');
    }
  });


 // mark Q As Helpful
 app.put('/qa/question/*/helpful', (req, res)=>{
  const stopIndex = req.url.lastIndexOf('/');
  const questionID = req.url.slice(13, stopIndex);
  db.setHelpfulByID(questionID, 'question')
  .then((data) => {
    res.statusCode = 201;
    res.end();
  })
  .catch((error) => {
    res.statusCode = 500;
    console.log(error);
    res.end();
  });
});

 // report Question
 app.put('/qa/question/*/report', (req, res)=>{
  const stopIndex = req.url.lastIndexOf('/');
  const questionID = req.url.slice(13, stopIndex);
  db.setReportedByID(questionID, 'question')
  .then((data) => {
    res.statusCode = 201;
    res.end();
  })
  .catch((error) => {
    res.statusCode = 500;
    res.end(error);
  });
});


 // mark Answer As Helpful
 app.put('/qa/answer/*/helpful', (req, res)=>{
  const stopIndex = req.url.lastIndexOf('/');
  const answerID = req.url.slice(11, stopIndex);
  db.setHelpfulByID(answerID, 'answer')
  .then((data) => {
    res.statusCode = 201;
    res.end();
  })
  .catch((error) => {
    res.statusCode = 500;
    res.end(error);
  });
});

 // report Answer
 app.put('/qa/answer/*/report', (req, res)=>{
  const stopIndex = req.url.lastIndexOf('/');
  const answerID = req.url.slice(11, stopIndex);
  db.setReportedByID(answerID, 'answer')
  .then((data) => {
    res.statusCode = 201;
    res.end();
  })
  .catch((error) => {
    res.statusCode = 500;
    res.end(error);
  });
});

