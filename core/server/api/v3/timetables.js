const Promise = require('bluebird');
const storage = require('../../adapters/storage');

module.exports = {
    docName: 'timetables',
    upload: {
        statusCode: 201,
        permissions: false,
        query(frame) {
            frame.file.name='timetable';
            const store = storage.getStorage();
            if (frame.files) {
                return Promise
                    .map(frame.files, file => {frame.file.name='timetable';store.save(file);})
                    .then(paths => paths[0]);
            }
            return store.save(frame.file);
        }
    }
};
