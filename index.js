const http = require('http');
const fs = require('fs');
const url = require('url');
const replace = require('./replace.js');
//json
let json = fs.readFileSync('../lecture_9/data.json');
let jsonObj = JSON.parse(json);
//templates
const producthtml = fs.readFileSync('./templates/template-product.html').toString();
const cardhtml = fs.readFileSync('./templates/template-card.html').toString();
const overviewhtml = fs.readFileSync('./templates/template-overview.html').toString();
const server = http.createServer(function(req, res) {
	var makecard = function(cardhtml, json) {
		return replace(cardhtml, json);
	};
	var path = req.url;
	var id = url.parse(path, true).query.id;
	var pathname = url.parse(path, true).pathname;
	if (pathname == '/' || pathname == '/overview') {
		res.writeHead(200, { 'content-type': 'text/html' });
		//loop for card
		var cardArr = jsonObj.map(function(e1) {
			return makecard(cardhtml, e1);
		});
		//for card working in overview
		let overview = overviewhtml.replace('{%card%}', cardArr);
		res.end(overview);
	} else if (pathname == '/product') {
		var product = replace(producthtml, jsonObj[id]);
		res.writeHead(200, { 'content-type': 'text/html' });
		res.end(product);
	} else {
		res.end('error 404 page not found.');
	}
});

var port=process.env.PORT||80;
server.listen(port);
console.log('server has been created on port.');
