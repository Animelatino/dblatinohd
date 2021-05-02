const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();
 
const withNextEnv = nextEnv();
 
module.exports = withNextEnv({
    images: {
        domains: ['www.themoviedb.org'],
        deviceSizes: [40, 53, 140, 162, 182, 192, 236, 250, 280],
        imageSizes: [40, 53, 140, 162, 182, 192, 236, 250, 280],
    },
    env: {
        SITENAME: 'DBLATINOHD',
        IMGPATH: 'https://www.themoviedb.org/t/p/',
        URL: 'https://www.dblatinohd.com/',
        NEXT_PUBLIC_GA_ID: 'G-5GCY71NP2R',
        APIURL: 'https://api.dblatinohd.com/api/'
    }
});