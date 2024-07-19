const puppeteer = require('puppeteer');

const getIframe = async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const iframeSrc = await page.evaluate(() => {
            const iframeElement = document.querySelector('iframe');
            return iframeElement ? iframeElement.src : null;
        });

        await browser.close();
        res.json({ iframeSrc });
    } catch (error) {
        console.error('Error fetching iframe:', error);
        res.status(500).send('Error fetching iframe');
    }
};

module.exports = getIframe;