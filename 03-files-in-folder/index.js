const fs = require("fs");
const stat = require("node:fs");
let path = "./03-files-in-folder/secret-folder/";

fs.readdir(`${path}`, { encoding: "utf-8", withFileTypes: true }, (error, dirEntryList) => {

    if (error) throw error;
    dirEntryList.forEach(dirent_1 => {

        fs.stat(`${path}${dirent_1.name}`, function (err, stats) {

            if (err) throw err;
            if (dirent_1.isFile()) {
                direntArray = dirent_1.name.split(".");
                console.log(direntArray[0] + " - " + direntArray[1] + " - " + stats.size * 0.001 + "kb");
            };
        });
    });
});