
async function search_weather({location: location}) {
  console.log('location', JSON.stringify(location));
  return await fetch(`https://api.seniverse.com/v3/weather/daily.json?key=${process.env.SENIVERSE_API_KEY}&location=${location}&language=zh-Hans&unit=c&start=-1&days=5`)
    .then(res => res.json());
}

// process.env.SENIVERSE_API_KEY = ''
// search_weather({location: 'beijing'}).then(console.log)
