const puppeteer = require('puppeteer');

const customWait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchIframe = async (req, res) => {
    const { url, option } = req.body;
    if (!url || option == null) {
        return res.status(400).send('URL and option are required');
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const optionSelector = `li[data-id="${option - 1}"] a[href="#option${option - 1}"]`;
        console.log('URL:', url);
        console.log('Option:', option);
        console.log('Option Selector:', optionSelector);

        await page.evaluate(selector => {
            document.querySelector(selector).click();
        }, optionSelector);

        await page.waitForFunction(selector => {
            const element = document.querySelector(selector);
            return element && element.closest('li').classList.contains('active');
        }, {}, optionSelector);

        const iframeSrc = await page.evaluate(() => {
            const iframeElement = document.querySelector('iframe');
            return iframeElement ? iframeElement.src : null;
        });

        console.log('Clicked on option:', optionSelector);
        console.log('URL Iframe:', iframeSrc);

        await browser.close();
        res.json({ iframeSrc });
    } catch (error) {
        console.error('Error fetching iframe:', error);
        res.status(500).send('Error fetching iframe');
    }
};

module.exports = fetchIframe;