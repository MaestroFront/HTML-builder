const fs = require('fs');

function createNewFolder(folderName) {
    fs.mkdir(`./04-copy-directory/${folderName}`, err => {
        if (err) {
            console.log('The folder has already been created!');
        } else {
            console.log(`Created folder "${folderName}" is successfully!`);
        }
    });
};
createNewFolder('files-copy');

function copyFile(headFolder, pathFrom, pathTo) {
    headFolder.forEach(item => {
        fs.copyFile(`${pathFrom}${item.name}`, `${pathTo}${item.name}`, err => {
            if (err) console.log(err);
            console.log(`"${item.name}" has been copied or updated!`)
        })
    });
};

fs.readdir('./04-copy-directory/files', { encoding: 'utf-8', withFileTypes: true }, (error, dirEntryList) => {
    if (error) console.log(error);
    copyFile(dirEntryList, './04-copy-directory/files/', './04-copy-directory/files-copy/');
});