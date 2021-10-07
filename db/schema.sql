-- ---
-- Database qa --
-- ---
DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;

\c qa

-- ---
-- Table questions --
-- ---

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  question_id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_data BIGINT DEFAULT NULL,
  asker_name VARCHAR(100) NULL DEFAULT NULL,
  asker_email VARCHAR(100) NULL DEFAULT NULL,
  reported BOOLEAN NULL DEFAULT NULL,
  helpful INTEGER NULL DEFAULT NULL,
  date TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (question_id)
);

-- ---
-- Table answers --
-- ---

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  answer_id SERIAL not null,
  question_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_data BIGINT DEFAULT NULL,
  answerer_name VARCHAR(100) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  reported BOOLEAN NULL DEFAULT NULL,
  helpful INTEGER NULL DEFAULT NULL,
  date TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (answer_id)
);

-- ---
-- Table answers_photos --
-- ---

DROP TABLE IF EXISTS answers_photos;

CREATE TABLE answers_photos (
  photo_id serial,
  answers_id INTEGER not null,
  url text not null,
  PRIMARY KEY (photo_id)
);
-- ---
-- Foreign Keys
-- ---

ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (question_id);
ALTER TABLE answers_photos ADD FOREIGN KEY (answers_id) REFERENCES answers (answer_id);

-- bit.ly/TelegraphCheatSheet
-- bit.ly/TelegraphCheatSheet
-- bit.ly/TelegraphApplication
-- shay.rosner@galvanize.com
-- bit.ly/TelegraphMenteeForm
-- bit.ly/TelegraphTrackMenteeProgram


-- ---
-- Import data
-- ---

COPY questions(
  question_id,
  product_id,
  body,
  date_data,
  asker_name,
  asker_email,
  reported,
  helpful
  )
FROM '/Users/nerd/documents/galvanize/snr/sdc/qa/db/data/questions.csv'
DELIMITER ','
CSV HEADER;


COPY answers(
  answer_id,
  question_id,
  body,
  date_data,
  answerer_name,
  answerer_email,
  reported,
  helpful
  )
FROM '/Users/nerd/documents/galvanize/snr/sdc/qa/db/data/answers.csv'
DELIMITER ','
CSV HEADER;


COPY answers_photos(
  photo_id,
  answers_id,
  url
  )
FROM '/Users/nerd/documents/galvanize/snr/sdc/qa/db/data/answers_photos.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Convert Date_Written Columns
-- ---

UPDATE questions SET date = TO_TIMESTAMP( date_data / 1000 );
UPDATE answers SET date = TO_TIMESTAMP( date_data / 1000 );

ALTER TABLE questions DROP COLUMN date_data;
ALTER TABLE answers DROP COLUMN date_data;

-- ---
-- update the autoincrement, serial, current value
-- this is needed since the autoincrement value will be off
-- due to the copy not adjusting the value as it seeds the data
-- ---
SELECT SETVAL('questions_question_id_seq', (SELECT MAX(question_id) + 1 FROM questions));
SELECT SETVAL('answers_answer_id_seq', (SELECT MAX(answer_id) + 1 FROM answers));
SELECT SETVAL('answers_photos_photo_id_seq', (SELECT MAX(photo_id) + 1 FROM answers_photos));

-- ---
-- Make program fun faster
-- ---

CREATE INDEX questions_id_idx ON questions (question_id);
CREATE INDEX question_id_idx ON answers (question_id);
CREATE INDEX answer_id_idx ON answers_photos (answers_id);

-- insert into questions (product_id, body, asker_name, asker_email, reported, helpful, date) values ()