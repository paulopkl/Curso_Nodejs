module.exports = application => {

	application.get('/', (req, res) => {
		res.render('xyz');
		// res.format({
		// 	html: () => {
		// 		res.send('Welcome to your application NodeJS!');
		// 	},
		// 	json: () => {
		// 		const ret = {
		// 			body: 'Welcome to your application NodeJS!'
		// 		}
		// 		res.json(ret);
		// 	} 
		// });
	});

	application.post('/', (req, res) => {
		const data = req.body;
		res.send(data);
	});
}