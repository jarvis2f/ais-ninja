async function search({query: query, region: region = 'zh-cn', page: page = 1}) {
  console.log("query", query)
  console.log("region", region)
  ais_progress(`searching ${query}, region: ${region}`)
  try {
    const response = await fetch(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`);
    const html = await response.text();
    const regex = /vqd=["']([^"']+)["']/;
    const match = regex.exec(html);
    const vqd = match && match[1].replaceAll('"', "").replaceAll("'", "");
    let safe_search_base = {On: 1, Moderate: -1, Off: -2};
    let PAGINATION_STEP = 25;

    let res = await fetch(`https://links.duckduckgo.com/d.js?q=${encodeURIComponent(query)}&l=${region}&p=${safe_search_base["On"]}&s=${Math.max(PAGINATION_STEP * (page - 1), 0)}&df=${new Date().getTime()}&o=json&vqd=${vqd}`);

    let result = await res.json();
    let reference_results = [];
    if (result["results"]) {
      for (let row of result["results"]) {
        if (!row["n"]) {
          let body = row["a"];
          if (body) {
            reference_results.push([body, row["u"]]);
            if (reference_results.length > 2) {
              break;
            }
          }
        }
      }
    }
    return JSON.stringify(reference_results)
  } catch (e) {
    console.log(e)
    return `no web result`;
  }
}

// test
// search({query: "流浪地球2的上映时间", region: "zh-cn"}).then(console.log)
