const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');

scrape({
    urls: ['https://www.instagram.com/gopro/'],
    directory: '/path/to/save',
    plugins: [
        new PuppeteerPlugin({
            launchOptions: { headless: false }, /* optional */
            scrollToBottom: { timeout: 10000, viewportN: 10 } /* optional */
        })
    ]
});