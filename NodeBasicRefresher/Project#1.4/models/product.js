const mongoDB = require('mongodb')
const getDb = require('../util/database').getDb 

class Product {
    constructor(title, price, imageURL, description, _id, userID){
        this.title = title
        this.price = price
        this.imageURL = imageURL
        this.description = description
        this._id = _id ? new mongoDB.ObjectId(_id) : null
        this.userID = userID
    }
    save(){
        const db = getDb()
        let dbOperation
        if(this._id){
            dbOperation = db
            .collection('products')
            .updateOne({ _id: this._id}, {$set: this})
        }else{
            dbOperation = db.collection('products').insertOne(this)
        }
        return dbOperation
            .then(result => {
                console.log('UPDATED')
                // console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static fetchAll() {
        const db = getDb()
        return db
            .collection('products').find()
            .toArray()
            .then(products => {
                // console.log(products)
                return products
            })
            .catch(err => {
                console.log(err)
            })
    }

    static findById(prodID){
        const db = getDb()
        return db
            .collection('products')
            .find({ _id: new mongoDB.ObjectID(prodID) })
            .next()
            .then(product => {
                // console.log(product)
                return product
            })
            .catch(err => {
                console.log(err)
            })
    }

    static deleteById(prodID){
        const db = getDb()
        return db
            .collection('products')
            .deleteOne({ _id: new mongoDB.ObjectID(prodID)})
            .then(result => { 
                // console.log(result) 
            })
            .catch(err => { console.log(err) })
    }
}

module.exports = Product