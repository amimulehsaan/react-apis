const fs = require("fs");
const through2 = require("through2");
const replace = require('replace-in-file');
const path = require("path");
const filePath = path.join(global.__rootDir, "files");
const options = {
    files: [filePath + '/themeconfig.txt', filePath + '/**/themeconfig.txt'],
    from: /amim/g,
    to: 'hola',
};
class FileStreamThroughController{
    static async modifyFile(){
        await replace(options);
    }

    static modifyFiles() {
        fs.createReadStream('reactApis/controller/ex.txt')
            .pipe(through2(function (chunk, enc, callback) {
                for (let i = 0; i < chunk.length; i++)
                    if (chunk[i] == 97)
                        chunk[i] = 122 // swap 'a' for 'z'

                this.push(chunk)

                callback()
            }))
            .pipe(fs.createWriteStream('reactApis/controller/ex.txt'))
            .on('finish', () => doSomethingSpecial())
    }
    
};
function doSomethingSpecial(){
    console.log("done deal");
}
module.exports = FileStreamThroughController;
