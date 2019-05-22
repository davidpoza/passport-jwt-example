'use strict'

let express             = require('express');
let router              = express.Router();
var SampleController    = require('../controllers/sample')

router.get('/test', SampleController.sample);

module.exports = router;