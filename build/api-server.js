var express = require('express')
var request = require('request')
var port = (process.env.PORT || 5000)

var app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
app.get('/', (req, res) => {
  res.end('Hello Heroku.')
})
// Movie
app.get('/movie_annual2016', function (req, res) {
  request(`https://movie.douban.com/ithil_j/activity/movie_annual2016`, function (err, response, body) {
    res.end(body)
  })
})
app.get('/movie_annual2016/widget', function (req, res) {
  var nth = (req.query.nth || 0)
  request(`https://movie.douban.com/ithil_j/activity/movie_annual2016/widget/${nth}`, function (err, response, body) {
    res.end(body)
  })
})

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})
var server = app.listen(port)
module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
