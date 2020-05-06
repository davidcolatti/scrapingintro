const request = require('request-promise');
const fs = require('fs');
const cheerio = require('cheerio');

// SCRAPING CSS ELEMENTS
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

// SCRAPING A TABLE
async function tablescraper() {
	const html = await request.get('https://www.codingwithstefan.com/table-example/');

	// loads the html and parses it
	const $ = await cheerio.load(html);

	// selecting td from tables and putting it in an array with objects
	const scrapedRows = [];
	$('body > table > tbody > tr').each((index, element) => {
		if (index === 0) return true;

		const tds = $(element).find('td');
		const company = $(tds[0]).text();
		const contact = $(tds[1]).text();
		const country = $(tds[2]).text();
		const scrapedRow = { company, contact, country };
		scrapedRows.push(scrapedRow);
	});
	console.log(scrapedRows);
}

tablescraper();
