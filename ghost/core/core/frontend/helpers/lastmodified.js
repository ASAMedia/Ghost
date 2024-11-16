// ### File lastmodified Helper
// `{{lastModified}}`
// Outputs lastModified Date for files
const moment = require('moment');
const {SafeString} = require('../services/handlebars');
const fs = require('fs');

module.exports = function lastmodified(filePath) {
        try {
            const stats = fs.statSync(filePath);
            const mtime = stats.mtime;
            const formattedDate = moment(mtime).format('[Stand:] DD.MM.YY [ • ] HH:mm');
            return new SafeString(formattedDate);
        } catch (err) {
            console.error('File not found or error:', err);
            return new SafeString('0');
        }
    
};