const express = require('express');
const router = express.Router();
const Band = require("../models/Band");


router.get('/band-profile/:id', (req, res) => {
  Band
  .findById(req.params.id)
  .then((band)=>{
    res.render('band/band-profile', {bandHbs: band});
  })
});

module.exports = router;