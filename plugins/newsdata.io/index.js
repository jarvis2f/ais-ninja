async function search_latest_news({
                                    q,
                                    qInTitle,
                                    country = 'us',
                                    category,
                                    language = 'en',
                                    domain,
                                    page
                                  }) {
  const queryParams = new URLSearchParams({
    apikey: process.env.API_KEY,
    country,
    language,
  });
  q && queryParams.append('q', q);
  qInTitle && queryParams.append('qInTitle', qInTitle);
  category && queryParams.append('category', category);
  domain && queryParams.append('domain', domain);
  page && queryParams.append('page', page);

  const url = `https://newsdata.io/api/1/news?${queryParams.toString()}`;

  return await fetch(url).then(res => {
    // 保留3条
    return res.json().then(json => {
      const {status, totalResults, articles} = json;
      if (status === 'ok') {
        return JSON.stringify({
          status,
          totalResults,
          articles: articles.slice(0, 3)
        });
      }
      return JSON.stringify(json);
    });
  });
}

// Example usage:
process.env.API_KEY = 'pub_256955db4080f395e9f59fc14a09fa37beb20';
search_latest_news({q: 'pizza', country: 'au', language: 'en'}).then(console.log);
