const express = require('express');
const  sequelize  = require('./database/db');
const { JWT_SECRET}= process.env
const cors = require('cors');
const bodyParser= require('body-parser')
const cookieParser = require("cookie-parser");

require('dotenv').config();

const app = express();


// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
      origin: '*', // <-- location of the react app were connecting to
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
      allowedHeaders: ['Content-Type', 'x-user-session','Authorization'],     //Se usa para enviar los datos de sesión desde el front al middleware del back
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", "true"); res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(cookieParser(JWT_SECRET));
app.use(express.json());
app.use(express.static("storage"))
app.use(express.static('assets'));

const PORT = process.env.PORT || 3001
app.use('/api', require('./routes'))


async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log('Connection has been established successfully.');
    app.listen(PORT)
    console.log(`Server listening on port ${PORT}`)
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();