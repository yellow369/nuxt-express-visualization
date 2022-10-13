const express = require('express')

// Create express instance
const app = express()

const timeout = require('connect-timeout')

app.use(timeout(10000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
   if (req.timedout) {
    console.log('404');
   } ;
   next()
}

// Require API routes
const users = require('./routes/users')
const test = require('./routes/test')
const upload = require('./routes/upload')

// Import API Routes
app.use(users)
app.use(test)
app.use(upload)

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
