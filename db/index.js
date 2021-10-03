const axios = require ('axios');
const { Pool } = require('pg')
const postG = new Pool({
  host: '127.0.0.1',
  database: 'qa',
  port: 5432,
})

const getQuestionsByID = async (productID) => {
  // promise
  return (
    postG
      .query(`SELECT * FROM questions WHERE product_id = ${productID || 1}`)
      .then(postData => {
        return (postData.rows);
      })
      .catch(e => { console.log(e)})
  )
}

module.exports = {
  getQuestionsByID,
}

