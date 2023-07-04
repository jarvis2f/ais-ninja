# NewsData.io Plugin

This plugin provides a function to query the latest news articles from NewsData.io.

## API Key

To use this plugin, you need to sign up for an API key from [NewsData.io](https://newsdata.io) and replace the placeholder `Your API Key` in the `variables` section of `plugin.json` with your actual API key.

## Function: search_latest_news

Query the latest news articles from NewsData.io.

### Parameters

- `q` (optional): Search news articles for specific keywords or phrases.
- `qInTitle` (optional): Search news articles for specific keywords or phrases present in the news titles only.
- `country` (optional): Search the news articles from a specific country.
- `category` (optional): Search the news articles for a specific category.
- `language` (optional): Search the news articles for a specific language.
- `domain` (optional): Search the news articles for specific domains or news sources.
- `full_content` (optional): Get only those news articles which contain full content of the articles (true/false).
- `image` (optional): Get only those news articles which contain images (true/false).
- `video` (optional): Get only those news articles which contain videos (true/false).
- `page` (optional): Use page parameter to navigate to the next page.

### Example Usage

```javascript
const result = await search_latest_news({ q: 'pizza', country: 'au', language: 'en' });
console.log(result);
