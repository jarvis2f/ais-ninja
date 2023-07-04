const puppeteer = require('puppeteer-core');
const ais = require('ais')

async function use_chrome(url) {
  const chrome_bin = process.env.CHROME_BIN;
  if (!chrome_bin) {
    console.log('chrome_bin is not defined');
    return '';
  }
  try {
    const browser = await puppeteer.launch({
      executablePath: chrome_bin,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
      // headless: false,
      // devtools: true
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
    );
    await page.goto(url);

    const bodyHandle = await page.$('body');

    const bodyContent = await page.evaluate((body) => {
      // 过滤 JavaScript 代码
      const scripts = Array.from(body.getElementsByTagName('script'));
      scripts.forEach(script => script.remove());

      // 过滤 CSS 代码
      const styles = Array.from(body.getElementsByTagName('style'));
      styles.forEach(style => style.remove());

      // 获取有文字内容或跳转链接的节点
      const textNodes = [];
      let nodes = Array.from(body.querySelectorAll('*'));
      nodes.forEach(node => {
        const hasText = node.textContent && node.textContent.trim().length > 0;
        const hasLink = node.href !== undefined && node.href !== '';
        const isSelfNode = Array.from(node.children).length === 0;

        if (isSelfNode && (hasText || hasLink)) {
          // 将node 上的除了 id、href 和 class 外的属性都去除
          const attributes = node.attributes;
          const attributesArray = Array.from(attributes);
          attributesArray.forEach(attribute => {
            const {name} = attribute;
            if (name !== 'id' && name !== 'class' && name !== 'href') {
              node.removeAttribute(name);
            }
          });

          textNodes.push({
            // tagName: node.tagName,
            // id: node.id,
            // class: node.className,
            href: node.href,
            content: encodeURIComponent(node.textContent)
          });
        }
      })

      return textNodes;
    }, bodyHandle).catch(e => {
      console.log(e);
    });

    // 获取title、description meta等信息
    const title = await page.title();
    const description = await page.$eval('meta[name="description"]', element => element.content);
    const keywords = await page.$('meta[name="keywords"]') ? await page.$eval('meta[name="keywords"]', element => element.content) : '';

    const result = {
      body: bodyContent,
      head: {
        title: title,
        description: description,
        keywords: keywords
      }
    };

    await browser.close();

    return result;
  } catch (error) {
    console.log('Error accessing page:', error);
    return 'cannot access page'
  }
}

async function access_internet({url: url, filter: filter}) {
  if (!url) return;
  ais_progress(`Accessing: ${url}`);
  ais_progress(`Filter: ${filter}`)
  try {
    let result = await use_chrome(url);
    console.log(`result: ${JSON.stringify(result)}`);
    const body = result.body;

    if (filter) {
      console.log(`before filter body length is:${body.length}`);
      const filtered_body = await ais.createChatCompletion({
        messages: [
          {
            role: 'user',
            content: `Filter the JSON data below according to the filter conditions and return it in the original format.
            Minimize the amount of data as much as possible. 
            The filter condition is: ${filter} 
            JSON data: ${body}
            `
          }
        ]
      });
      console.log('filtered_body', filtered_body)
      if (filtered_body) {
        try {
          result.body = JSON.parse(filtered_body);
        } catch (e) {
          console.log('JSON.parse(filtered_body) error', e);
        }
      }
      console.log(`after filter body length is:${result.body.length}`)
    }
    return JSON.stringify(result);
  } catch (e) {
    console.log(e);
    return 'Failed to access the page';
  }
}

// test
// process.env.CHROME_BIN = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
// access_internet({url: 'https://github.com/jarvis2f/ais-ninja'}).then(console.log);
