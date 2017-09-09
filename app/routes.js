var express = require('express');
var router = express.Router();

router.get('/version', (req, res) => {
    res.status(200).send('1.2.3');
});


module.exports = router;

