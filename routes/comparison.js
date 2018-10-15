var passport = require('../lib/passport');
const router = require('express').Router();

router.get('/', passport.checkAuthenticate, (req, res) => {
	res.render('index', {
		content: 'comparison',
	});
});

module.exports = router;
