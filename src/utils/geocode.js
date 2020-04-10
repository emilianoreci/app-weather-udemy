const request = require('request');

const geocode = (address, callback) => {
    const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYmF0YW1hbjkxMSIsImEiOiJjazhrazV1c28wMnM5M2twZ2libWh2NzJxIn0.C8BrwmLqJnu-0Ud7YXqMiw&limit=1`
    
    request({url:url, json:true}, (error, {body}) => {
        //console.log(response.body.features[0].center[1])

        if (error){
            callback('hay un error en la peticion/conexion', undefined) //no hay conexion a internet.
        }
        else if (body.features.length === 0){
            callback('no se puede encontrar la region', undefined)
        }
        else{
            callback(undefined, {
                latitud : body.features[0].center[1],
                longtitud : body.features[0].center[0],
                location : body.features[0].place_name
            })
        } 
    })
}

module.exports = geocode