const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();
 
const withNextEnv = nextEnv();
 
module.exports = withNextEnv({
    images: {
        domains: ['www.themoviedb.org']
    },
    env: {
        SITENAME: 'DBLATINOHD',
        IMGPATH: 'https://www.themoviedb.org/t/p/',
        URL: 'https://www.dblatinohd.com/',
        NEXT_PUBLIC_GA_ID: 'G-5GCY71NP2R'
    }
});