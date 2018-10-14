const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('index', {
		content: 'real-time'
	});
});

module.exports = router;
