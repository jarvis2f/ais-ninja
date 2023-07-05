async function search_movies({ page = 1, query, region = 'US' }) {
  ais_progress(`searching ${query}, region: ${region}`)
  const apiKey = process.env.TMDB_API_KEY; // Replace with your TMDB API Key
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}&region=${region}`;
  const response = await fetch(url);
  return await response.json();
}

// Usage example:
// process.env.TMDB_API_KEY = ''
// searchMovies({ query: 'Star Wars' }).then(console.log);
