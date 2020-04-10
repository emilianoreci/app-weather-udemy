const request = require('request')

const forescast = (latitud, longitud, callback) => {
    const urlByCoordinates =`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=578b9b207452adda800a1903f78249bc`
    request({url:urlByCoordinates, json:true}, (error, response, body) => {
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
       console.log(body)
        if(error) callback('no se puede conectar con el clima', undefined)
        else if (body.error) callback('no se puede encontrar la ubicacion', undefined)
        else callback(undefined, {
            name: body.name,
            temp: body.main.temp
        })
    }) 
}

module.exports = forescast




//const url = `https://api.openweathermap.org/data/2.5/weather?id=3433955&appid=578b9b207452adda800a1903f78249bc`