async function search({
                        title,
                        titleType,
                        releaseDateFrom,
                        releaseDateTo,
                        userRatingFrom,
                        userRatingTo,
                        numberOfVotesFrom,
                        numberOfVotesTo,
                        genres,
                        titleGroups,
                        titleData,
                        companies,
                        instantWatchOptions,
                        usCertificates,
                        colorInfo,
                        countries,
                        countriesStr,
                        keyword,
                        languages,
                        languagesStr,
                        filmingLocations,
                        popularityFrom,
                        popularityTo,
                        plot,
                        runtimeFrom,
                        runtimeTo,
                        soundMix,
                        count,
                        sort
                      }) {
  const parameters = new URLSearchParams();

  if (title) parameters.append('Title', title);
  if (titleType) parameters.append('TitleType', titleType);
  if (releaseDateFrom) parameters.append('ReleaseDateFrom', releaseDateFrom);
  if (releaseDateTo) parameters.append('ReleaseDateTo', releaseDateTo);
  if (userRatingFrom) parameters.append('UserRatingFrom', userRatingFrom);
  if (userRatingTo) parameters.append('UserRatingTo', userRatingTo);
  if (numberOfVotesFrom) parameters.append('NumberOfVotesFrom', numberOfVotesFrom);
  if (numberOfVotesTo) parameters.append('NumberOfVotesTo', numberOfVotesTo);
  if (genres) parameters.append('Genres', genres);
  if (titleGroups) parameters.append('TitleGroups', titleGroups);
  if (titleData) parameters.append('TitleData', titleData);
  if (companies) parameters.append('Companies', companies);
  if (instantWatchOptions) parameters.append('InstantWatchOptions', instantWatchOptions);
  if (usCertificates) parameters.append('USCertificates', usCertificates);
  if (colorInfo) parameters.append('ColorInfo', colorInfo);
  if (countries) parameters.append('Countries', countries);
  if (countriesStr) parameters.append('CountriesStr', countriesStr);
  if (keyword) parameters.append('Keyword', keyword);
  if (languages) parameters.append('Languages', languages);
  if (languagesStr) parameters.append('LanguagesStr', languagesStr);
  if (filmingLocations) parameters.append('FilmingLocations', filmingLocations);
  if (popularityFrom) parameters.append('PopularityFrom', popularityFrom);
  if (popularityTo) parameters.append('PopularityTo', popularityTo);
  if (plot) parameters.append('Plot', plot);
  if (runtimeFrom) parameters.append('RuntimeFrom', runtimeFrom);
  if (runtimeTo) parameters.append('RuntimeTo', runtimeTo);
  if (soundMix) parameters.append('SoundMix', soundMix);
  if (count) parameters.append('Count', count);
  if (sort) parameters.append('Sort', sort);

  const url = `https://imdb-api.com/API/AdvancedSearch/${process.env.API_KEY}/?${parameters.toString()}`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Error searching movies:', error);
    return `no result`;
  }
}

// process.env.API_KEY = ''
// search({title: 'The Matrix'}).then(console.log)
