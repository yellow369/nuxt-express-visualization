const { Router } = require('express')

const fs = require('fs')

const router = Router()

// txt
router.post('/txt/report/content', (req, res) => {
  
  fs.readdir('./upload', (err, files) => {
    if (err) {
      console.log(err.message);
      throw new Error('读取文件错误')
    }
    // console.log(files);
    files.forEach((e) => {
      if (/(?:(\.txt))/.test(e)) {
        fs.readFile(`./upload/${e}`, 'utf-8',(err, dataStr) => {
          if (err) {
            console.log(err.message);
          }
          console.log('txt 内容');
          res.send(dataStr)
        })
      }
    })
  })
})


router.post('/txt/report/title', (req, res) => {
  
  fs.readdir('./upload', (err, files) => {
    if (err) {
      console.log(err.message);
      throw new Error('读取文件错误')
    }
    // console.log(files);
    files.forEach((e) => {
      if (/(?:(\.txt))/.test(e)) {
        fs.readFile(`./upload/${e}`, 'utf-8',(err, dataStr) => {
          if (err) {
            console.log(err.message);
          }
          console.log('txt 文件名');
          res.send(e)
        })
      }
    })

  })
})



module.exports = router
