const { JSDOM } = require('jsdom');

async function search({query: query}) {
  ais_progress(`searching ${query}`)
  const headers = {
    'Cookie': process.env.BAIDU_COOKIE,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
  };

  const url = `https://www.baidu.com/s?wd=${query}&rn=5`;

  return await fetch(url, { headers })
    .then(response => response.text())
    .then(html => {
      const { document } = new JSDOM(html).window;
      const search_results = [];

      const results = document.querySelectorAll('div[class^="result c-container"]');
      results.forEach(result => {
        const titleElement = result.querySelector('h3.t');
        const title = titleElement.textContent;

        const linkElement = result.querySelector('a[href]');
        const link = linkElement.getAttribute('href');

        const snippetElement = result.querySelector('span[class^="content-right_8Zs40"]');
        const snippet = snippetElement ? snippetElement.textContent : '';

        search_results.push({
          'title': title,
          'href': link,
          'snippet': snippet
        });
      });

      return JSON.stringify(search_results);
    })
    .catch(error => {
      console.log('An error occurred:', error);
      return `no web result`;
    });
}

// process.env.BAIDU_COOKIE = ''
// search({query: '流浪地球2的上映时间'}).then(console.log)
