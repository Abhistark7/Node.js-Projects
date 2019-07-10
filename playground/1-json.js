const fs = require('fs')
// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJson = dataBuffer.toString()
// const data = JSON.parse(dataJson)

// console.log(data.author)

const loadJSON = fs.readFileSync('1-json.json').toString()
const loadData = JSON.parse(loadJSON)

console.log(loadData.name)

loadData.name = 'A'
loadData.age = '22'

fs.writeFileSync('1-json.json', JSON.stringify(loadData))
