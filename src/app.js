const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forescast')

const app = express()

//Acceso a variable entorno para heroku  o cuando corro en local, que lo haga en el puerto 3000
const port = process.env.PORT || 3000


//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))

//indico la ruta para que sirva los archivos estaticos: html y css.
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//seteo el motor de vistas dinamico handlebar
app.set('view engine', 'hbs')

//la carpeta donde estan los hbs, por defecto express los buscara con el nombre views, 
//pero puedo cambiarlo a por ej templates.
app.set('views', viewsPath)

hbs.registerPartials(partialPath)

app.listen(port, () => {
    console.log('server is up!!' + port) 
})

/* 
app.get('', (req, res) => {
    res.send('Hello express')
})
*/

app.get('', (req, res) => {
    res.render('index', {
        title: 'title dinamic with hbs',
        footerName: 'Banana'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        titulo: 'Help !!',
        footerName: 'Banana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        titulo: 'About the creator !!',
        footerName: 'Banana'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        //aca el return si no pasa un address envia msj y termina ahi
        return res.send('no ha ingresado un address!!')
    }
    const city = req.query.address

    //importante:usar destructing en el 2°arg del callback, para latitud, longtitud...
    geocode(city, (error, { latitud, longtitud, location } = {}) => {
        if (error) {
            //return console.log('Error en geocode, tipo : ', err)
            return res.send({error})
        }

        forecast(latitud, longtitud, (err, dataForecast) => {
            if (error) {
                //return console.log('Error --->: ', err)
                return res.send({error})
            }
            console.log('Datos del Pronostico: ', dataForecast)
            res.send(dataForecast)
        })
    })
})

/*******************************************************
 * VERSION 2 MAS SIMPLE DEL ANTERIOR CON DESTRUCTURING *
 *******************************************************/

/* 
app.get('/weather', (req, res) => {
    console.log(req.query)
    if (!req.query.address){
        //aca el return si no pasa un address envia msj y termina ahi
        return res.send('no ha ingresado un address!!')
    }
    const city = req.query.address

    geocode(city, (err, coordenadas) => {
        if (err) {
            return console.log('Error tipo: ', err)
        }
        console.log('------', coordenadas.longtitud)
        console.log('------', coordenadas.latitud)
        console.log('------', coordenadas.location)
 
       forecast(coordenadas.latitud, coordenadas.longtitud, (err, dataForecast) => {
           if (err) {
               return console.log('Error --->: ', err)
           }
           console.log('Datos del Pronostico: ', dataForecast)
           res.send(dataForecast)
       }) 
    })
})
 */










/***********
 * COMODIN *
 ***********/

//localhost:3000/help/loQueSea no existe, enviamos msj.
app.get('/help/*', (req, res) => {
    //res.send('Error 404. Page not found')
    res.render('page404',{
        message: 'Help article not found :('
    })
}) 
//Debe de ir ultimo xq express empieza a chequear las path de los metodos, y lo que hace es 
//que sirve de comodin, ya que si el usuario ingresa una ruta no existente se le puede enviar msj
app.get('*', (req, res) => {
    res.render('page404', {
        message: 'Page Not Found gilun :('
    })
}) 