console.log('Client side javascipt has been loaded!')

const weatherFetchUrl = '/weather?address='
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')
const message4 = document.querySelector('#message-4')

const fetchWeather = (address) => {
    fetch(weatherFetchUrl + encodeURIComponent(address)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return message1.textContent = data.error
            }
            message1.textContent = data.location
            message2.textContent = data.forecast
            message3.textContent = 'UV Index : ' + data.uvIndex
            message4.textContent = 'Visibility : ' + data.visibility
        })
    })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // Prevent default reloading when form is submitted
    const location = search.value
    message1.textContent = 'Loading...'
    message2.textContent = ''
    message3.textContent = ''
    message4.textContent = ''
    fetchWeather(location)
})