const fs = require('fs')

// 删除原有txt
function deletetxt (req, res, next)  {
  console.log('txt');
  fs.readdir('./upload', (err, files) => {
    if (err) {
      console.log(err.message);
      throw new Error('读取文件错误')
    }
    // console.log(files);
    files.forEach((e) => {
      if (/(?:(\.txt))/.test(e)) {
        fs.unlink(`./upload/${e}`, (err) => {
          if (err) {
            console.log(err);
            return false;
          }
          console.log('删除txt成功')
        })
      }
    })
    next()
  })
}
// 删除原有视频
function deletevideo (req, res, next)  {
  console.log('deletevideo');
  fs.readdir('./upload', (err, files) => {
    if (err) {
      console.log(err.message);
      throw new Error('读取文件错误')
    }
    // console.log(files);
    files.forEach((e) => {
      if (/(?:(\.mp4))/.test(e)) {
        fs.unlink(`./upload/${e}`, (err) => {
          if (err) {
            console.log(err);
            return false;
          }
          console.log('删除视频成功')
        })
      }
    })
    next()
  })
}

module.exports = {deletetxt,deletevideo}
  