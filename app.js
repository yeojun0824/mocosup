const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const getHtml = async () => {
  try {
    return await axios.get("https://banseokhs.djsch.kr/sFoodList.do?m=040801&s=banseokhs");
  } catch (error) {
    console.error(error);
  }
};

app.get('/', (req, res) => {
	res.set({'Content-Type': 'text/html'});
	
	getHtml().then(html => {
    	let ulList = [];
    	const $ = cheerio.load(html.data);
	//console.log(html.data);
    	const $bodyList = $("table").html();

    	res.end($bodyList);
  	});
});

app.listen(port, () => {
    console.log(`서버 실행됨`);
});
