const { json } = require('body-parser')
const fs = require('fs')
const path = require('path')

const excusesFilePath = path.join(__dirname, '../../public/utils/excuses.json')



const getExcuse = (name = 'Fredrik', callback) => {
    fs.readFile(excusesFilePath, (error, buffer) => {
        if(error) {
            return callback('Could not retrieve excuses file', undefined)
        }
        if(buffer) {
            const excuseToPick = Math.floor(Math.random() * 10)
            const excuseObjArr = JSON.parse(buffer.toString())
            const excuseObj = excuseObjArr[excuseToPick]
            excuseObj.name = name
            callback(undefined, excuseObj)
        }
    })
}



module.exports = getExcuse