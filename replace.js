module.exports = function(htmlTemplate, json) {
	const fs = require('fs');

	let output = htmlTemplate.replace(/{%productName%}/g, json.productName);
	output = output.replace(/{%image%}/g, json.image);
	output = output.replace(/{%quantity%}/g, json.quantity);
	output = output.replace(/{%price%}/g, json.price);
	output = output.replace(/{%from%}/g, json.from);
	output = output.replace(/{%nutrients%}/g, json.nutrients);
	output = output.replace(/{%description%}/g, json.description);
	output = output.replace(/{%ID%}/g, json.id);
	if (json['organic'] === false) {
		output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
	}
	return output;
};
//console.log(output);
