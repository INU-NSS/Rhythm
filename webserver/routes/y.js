module.exports = (app, passport) => {
	configPassport(passport);
	
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