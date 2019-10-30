const mongoose = require('mongoose')
const configureDB=()=>{
    // db configuration - establishing connection to db
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost:27017/june-weekday-notesapp', { useNewUrlParser: true })
        .then(() => {
            console.log('successfully connected to db')
        })
        .catch((err) => {
            console.log('error connecting to db', err)
        })
}



module.exports = configureDB