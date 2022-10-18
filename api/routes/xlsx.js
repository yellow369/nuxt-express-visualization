const { Router } = require('express')

const fs = require('fs')
const xlsx = require('node-xlsx')
const router = Router()

// 安全事故
router.post('/xlsx/security', (req, res) => {
  fs.readFile('./upload/security.xlsx', 'binary', (err, dataStr) => {
    if(err) {
      console.log('读取失败' + err.message);
    } else {
      console.log('读取成功');
    }
    let list = xlsx.parse('./upload/security.xlsx')
    res.send(list)
  })
  console.log('xlsx');
})

// 检查
router.post('/xlsx/check', (req, res) => {
  fs.readFile('./upload/check.xlsx', 'binary', (err, dataStr) => {
    if(err) {
      console.log('读取失败' + err.message);
    } else {
      console.log('读取成功');
    }
    let list = xlsx.parse('./upload/check.xlsx')
    res.send(list)
  })
  console.log('xlsx');
})

// 原材料预约
router.post('/xlsx/order', (req, res) => {
  console.log('原材料');
  fs.readFile('./upload/order.xlsx', 'binary', (err, dataStr) => {
    if(err) {
      console.log('读取失败' + err.message);
    } else {
      console.log('读取成功');
    }
    let list = xlsx.parse('./upload/order.xlsx')
    res.send(list)
  })
  console.log('xlsx');
})

// 原材料库存
router.post('/xlsx/stock', (req, res) => {
  console.log('原材料');
  fs.readFile('./upload/stock.xlsx', 'binary', (err, dataStr) => {
    if(err) {
      console.log('读取失败' + err.message);
    } else {
      console.log('读取成功');
    }
    let list = xlsx.parse('./upload/stock.xlsx')
    res.send(list)
  })
  console.log('xlsx');
})

module.exports = router
