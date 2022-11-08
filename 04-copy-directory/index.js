const fs = require("fs");

function createNewFolder(folderName) {

    fs.access("./04-copy-directory/files", fs.F_OK, (err) => {
        if (!err) {
            fs.mkdir(`./04-copy-directory/${folderName}`, err => {});
        }
    });
    console.log("'files-copy' created!");

};

async function deleteFiles(path) {

    fs.readdir(path, { encoding: "utf-8", withFileTypes: true }, (error, dirEntryList) => {
        if (!error) {
            dirEntryList.forEach(dirent => {

                fs.unlink(`${path}${dirent.name}`, err => {
                    if (err) throw err;
                });

            });
        }
    });
    console.log("'files-copy' is cleared!");

};

function copyDir(pathFrom, pathTo) {

    fs.readdir("./04-copy-directory/files", { encoding: "utf-8", withFileTypes: true }, (error, dirEntryList) => {

        if (error) console.log(error);
        dirEntryList.forEach(item => {

            fs.copyFile(`${pathFrom}${item.name}`, `${pathTo}${item.name}`, err => {
                if (err) console.log(err);
            });

        });

    });
    console.log("Files coppied!");

};

createNewFolder("files-copy");
deleteFiles("./04-copy-directory/files-copy/");
copyDir("./04-copy-directory/files/", "./04-copy-directory/files-copy/");