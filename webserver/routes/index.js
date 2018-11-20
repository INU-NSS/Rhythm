//const User = require('../../db/collections/user');
const config = require ('../../config/config.js');
const checkAuth = (req, res, next) => {
	return req.isAuthenticated() ? next() : res.redirect('/login');
};

// const configPassport = (passport) => {
// 	const strategy = require('passport-local').Strategy;
// 	passport.use(new strategy({
// 		usernameField: 'id',
// 		passwordField: 'passwd',
// 		session: true
// 	}, (id, pw, done) => {
// 		User.isValid(id, pw).then((user) => {
// 			return user ? done(null, user) : done(null, false, { message: 'Invalid User' });
// 		});
// 	}));
// 	passport.serializeUser((user, done) => done(null, user.id));
// 	passport.deserializeUser((id, done) => done(null, id));
// };

const configPassport = (passport) => {
	const strategy = require('passport-local').Strategy;
	passport.use(new strategy({
		usernameField: 'id',
		passwordField: 'passwd',
		session: true
	}, function(id, passwd, done){
		if(id == config.user.id && passwd ==config.user.pw){
			var user = { id: config.user.id};
			return done(null, user);
		}else {
			return done(null, false, {message: ' Invalid user '});
		}
	}
	));
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => done(null, id));
};

module.exports = (app, passport) => {
	configPassport(passport);

	app.get('/', checkAuth, (req, res) => {
		res.render('index', {
			content: './contents/maps',
			options: JSON.stringify({ lat: 35.189906, lng: 128.717703 })
		});
	});

	app.get('/login', (req, res) => {
		return req.isAuthenticated() ? res.redirect('/logout') : res.render('login');
	});

	app.get('/logout', (req, res) => {
		if(req.isAuthenticated()) req.logout(); 
		res.redirect('/login');
	});

	app.post('/auth', passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		})
	);

	['charts', 'real-time', 'comparison'].forEach((page) => {
		app.get(`/${page}`, checkAuth, (req, res) => {
			res.render('index', { content: `./contents/${page}` });
		});
	});
	
	app.get('/x', checkAuth, (req, res) => {
		const ir = require('../../db/collections/ir');
		ir.findx((data) => {
			res.render('index', { content: './contents/x', data: data });
		});
	});
	app.get('/y', checkAuth, (req, res) => {
		const ir = require('../../db/collections/ir2');
		ir.findy((data) => {
			res.render('index', { content: './contents/y', data: data });
		});
	});
	app.get('/z', checkAuth, (req, res) => {
		const ir = require('../../db/collections/ir3');
		ir.findz((data) => {
			res.render('index', { content: './contents/z', data: data });
		});
	});
};
