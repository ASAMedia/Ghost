const UrlUtils = require('@tryghost/url-utils');
const config = require('./config');

const DEFAULT_GHOST_API_VERSION = 'v4';

const urlUtils = new UrlUtils({
    getSubdir: config.getSubdir,
    getSiteUrl: config.getSiteUrl,
    getAdminUrl: config.getAdminUrl,
    apiVersions: config.get('api:versions'),
    defaultApiVersion: config.get('api:versions:default'),
    slugs: config.get('slugs').protected,
    redirectCacheMaxAge: config.get('caching:301:maxAge'),
    baseApiPath: '/ghost/api'
});

module.exports = urlUtils;
