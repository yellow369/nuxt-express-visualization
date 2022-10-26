const {
  Router
} = require('express')

const fs = require('fs')

const router = Router()


// function readBigFileEntry(filename, response) {
//   path.exists(filename, function (exists) {
//     if (!filename || !exists) {
//       response.writeHead(404);
//       response.end();
//       return;
//     }

//     var readStream = fs.ReadStream(filename);

//     var contentType = 'none';
//     var ext = path.extname(filename);
//     switch (ext) {
//       case ".flv":
//         contentType = "video/flv";
//         break;
//     }

//     response.writeHead(200, {
//       'Content-Type': contentType,
//       'Accept-Ranges': 'bytes',
//       'Server': 'Microsoft-IIS/7.5',
//       'X-Powered-By': 'ASP.NET'
//     });

//     readStream.on('close', function () {
//       response.end();
//       console.log("Stream finished.");
//     });
//     readStream.pipe(response);
//   });
// }

let streamVideo = (req, res) => {
  const range = req.headers.range;
  const videoId = req.params.videoId; // ID或者视频文件名称
  if (!range) {
    res.status(400).send("无效Range");
  }
  // const processPath = process.cwd(); // 获取服务运行路径
  const videoPath = `./upload/安全视频.mp4`;
  const videoSize = fs.statSync(videoPath).size;
  const chunkSize = 10 ** 6; // 1 mb
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, {
    start,
    end
  });
  videoStream.pipe(res);
};


// video
router.get('/video', (req, res) => {
  //  fs.readFile(`./upload/安全视频.mp4`, 'binary', (err, data) => {
  //   if(err) {
  //     return console.log('读取文件失败', err.message)
  //   }
  //   res.send(data)
  //  })
  const cs = fs.createReadStream('./upload/安全视频.mp4');
  cs.on("data", chunk => {
    res.write(chunk);
  })
  cs.on("end", () => {
    res.status(200);
    res.end();
  })

})





module.exports = router
