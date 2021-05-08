const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();
 
const withNextEnv = nextEnv();
 
module.exports = withNextEnv({
    images: {
        domains: ['www.themoviedb.org'],
        deviceSizes: [425, 768, 1024, 1440, 1920],
        imageSizes: [300, 500, 780, 1280],
    },
    env: {
        SITENAME: 'DBLATINOHD',
        IMGPATH: 'https://www.themoviedb.org/t/p/',
        URL: 'https://www.dblatinohd.com/',
        NEXT_PUBLIC_GA_ID: 'G-5GCY71NP2R',
        APIURL: 'https://api.dblatinohd.com/api/'
    }
});