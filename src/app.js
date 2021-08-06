const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) //for header and footer

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dipak BHusal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dipak Bhusal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Dipak Bhusal'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address)
    {

        return res.send({
            error: 'Please include the address, Its most'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longtitude,location} = {}) =>{ //default added on destructor

        // console.log('error', error)
        // console.log ('data', data)
    
    if(error)
    {
         return res.send({
             error:error
         })
    }
        
        forecast (latitude,longtitude, (error,forecastData) =>{
    
            if (error)
            {
                return res.send({error})
            }
           
            //console.log(forecastData)
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        }) 
    
    })
})

app.get('/products', (req, res)=>{

if(!req.query.search)
{
     return  res.send({
        error: 'You most provide search teram'
    })
}

    res.send({
        products :[]
    })
})

app.get('/help/*' , (req,res)=>{
    res.render('404',{
        title: '404 help',
        name: 'Dipak BHusal',
        errorMessage: 'Help article not found'
    })

})
app.get('*', (req, res)=>{

    res.render('404',{
        title: '404',
        name: 'Dipak BHusal',
        errorMessage: 'page not Found'
    })
})  //* means for 404 pages

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})