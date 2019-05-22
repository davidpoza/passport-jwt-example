'use strict';

require('dotenv').config();
const path              = require('path');
const express           = require('express');
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.catch((err)=>{console.log(err); process.exit(1)});

let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));


let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('express server listening ...');
});

