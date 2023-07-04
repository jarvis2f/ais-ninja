
async function search({query: query}) {
  ais_progress(`searching ${query}`)
  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=3`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        let reference_results = [];
        if (data["items"]) {
          for (let row of data["items"]) {
            if (!row["n"]) {
              let body = row["snippet"];
              if (body) {
                reference_results.push({body: body, url: row["link"]});
                if (reference_results.length > 2) {
                  break;
                }
              }
            }
          }
        }
        return JSON.stringify(reference_results);
      })
      .catch(error => {
        console.log(error);
        return `no web result`;
      });
  } catch (e) {
    console.log(e)
    return `no web result`;
  }
}
// 在 https://developers.google.com/custom-search/v1/overview 申请 API 密钥
// process.env.API_KEY = '';
// 在 https://developers.google.com/custom-search/v1/overview 设置好自定义搜索引擎，并获得搜索引擎 ID
// process.env.SEARCH_ENGINE_ID = '';
// 文档地址：https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list

// test
// search({query: "流浪地球2的上映时间"}).then(console.log)
