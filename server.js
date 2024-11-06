const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { readdirSync } = require('fs');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// var fs = require('fs');
const cors = require('cors');
// const AWS = require('aws-sdk')
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
require('dotenv').config();

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

readdirSync('./routes').map((r) => (app.use('/api', require('./routes/' + r))));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
