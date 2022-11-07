const fs = require('fs');
const stat = require('node:fs');
let path = './03-files-in-folder/secret-folder/';

fs.readdir(`${path}`, { encoding: 'utf-8', withFileTypes: true }, (error, dirEntryList) => {
    dirEntryList.forEach(dirent => {
        fs.stat(`${path}${dirent.name}`, function (err, stats) {
            if (dirent.isFile()) {
                direntArray = dirent.name.split('.');
                console.log(direntArray[0] + ' - ' + direntArray[1] + ' - ' + stats.size * 0.001 + 'kb');
            }
        })
    });
});