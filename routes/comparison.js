const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('index', {
		content: 'comparison',
	});
});

module.exports = router;
