
const { Router } = require('express')

const router = Router()

const multer = require('multer')
const fs = require('fs')
const xlsx = require('node-xlsx')

const {deletetxt,deletevideo} = require('../mid/deletefile')

//修改文件
let change = (path, code, re) => {
  fs.readFile(path, code, function (err, dataStr) {
    // 看 err 是否为 null 来进行判断
    if (err) {
      return console.log('读取文件失败', err.message)
    } else {
      console.log('读取成功')
    }
    // console.log(dataStr);
    if (/(?:(\.txt))/.test(path)) {
      fs.writeFile(re, dataStr, code, (err) => {
        if (err) {
          console.log('写入txt失败');
        }
      })
    } else {
      console.log(path);
      let list = xlsx.parse(path)
      fs.writeFileSync(re, xlsx.build(list), code)
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
    change(`upload/${req.file.originalname}`, 'binary', './upload/me.xlsx')
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

//txt
router.post('/upload/t', deletetxt, multer({ dest: 'upload',
fileFilter(req, file, callback) {
  // 解决中文名乱码的问题
  file.originalname = Buffer.from(file.originalname, "latin1").toString(
    "utf8"
  );
  callback(null, true);
}
}).single('file'), (req, res) => {
  console.log('txt upload');
  // console.log(req.file);
  fs.renameSync(req.file.path, `upload/${req.file.originalname}`)
  // change(`upload/${req.file.originalname}`,'utf-8', './upload/port.txt')
  res.send('ok')

})

// 安全事故
router.post('/upload/security', multer({
  dest: 'upload'
}).single('file'), (req, res) => {
  if (/(?:(\.xlsx))/.test(req.file.originalname)) {
    fs.renameSync(req.file.path, `upload/${req.file.originalname}`)
    change(`upload/${req.file.originalname}`, 'binary', './upload/security.xlsx')
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

// 检查
router.post('/upload/check', multer({
  dest: 'upload'
}).single('file'), (req, res) => {
  if (/(?:(\.xlsx))/.test(req.file.originalname)) {
    fs.renameSync(req.file.path, `upload/${req.file.originalname}`)
    change(`upload/${req.file.originalname}`, 'binary', './upload/check.xlsx')
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

// 原材料预约
router.post('/upload/order', multer({
  dest: 'upload'
}).single('file'), (req, res) => {
  if (/(?:(\.xlsx))/.test(req.file.originalname)) {
    fs.renameSync(req.file.path, `upload/${req.file.originalname}`)
    change(`upload/${req.file.originalname}`, 'binary', './upload/order.xlsx')
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

// 原材料库位
router.post('/upload/stock', multer({
  dest: 'upload'
}).single('file'), (req, res) => {
  if (/(?:(\.xlsx))/.test(req.file.originalname)) {
    fs.renameSync(req.file.path, `upload/${req.file.originalname}`)
    change(`upload/${req.file.originalname}`, 'binary', './upload/stock.xlsx')
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

// 视频
router.post('/upload/video', deletevideo, multer({
  dest: 'upload',
  fileFilter(req, file, callback) {
    // 解决中文名乱码的问题
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    callback(null, true);
  }
}).single('file'), (req, res) => {
  console.log('video upload');
  // console.log(req.file);
  fs.renameSync(req.file.path, `upload/安全视频.mp4`)
  res.send('ok')

})

router.post('/upload/test',  (req, res) => {
  console.log('txt upload');
  // console.log(req.file);
  // fs.renameSync(req.file.path, `upload/1.txt`)
  // change(`upload/${req.file.originalname}`,'utf-8', './upload/port.txt')
  res.send('test ok')

})

module.exports = router
