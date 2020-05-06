const request = require('request-promise');
const fs = require('fs');
const cheerio = require('cheerio');

async function main() {
	const html = await request.get('https://reactnativetutorial.net/css-selectors/lesson6.html');

	fs.writeFileSync('./test.html', html);
	const $ = await cheerio.load(html);

	// selecting element with class name
	$('h2.red').each((index, element) => {
		console.log($(element).text());
	});

	// selecting element with an attribute
	$('[data-customer]').each((index, element) => {
		console.log($(element).text());
	});
}

main();
