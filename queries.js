const promise = require('bluebird');

const options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://tfind:finder@localhost:5432/tournaments';
const db = pgp(connectionString);

module.exports = {
	getAllTournaments: getAllTournaments,
	getSingleTournament: getSingleTournament,
	getTsByRegion: getTsByRegion,
	getTsByGame: getTsByGame,
	getTsBySeries: getTsBySeries,
	getAllTOs: getAllTOs,
	getSingleTO: getSingleTO,
	getPlayersByTournament: getPlayersByTournament,
	getSinglePlayer: getSinglePlayer,
	createTournament: createTournament,
	editTournament: editTournament,
	deleteTournament: deleteTournament,
	createPlayer: createPlayer,
	editPlayer: editPlayer,
	deletePlayer: deletePlayer,
	createTO: createTO,
	editTO: editTO,
	deleteTO: deleteTO,
	getTsBySearchString: getTsBySearchString
};

function getAllTournaments(req, res, next){
	db.any('select * from tournaments')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function getTsBySearchString(req, res, next){
	let search = req.params.search;
	console.log(`select * from tournaments where name ilike '%` + search + `%'`)
	db.any(`select * from tournaments where name ilike '%` + search + `%'`)
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function getSingleTournament(req, res, next){
	let Tid = parseInt(req.params.id);
	db.any(`select * from tournaments where id = ` + Tid)
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function getTsByRegion(req, res, next){
	let region = req.params.region;
	db.any(`select * from tournaments where region = `+ region)
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function getTsByGame(req, res, next){
	let game = req.params.game;
	db.any(`select * from tournaments where games ilike '%` + game + `%'`)
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function getTsBySeries(req, res, next){
	let series = req.params.series;
	db.any(`select * from tournaments where series ilike '%` + series + `%'`)
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function getAllTOs(req, res, next){
	db.any('select * from TOs')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function getSingleTO(req, res, next){
	let id = req.params.id;
	db.any('insert sql query here')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function getSinglePlayer(req, res, next){
	let id = req.params.id;
	db.any('insert sql query here')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function getPlayersByTournament(req, res, next){
	let id = parseInt(req.params.id);
	db.any(`select * from tournaments where id = $1`, id)
		.then(function (data){
			let ids = data[0]['attendees'].split(",");
			console.log(ids);
			let players = [];
			let idnum = ids.length;
			for(var i = 0; i < ids.length; i++){
				db.any(`select * from players where id = $1`, ids[i])
					.then(function(data1){
						console.log(data1[0]);
						players.push(data1[0]);
						console.log(players);
						idnum -= 1;
						console.log(idnum);
						console.log(players)
						if (idnum == 0){
							res.status(200)
								.json({
									status: 'success',
									data: players,
									message: 'retrieval successful'
								});
						}
					})
			}
		})
		.catch(function (err){
			return next(err);
		})
}
function createTournament(req, res, next){
	db.any('insert sql query here')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function editTournament(req, res, next){
	db.any('insert sql query here')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function deleteTournament(req, res, next){
	db.any('insert sql query here')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function createPlayer(req, res, next){
	db.any('insert sql query here')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function editPlayer(req, res, next){
	db.any('insert sql query here')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function deletePlayer(req, res, next){
	db.any('insert sql query here')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function createTO(req, res, next){
	db.any('insert sql query here')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function editTO(req, res, next){
	db.any('insert sql query here')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function deleteTO(req, res, next){
	db.any('insert sql query here')
		.then(function (data){
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
