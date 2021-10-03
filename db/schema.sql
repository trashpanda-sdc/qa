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
  id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_data BIGINT DEFAULT NULL,
  asker_name VARCHAR(100) NULL DEFAULT NULL,
  asker_email VARCHAR(100) NULL DEFAULT NULL,
  reported BOOLEAN NULL DEFAULT NULL,
  helpful INTEGER NULL DEFAULT NULL,
  date_written TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table answers --
-- ---

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id SERIAL not null,
  question_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_data BIGINT DEFAULT NULL,
  answerer_name VARCHAR(100) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  reported BOOLEAN NULL DEFAULT NULL,
  helpful INTEGER NULL DEFAULT NULL,
  date_written TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table answers_photos --
-- ---

DROP TABLE IF EXISTS answers_photos;

CREATE TABLE answers_photos (
  id serial,
  answer_id INTEGER not null,
  url text not null,
  PRIMARY KEY (id)
);
-- ---
-- Foreign Keys
-- ---

ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (id);
ALTER TABLE answers_photos ADD FOREIGN KEY (answer_id) REFERENCES answers (id);

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
  id,
  product_id,
  body,
  date_data,
  asker_name,
  asker_email,
  reported,
  helpful
  )
FROM '/Users/nerd/documents/galvanize/snr/sdc/db/data/questions.csv'
DELIMITER ','
CSV HEADER;


COPY answers(
  id,
  question_id,
  body,
  date_data,
  answerer_name,
  answerer_email,
  reported,
  helpful
  )
FROM '/Users/nerd/documents/galvanize/snr/sdc/db/data/answers.csv'
DELIMITER ','
CSV HEADER;


COPY answers_photos(
  id,
  answer_id,
  url
  )
FROM '/Users/nerd/documents/galvanize/snr/sdc/db/data/answers_photos.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Convert Date_Written Columns
-- ---

UPDATE questions SET date_written = TO_TIMESTAMP( date_data / 1000 );
UPDATE answers SET date_written = TO_TIMESTAMP( date_data / 1000 );

ALTER TABLE questions DROP COLUMN date_data;
ALTER TABLE answers DROP COLUMN date_data;