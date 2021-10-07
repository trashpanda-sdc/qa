const axios = require ('axios');
const { Pool } = require('pg')
const postG = new Pool({
  host: '127.0.0.1',
  database: 'qa',
  port: 5432,
  user: 'postgres',
  idleTimeoutMillis: 1,
})

const getQuestionsByID = async (productId) => {
  // promise
  return (
    postG
      .query(`SELECT * FROM questions WHERE product_id = ${productId || 1}`)
      .then(postData => {
        return (postData.rows);
      })
      .catch(e => { /*console.log(e)*/})
  )
}

const reformatAnswerData = (rows) => {
  const results = {};
  const ids = [];
  rows.map((row) => {
    if(results[row.answer_id] === undefined) {
      const rowObj = {
        answer_id: row.answer_id,
        question_id: row.question_id,
        body: row.body,
        answerer_name: row.answerer_name,
        answerer_email: row.answerer_email,
        reported: row.reported,
        helpful: row.helpful,
        date: row.date,
        photos: []
      };
      if (row.url !== null) {
        rowObj.photos.push({ id: row.photo_id , url: row.url });
      }
      results[row.answer_id] = rowObj;
    } else {
      const photoObj = { 'id': row.photo_id ,'url': row.url};
      results[row.answer_id].photos.push(photoObj);
    }
  });
  return Object.values(results);
}

const getAnswersByQuestionID = async (questionId) => {
  // promise
  const answerData = [];
  return (
    postG
    .query(`SELECT * FROM answers LEFT JOIN answers_photos ON answers.answer_id = answers_photos.answers_id WHERE question_id = ${questionId}`)
      .then(postData => {
        return (reformatAnswerData(postData.rows));
      })
      .catch(e => { /*console.log(e)*/})
  )
}

const setQuestionsByID = async (productID, body) => {
  // promise
  const currentDate = new Date;
  const q = 'INSERT INTO questions (product_id, body, asker_name, asker_email, reported, helpful, date) VALUES ($1, $2, $3, $4, false, 0, Current_TimeStamp)';
  const values = [productID, body.body, body.name, body.email];
  return (
    postG
    .query(q, values)
      .then(postResponse => {
        return (postResponse);
      })
      .catch(e => {
        return (e);
      })
  );
}

const setAnswerByQuestionID = async (questionID, body) => {
  // promise
  console.log(body);
  const q = 'INSERT INTO answers (question_id, body, answerer_name, answerer_email, reported, helpful, date) VALUES ($1, $2, $3, $4, false, 0, CURRENT_TIMESTAMP)';
  const values = [questionID, body.body, body.name, body.email];
  return (
    postG
    .query(q, values)
      .then(postResponse => {
        return (postResponse);
      })
      .catch(e => {
        return (e);
      })
  );
}

const setHelpfulByID = async (id, columnName) => {
  // promise
  const q = `UPDATE ${columnName}s SET helpful = helpful + 1 WHERE  ${columnName}_id = ${id}`;
  return (
    postG
    .query(q)
      .then(postResponse => {
        return (postResponse);
      })
      .catch(e => {
        return (e);
      })
  );
}

const setReportedByID = async (id, columnName) => {
  // promise
  const q = `UPDATE ${columnName}s SET reported = true WHERE  ${columnName}_id = ${id}`;
  return (
    postG
    .query(q)
      .then(postResponse => {
        return (postResponse);
      })
      .catch(e => {
        return (e);
      })
  );
}


module.exports = {
  getQuestionsByID,
  getAnswersByQuestionID,
  setQuestionsByID,
  setAnswerByQuestionID,
  setHelpfulByID,
  setReportedByID,
}

