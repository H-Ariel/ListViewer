const express = require('express');

const app = express();
const port = 1337;

const index_html = require('fs').readFileSync('./public/index.html', 'utf8');
var dataList = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public/'));

app.post('/', function onPOST(req, res) {
	if (req.body['message'] != '') {
		dataList.push(req.body['message']);

		res.send(index_html.replace('<!-- DATA -->',
			dataList.map((item) => `<li>${item}</li>`).join('')));
	}
});

app.listen(port);
console.log(`app is running at localhost:${port}`);
