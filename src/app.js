const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')
const getExcuse = require('./utils/excuses')

//Initialize express
const app = express()

// Setup paths
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars with express, templating engine and the views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    getExcuse(undefined, (error, {name, excuse}) => {
        if(error) {
            return res.send({error: error})
        }
        res.render('index', {
            title:'Ursäktsgeneratorn',
            excuseString: `${name} ${excuse}`
        })
    })
    
   
})

app.get('/excuseApi', (req, res) => {
    let nameFromQuery = undefined
    if(req.query.name) {
        nameFromQuery = req.query.name
    }
    
    getExcuse(nameFromQuery, (error, {name, excuse}) => {
        if(error) {
            return res.send({error: error})
        }
        return res.send({
            name,
            excuse
        })
    })
})

const getExcuseFromApi = () => {
    const url = '/excuseApi'
    request({url, json: true}, (error, {name, excuse} = {}) => {
        if(error) {
            return {error}
        }
        return {
            name,
            excuse
        }
    })
}


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})