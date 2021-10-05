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

const getPhotosByAnswerID = async (answerId) => {
  // promise
  return (
    postG
      .query(`SELECT * FROM answers_photos WHERE product_id = ${answerId}`)
      .then(postData => {
        return (postData.rows);
      })
      .catch(e => { /*console.log(e)*/})
  )
}

const reformatAnswerData = (rows) => {
  console.log(rows);
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

module.exports = {
  getQuestionsByID,
  getAnswersByQuestionID,
}

