const express = require('express')

// Create express instance
const app = express()

const timeout = require('connect-timeout')

app.use(timeout(15000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
   if (req.timedout) {
    console.log('404');
   } ;
   next()
}

// Require API routes
const upload = require('./routes/upload')
const xlsx = require('./routes/xlsx')
const txt = require('./routes/txt')
const request = require('./routes/request')
const video = require('./routes/video')

// Import API Routes
app.use(upload)
app.use(xlsx)
app.use(txt)
app.use(request)
app.use(video)
app.use('/upload', express.static(__dirname + 'upload'));

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
