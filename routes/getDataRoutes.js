const express = require('express');
const router = express.Router();
const Controller = require("../controllers/getData")

router.post('/', Controller.getData);
router.post('/old', Controller.getOldData);

module.exports = router;
