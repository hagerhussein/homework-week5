const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:secret@localhost:5432/postgres'
const pool = new Pool({ connectionString })

pool.connect()
   .then(_ => {
      console.log('Connected to Postgres')
   })
   .then(() => pool.query('CREATE TABLE IF NOT EXISTS person (id serial, first_name varchar(255), last_name varchar(255), eye_color varchar(255))'))

   .then(() => pool.query('INSERT INTO person (first_name, last_name, eye_color) VALUES($1, $2, $3)',
      ['James', 'Smith', 'brown']
   ))

   .then(() => pool.query('INSERT INTO person (first_name, last_name, eye_color) VALUES($1, $2, $3)',
      ['Frank', 'Jones', 'brown']
   ))

   .then(() => pool.query('INSERT INTO person (first_name, last_name, eye_color) VALUES($1, $2, $3)',
      ['Rebecca', 'Andrews', 'blue']
   ))

   .then(() => pool.query('UPDATE person SET eye_color = $2 WHERE eye_color = $1 RETURNING *', ['brown', 'blue']))

   .then(() => pool.query('SELECT * FROM person WHERE first_name = $1', ['James']))

   .then(res => {
      console.log(res.rows)
      return pool.end()
   })

   .catch(console.error)