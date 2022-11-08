const fs = require("fs");
const path = require("path");
const folder = path.join(__dirname, "files");
const newFolder = path.join(__dirname, "files-copy");

function createNewFolder() {
    fs.access(folder, fs.F_OK, (err) => {
        if (!err) fs.mkdir(newFolder, err => {});
    });
    console.log("'files-copy' created!");
};

function deleteFiles() {
    fs.readdir(`${newFolder}/`, { encoding: "utf-8", withFileTypes: true }, (error, dirEntryList) => {
        if (!error) {
            dirEntryList.forEach(dirent => {
                fs.unlink(`${newFolder}/${dirent.name}`, err => {
                    if (err) throw err;
                });
            });
        }
    });
    console.log("'files-copy' is cleared!");
};

function copyDir() {
    fs.readdir(folder, { encoding: "utf-8", withFileTypes: true }, (error, dirEntryList) => {
        if (error) console.log(error);
        dirEntryList.forEach(item => {
            fs.copyFile(`${folder}/${item.name}`, `${newFolder}/${item.name}`, err => {
                if (err) console.log(err);
            });
        });
    });
    console.log("Files coppied!");
};

createNewFolder();
deleteFiles();
copyDir();