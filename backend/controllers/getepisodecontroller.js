const puppeteer = require('puppeteer');

const customWait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getEpisodes = async (req, res) => {
    const { sortOrder } = req.query;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www3.animeflv.net/anime/one-piece-tv', { waitUntil: 'networkidle2' });

        const episodes = await page.evaluate(() => {
            const episodeList = [];
            const episodeElements = document.querySelectorAll('ul.ListCaps li a');
            episodeElements.forEach(el => {
                const titleElement = el.querySelector('h3.Title');
                const episodeElement = el.querySelector('p');
                const imgElement = el.querySelector('img');

                if (titleElement && episodeElement && imgElement) {
                    const episode = {
                        title: titleElement.innerText,
                        episode: episodeElement.innerText,
                        link: el.href,
                        thumbnail: imgElement.getAttribute('data-src')
                    };
                    episodeList.push(episode);
                }
            });
            return episodeList;
        });

        const highestEpisode = episodes.reduce((max, episode) => {
            const num = parseInt(episode.episode.replace(/\D/g, ''));
            return num > max ? num : max;
        }, 0);

        const existingEpisodes = new Set(episodes.map(ep => parseInt(ep.episode.replace(/\D/g, ''))));

        for (let i = highestEpisode - 1; i > 0; i--) {
            if (!existingEpisodes.has(i)) {
                const episode = {
                    title: "One Piece",
                    episode: `Episodio ${i}`,
                    link: `https://www3.animeflv.net/ver/one-piece-tv-${i}`,
                    thumbnail: `https://cdn.animeflv.net/screenshots/7/${i}/th_3.jpg`
                };
                episodes.push(episode);
            }
        }

        episodes.sort((a, b) => {
            const numA = parseInt(a.episode.replace(/\D/g, ''));
            const numB = parseInt(b.episode.replace(/\D/g, ''));
            return sortOrder === 'asc' ? numA - numB : numB - numA;
        });

        await browser.close();
        res.json(episodes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching episodes');
    }
};

module.exports = getEpisodes;