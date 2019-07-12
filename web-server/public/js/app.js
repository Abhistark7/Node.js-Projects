console.log('Client side javascipt has been loaded!')

const weatherFetchUrl = '/weather?address='
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

const fetchWeather = (address) => {
    fetch(weatherFetchUrl + encodeURIComponent(address)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return message1.textContent = data.error
            }
            message1.textContent = data.location
            message2.textContent = data.forecast
        })
    })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // Prevent default reloading when form is submitted
    const location = search.value
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetchWeather(location)
})