const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //customized location of the views 
const partialsPath = path.join(__dirname, '../templates/partials') //customized location of the partials

//Setup handellbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //customized location of the views
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
  res.render('index' ,{
    title: 'Weather',
    name: 'Grumpypole'
  })
})

app.get('/about', (req, res) =>{
  res.render('about' ,{
    title: 'About',
    name: 'Grumpypole'
  })
})

app.get('/help', (req, res) =>{
  res.render('Help' ,{
    helpText: 'This is my help file',
    title: 'Help',
    name: 'Grumpypole'})
  })
  
  app.get('/weather', (req, res) =>{
    if (!req.query.address) {
      return res.send({
        error: 'You must provide a valid address'
      })
      
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

      if (error) {
        return res.send({error})
      }

      forecast(latitude,longitude, (error, forecastData) => {
        if (error) {
          return res.send ({error})
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        })
      });
    });
  })

app.get('/products', (req, res) =>{
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    })
  }
 console.log(req.query.search)
  res.send({
    products: []
  })
  
})
app.get('/help/*', (req, res) =>{
   res.render('404' ,{
     title: 404,
    message: 'Help article not found',
    name: 'Grumpypole'})
})



app.get('*', (req, res) =>{
    res.render('404' ,{
      title: 404,
      message: 'Page not Found',
      name: 'Grumpypole'})
})


// app.get('', (req, res) =>{
//   res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) =>{
//   res.send([{
//     name: 'Grumpy',
//     age: 65
//   },
// {
//   name: 'Sarah'
// }])
// })
// app.get('/about', (req, res) =>{
//   res.send('<h1>About the weather</h1>')
// })



//app.com 
//app.com/help
//app.com/about

app.listen(3000, () =>{
  console.log('Server is up on port 3000')
})
