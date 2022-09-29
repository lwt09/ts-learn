const fs = require('fs');
const util = require('util');
const path = require('path');

// 1. 原生
// fs.readFile(filename[, options], callback)
fs.readFile(
  path.join(__dirname, './test.json'),
  'utf-8',
  (err: any, data: any) => {
    if (err) {
      // throw new Error(err);
    }
    console.log(data);
  }
);

// 2. 封装promise
function readFile(filePath: string) {
  return new Promise((resolve) => {
    //console.log(test);
    fs.readFile(filePath, 'utf8', function (err: any, data: any) {
      // if (err) throw err;

      console.log(data);
      resolve(data);
    });
  });
}

const myReadFile = (fileName: string) =>
  util.promisify(fs.readFile)(fileName, 'utf8');

/**
 * 3. 写出文件
 * fs.writeFile(file, data[, options], callback)
 */
fs.writeFile(
  path.resolve(__dirname, 'fileName.json'),
  JSON.stringify({ name: 'lwt' }),
  'utf8',
  (err: any) => {
    if (err) throw new Error(err);
  }
);

/**
 * 4. 打开浏览器
 */
var child_process = require('child_process');
child_process.exec('start' + ' ' + 'https://www.aliyundrive.com/s/f4pweefi4oE');

