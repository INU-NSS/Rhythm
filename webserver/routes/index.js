const User = require('../../db/collections/user');

const checkAuth = (req, res, next) => {
	return req.isAuthenticated() ? next() : res.redirect('/login');
};

const configPassport = (passport) => {
	const strategy = require('passport-local').Strategy;
	passport.use(new strategy({
		usernameField: 'id',
		passwordField: 'passwd',
		session: true
	}, (id, pw, done) => {
		User.isValid(id, pw).then((user) => {
			return user ? done(null, user) : done(null, false, { message: 'Invalid User' });
		});
	}));
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
};
