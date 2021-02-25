const fs = require('fs');
const path = require('path');

const config = require('../../../../shared/config');

function groupBy(key) {
  return function group(array) {
    return array.reduce((acc, obj) => {
      const property = new Date(obj[key]).toISOString().slice(0, 7);
      acc[property] = acc[property] || [];
      acc[property].push(obj);
      return acc;
    }, {});
  };
}

function getAllFiles(dirPath, arrayOfFiles){
  files = fs.readdirSync(dirPath);
    
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      let element=new Object();
      element.fullLink=`${config.get('url')}/${path.join(dirPath, '/', file)}`;
      element.filePath=`${path.join(dirPath, '/', file)}`;
      element.extension= file.split('.').pop();
      element.name=file;
      element.lastModified=fs.statSync(dirPath + '/' + file).mtime;
      arrayOfFiles.push(element);
    }
  })
  arrayOfFiles.sort(function(a,b) {return (a.lastModified > b.lastModified) ? -1 : ((b.lastModified > a.lastModified) ? 1 : 0);} );
  return arrayOfFiles;
}

module.exports = function (req, res, next) {
  if(req.path==='/content/api/files/listall/'){
    const groupByLastModified = groupBy('lastModified');
    return res.send(groupByLastModified(getAllFiles('./content/files')));
  }
  if(req.path==='/content/api/timetable/listall/'){
    const groupByLastModified = groupBy('lastModified');
    return res.send(groupByLastModified(getAllFiles('./content/timetables')));
  }
  next()
    
};
