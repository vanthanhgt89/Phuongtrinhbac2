const express = require('express')
const fs = require('fs')
const path = require('path')
const expressVue = require('express-vue')

const app = express()

// Su dung css, js cua front-end
app.use('/public', express.static('public'))

// cau hinh cho express-vues
app.engine('vue', expressVue)

app.set('view engine', 'vue')

app.set('views', path.jojn(___dirname, '/views'))

app.set('vue', {
	componentsDir: path.join(__dirname, '/views/components'),
	defaultLayout: 'layout'
});

// ----- Body parser-----
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}))
