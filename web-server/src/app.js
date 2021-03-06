const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const app = express()

const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.render("index", {
    title:'Home Page',
    name: "Anfilofio Coutinho",
  });
    
})

app.get('/about', (req, res) => {
  res.render("about", {
    title: 'About Page',
    name: "Anfilofio Coutinho",
  });
})

app.get('/help', (req, res) => {
  res.render("help", {
    title: 'Help Page',
    name: "Anfilofio Coutinho",
  });
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    })
  }
  const address = req.query.address
  geocode(address, (error, {latitude, longitude, location }) => {
    if (error) {
      return res.send(error)
    }
    
    forecast(address, longitude, (error, forecastData) => {
      if (forecastData === undefined) {
        return res.send({
          Location: address,
          Forecast: 'Local indefinido'
        })
      }
      
      return res.send({
        Location: location,
        Forecast: forecastData,
        })
      })
     
    })
  })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})