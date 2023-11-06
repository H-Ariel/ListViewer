const express = require('express');
const fs = require('fs');

const app = express();
const port = 1337;

const index_html = fs.readFileSync('./public/index.html', 'utf8');

var dataList = [];

function onGET(req, res) {
	res.send(index_html);
}

function onPOST(req, res) {
	if (req.body['message'] != '') {
		dataList.push(req.body['message']);

		var list_html = '';
		for (var i = 0; i < dataList.length; i++) {
			list_html += `<li>${dataList[i]}</li>`;
		}

		res.send(index_html.replace('<!-- DATA -->', list_html));
	}
}


//app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/', onPOST);

const server = app.listen(port);
console.log(`app listening on port ${port}!`);
