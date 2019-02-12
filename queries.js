const promise = require('bluebird');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');


const options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://obxjrzvvlumujf:e234770719c12e272568673d3e8621c46c0eba3783475121e696b657849fd674@ec2-54-243-228-140.compute-1.amazonaws.com:5432/d8lau1peg9l8rf';
//const connectionString = 'postgres://tfinder:tfinder@localhost:5432/tournaments'
const db = pgp(connectionString);

module.exports = {
	getAllTournaments: getAllTournaments,
	getSingleTournament: getSingleTournament,
	getTsByRegion: getTsByRegion,
	getTsByGame: getTsByGame,
	getTsBySeries: getTsBySeries,
	getAllUsers: getAllUsers,
	getSingleUser: getSingleUser,
	login: login,
	getPlayersByTournament: getPlayersByTournament,
	createTournament: createTournament,
	editTournament: editTournament,
	deleteTournament: deleteTournament,
	createUser: createUser,
	activateUser: activateUser,
	editTO: editTO,
	deleteTO: deleteTO,
	getTsBySearchString: getTsBySearchString
};

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

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
function getAllUsers(req, res, next){
	db.any('select * from users')
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
function getSingleUser(req, res, next){
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
function login(req, res, next){
	
	db.any('select * from users where name = $1', req.query.name)
		.then(function (data){
			console.log(data[0].password);
			bcrypt.compare(req.query.password, data[0].password, function(err, resp){
				if(resp){
					console.log('yes')
					res.status(200)
						.json({
							status: 'success',
							message: 'passwords match'
						})
				} else {
					res.status(200)
						.json({
							status: 'failure',
							message: `passwords don't match`
						})
				}

			})
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
	console.dir(req.body.games);
	console.log("insert into tournaments(name, region, address, TOrg, size, entryCond, games, series, lat, lng) values('"+req.body.name+"', '"+req.body.region+"', '"+req.body.address+"', '"+req.body.torg+"', '"+req.body.size+"', '"+req.body.entrycond+"', '{"+req.body.games+"}', '{"+req.body.series+"}');");
	db.none("insert into tournaments(name, region, address, TOrg, size, entryCond, games, series, active, lat, lng) values('"+req.body.name+"', '"+req.body.region+"', '"+req.body.address+"', '"+req.body.torg+"', '"+req.body.size+"', '"+req.body.entrycond+"', '{"+req.body.games+"}', '{"+req.body.series+"}', 'false', "+req.body.lat+", "+req.body.lng+");")
		.then((data) => {
			res.status(200)
				.json({
					status: 'success',
					message: 'Added a tournament!'
				});
		})
		.catch(function (err){
			return next(err);
		})
}
function editTournament(req, res, next){
	//Use conditionals to check for updated fields?  Use the sort of scope?
	db.none('update tournaments set ')
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
function addPlayerToTournament(req, res, next){

}
function createUser(req, res, next){
	console.log('aaaa');
	console.log("insert into users(name, password, torg, region, contactEmail, active) values ('"+req.body.name+"', '"+req.body.password+"', '"+req.body.torg+"', '"
		+req.body.region+"', '"+req.body.email+"', 'false')");
	let hash = makeid();



	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: 'skateordie72',
			pass: 'rodneymullen'
		}
	});

	transporter.verify(function(error, success){
		if(error){
			console.log(error);
		}else{
			console.log("Server ready")
		}
	});

	let msgToSend = {
		from: 'skateordie72@gmail.com',
		to: req.body.email,
		subject: 'tFind Email Confirmation',
		text: 'Confirm your email with tFind at https://www.jlukes.com/tfind_front/activate/'+hash,
		html: '<p>Confirm your email with tFind at <a href="https://www.jlukes.com/tfind_front/confirm/'+hash+'">https://www.jlukes.com/tfind_front/activate/'+hash+'</a></p>'
	}

	transporter.sendMail(msgToSend, function(error, info){
		if(error){
			console.log(error)
		}else{
			console.log(info.response)
		}
	})
	console.log(`insert into users(name, password, torg, region, contactEmail, active, hash)
		values('`+req.body.name+`', '`+req.body.password+`', '`+req.body.torg+`', '`
		+req.body.region+`', '`+req.body.email+`', 'false'`, `'`+ hash + `')`)
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(req.body.password, salt, function(err, hashpass){
			console.log(hashpass + 'aaaa');
			db.any(`insert into users(name, password, torg, region, contactEmail, active, hash)
			values('`+req.body.name+`', '`+hashpass+`', '`+req.body.torg+`', '`
			+req.body.region+`', '`+req.body.email+`', 'false'` + `, '`+ hash + `')`)
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

		});
	});
}
function activateUser(req, res, next){
	console.log(req.body.hash);
	console.log(`update users set active = true where hash = '` + req.body.hash+`'`)
	db.any(`update users set active = true where hash = '` + req.body.hash+`'`)
		.then(function(){
			res.status(200)
				.json({
					status: 'success',
					message: 'update successful'
				})
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