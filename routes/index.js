var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/tournaments', db.getAllTournaments);
router.post('/api/tournaments', db.createTournament);
router.get('/api/tournaments/:id', db.getSingleTournament);
router.get('/api/tournaments/search/:search', db.getTsBySearchString);
router.get('/api/tournaments/r/:region', db.getTsByRegion);
router.get('/api/tournaments/g/:game', db.getTsByGame);
router.get('/api/tournaments/s/:series', db.getTsBySeries);
router.get('/api/tournaments/t/p/:id', db.getPlayersByTournament);
router.get('/api/tos', db.getAllTOs);


module.exports = router;
