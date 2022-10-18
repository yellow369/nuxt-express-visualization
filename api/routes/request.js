import axios from "axios";

const { Router } = require('express')

const router = Router()

// 
router.post('/request/volume', (req, res) => {
  
  axios.post('https://infor.i.sinotrans.com/inforom/rest',{
    "method": "executeSql",
    "sqlDescript": "WH051KB_QueryVolume"
} ).then((data) => {
  console.log('成功');

  res.send(data.data)
}).catch((err) => {
  console.log(err);
})
})

module.exports = router