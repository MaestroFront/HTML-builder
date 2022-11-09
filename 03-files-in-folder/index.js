const fs = require("fs");
const stat = require("node:fs");
let path = "./03-files-in-folder/secret-folder/";

function returnName(direntName) {
    direntName = direntName.split(".");
    direntName.pop();
    direntName = direntName.join(".");
    return direntName;
};

function returnResolutionFile(direntName) {
    direntName = direntName.split(".");
    return direntName[direntName.length - 1];
};

fs.readdir(`${path}`, { encoding: "utf-8", withFileTypes: true }, (error, dirEntryList) => {

    if (error) throw error;
    dirEntryList.forEach(dirent_1 => {

        fs.stat(`${path}${dirent_1.name}`, function (err, stats) {

            if (err) throw err;
            if (dirent_1.isFile()) {
                console.log(returnName(dirent_1.name) + " - " + returnResolutionFile(dirent_1.name) + " - " + (stats.size / 1024).toFixed(2) + "kb");
            };
        });
    });
});