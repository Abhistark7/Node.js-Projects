const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('Note successfully added...')
    } else {
        console.log('Another note with the same title exists, please change the title and add again!')
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNotes = (title) => {
    const searchNotes = loadNotes().find((note) => note.title === title)
    if (!searchNotes) {
        console.log(chalk.red('No note found!'))
    } else {
        deleteNotes(title)
    }
}

const deleteNotes = (title) => {
    const filteredNotes = loadNotes().filter((note) => note.title !== title)
    saveNotes(filteredNotes)
    console.log(chalk.green('Note deleted'))
}

const listNotes = () => {
    console.log(chalk.bgBlue('Your notes...\n'))
    loadNotes().forEach(note => {
        console.log(chalk.bgGreen("Title")
            + " "
            + chalk.blue(note.title)
            + " " + chalk.bgRed("Body")
            + " " + chalk.white(note.body)
            + ' \n')
    });
}

const readNote = (title) => {
    const duplicateNote = loadNotes().find((note) => note.title === title)
    if (duplicateNote) {
        console.log(chalk.bgGreen("Title") + " "
            + chalk.blue(duplicateNote.title)
            + " "
            + chalk.bgRed("Body")
            + " "
            + chalk.white(duplicateNote.body)
            + ' \n')
    } else {
        console.log(chalk.bgRed('No note found with title : ' + title))
    }
}

module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}