const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const dbURI = 'mongodb+srv://adrianpearman:REDbull45!@cluster0-9alum.mongodb.net/test?retryWrites=true'
let _db 

const mongoConnect = (callback) => {
    MongoClient.connect(dbURI)
    .then(client => {
        console.log('Connected')
        _db = client.db('shop')
        callback()
    })
    .catch(err => {
        console.log(err)
        throw err
    })   
}

const getDb = () => {
    if(_db){
        return _db
    }
    throw 'No database found'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb


