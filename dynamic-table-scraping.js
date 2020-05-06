const request = require('request-promise');
const cheerio = require('cheerio');

// SCRAPING A TABLE
async function tablescraper() {
	const html = await request.get('https://www.codingwithstefan.com/table-example/');

	// loads the html and parses it
	const $ = await cheerio.load(html);

	// selecting td from tables and putting it in an array with objects
	const scrapedRows = [];
	const tableHeaders = [];
	$('body > table > tbody > tr').each((index, element) => {
		//dynamic table headers
		if (index === 0) {
			const ths = $(element).find('th');
			ths.each((index, element) => {
				tableHeaders.push($(element).text().toLowerCase());
			});

			return true;
		}

		const tds = $(element).find('td');
		const tableRow = {};
		tds.each((index, element) => {
			tableRow[tableHeaders[index]] = $(element).text();
		});

		scrapedRows.push(tableRow);
	});
	console.log(scrapedRows);
}

tablescraper();
