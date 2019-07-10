const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

const getForecast = (address) => {
    geoCode(address, (error, { latitude, longitude, place_name}) => {
    if(error) {
        return console.log(error)
    }
    forecast(latitude, longitude, (error, forecastData) => {
        if(error) {
            return console.log(error)
        }
        console.log(place_name)
        console.log(forecastData)
    })
})
}

if(address) {
    getForecast(address) 
} else {
    console.log('Please provide a location to view forecast details')
}

