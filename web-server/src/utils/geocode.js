const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJoaXNoZWtzYWh1IiwiYSI6ImNqeHc4N2R0ZDAyeHczbXBiZTdoM2p6anIifQ.VDNjB2MPxKDOQCGMF_QJbw&limit=1'
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to Geocode services!')
        } else if (response.body.error || response.body.features.length == 0) {
            callback('Unable to find location, try another search')
        } else {
            callback(undefined, {
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].bbox[1],
                longitude: response.body.features[0].bbox[0]
            })
        }
    })
}

module.exports = geoCode