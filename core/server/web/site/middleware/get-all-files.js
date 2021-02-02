const fs = require('fs');
const path = require('path');

const config = require('../../../../shared/config');

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
      arrayOfFiles.push(element);
    }
  })

  return arrayOfFiles;
}

module.exports = function (req, res, next) {
  if(req.path==='/content/api/files/listAll/'){
    return res.send(getAllFiles('./content/files'));
  }
  if(req.path==='/content/api/timetable/listAll/'){
    return res.send(getAllFiles('./content/timetables'));
  }
  next()
    
};
