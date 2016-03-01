var fs = require('fs'),
    execSync = require('child_process').execSync;

/**
 * 创建文件
 * @param  {string} path      file path
 * @param  {string} content   file content
 * @param  {string} msg       create down massage
 * @param  {bool} stringify stringify
 */
var createFile = function(path, content, msg, stringify) {

    if(!fs.existsSync(path)) {

        execSync('touch ' + path); // 创建文件
        execSync('chmod 777 ' + path); // 改变文件权限
        fs.writeFileSync(path, stringify ? JSON.stringify(content) : content);
        console.log(msg);

    }
}

var filePath = process.cwd() + '/test.txt';
var content = 'Hello world!';
createFile(filePath, content, 'down', true);
