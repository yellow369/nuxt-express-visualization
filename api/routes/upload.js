const express = require('express');
const router = express.Router();

const multer = require('multer')
const fs = require('fs')
const xlsx = require('node-xlsx')

//修改文件
let change = (path, re) => {
  fs.readFile(path, 'utf-8', function (err, dataStr) {
    // 看 err 是否为 null 来进行判断
    if (err) {
      return console.log('读取文件失败', err.message)
    } else {
      console.log('读取成功')
    }
    // console.log(dataStr);
    if (/(?:(\.txt))/.test(path)) {
      fs.writeFile(re, dataStr, 'utf-8', (err) => {
        if (err) {
          console.log('写入txt失败');
        }
      })
    } else {
      console.log(222);
      let list = xlsx.parse(path)
      fs.writeFileSync(re, xlsx.build(list), 'binary')
    }

    fs.unlink(path, function (error) {
      if (error) {
        console.log(error);
        return false;
      }
      console.log('删除文件成功')
    })
  })
}

router.post('/upload', multer({
  dest: 'upload'
}).single('file'), (req, res) => {
  if (/(?:(\.xlsx))/.test(req.file.originalname)) {
    fs.renameSync(req.file.path, `upload/${req.file.originalname}`)
    // res.send(req.file)
    // console.log(req.file.path);
    change(`upload/${req.file.originalname}`, './upload/me.xlsx')
    res.send('ok')
  } else {
    fs.unlink(req.file.path, function (error) {
      if (error) {
        console.log(error);
        return false;
      }
      console.log('删除文件成功')
    })
    throw new Error('文件类型错误')
  }

})

router.post('/upload/t', multer({
  dest: 'upload'
}).single('file'), (req, res) => {
  console.log(111);
  fs.renameSync(req.file.path, `upload/${req.file.originalname}`)

  change(`upload/${req.file.originalname}`, './upload/port.txt')
  res.send('ok')
})

router.post('/ttt', (req, res) => {
  console.log(ttt);
})

module.exports = router
