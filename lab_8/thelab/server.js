const morgan = require('morgan');
const cors = require('cors');

const express = require('express')
const app = express()

const mongoose = require('mongoose');

const config = require('./config');
const mainRouter = require('./routes/main.router');

_connectDB();

app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/', mainRouter);

function _connectDB() {
  mongoose.connect('mongodb+srv://Mary:qjhr@cluster0.zlxb1.mongodb.net/Cluster0?retryWrites=true&w=majority' , { useNewUrlParser: true, useUnifiedTopology: true });

  const { connection } = mongoose;

  connection.on('error', err => {
    console.log(err);
  });
}

app.listen(config.PORT, () => {
  console.log(`App listen ${config.PORT}`);
});
