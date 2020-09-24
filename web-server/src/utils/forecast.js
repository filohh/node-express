const request = require('request')

const forecast = (location, longitude, callback) => {
   
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + ',us&appid=4e09d7da83f905bdb8db6c62d4005659'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.cod === '404') {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.weather[0].main + ', ' + body.weather[0].description + ' It is currently ' + body.main.temp + ' degress out. ')
        }
    })
}

module.exports = forecast