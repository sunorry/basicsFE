var fs = require('fs'),
    execSync = require('child_process').execSync;

var createFile = function(path, content, msg, stringify) {

    if(!fs.existsSync(path)) {

        execSync('touch ' + path);
        execSync('chmod 777 ' + path);
        fs.writeFileSync(path, stringify ? JSON.stringify(content) : content);
        console.log(msg);

    }
}

var filePath = process.cwd() + '/test.txt';
var content = 'Hello world!';
createFile(filePath, content, 'down');
