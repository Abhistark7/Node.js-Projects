const request = require('request')
const chalk = require('chalk')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/428b1b181b0599c9bf64ae73fab491ba/' + lat + ',' + long + '?units=si&lang=en'
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!')
        } else if (body.error) {
            callback('Unable to find location!. Try another search...')
        } else {
            callback(undefined, body.daily.data[0].summary +
                ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast