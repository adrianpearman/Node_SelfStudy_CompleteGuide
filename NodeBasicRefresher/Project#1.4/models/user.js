const mongoDB = require('mongodb')
const getDb = require('../util/database').getDb
const ObjectID = mongoDB.ObjectID

class User {
    constructor(username, email, cart, id) {
        this.name = username
        this.email = email
        this.cart = cart
        this._id = id
    }

    save() {
        const db = getDb()
        let dBOperation
        return dBOperation = db
            .collection('users')
            .insertOne(this)
    }

    addToCart(product) {
        // const updatedCartItems = [{ productID: new ObjectID(product._id), quantity: 1 }]

        // const updatedCart = {
        //     items: updatedCartItems
        // }

        // const db = getDb()
        // return db.collection('users')
        //     .updateOne(
        //         { _id: new ObjectID(this._id) },
        //         { $set: { cart: updatedCart } }
        //     )      

        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productID.toString() === product._id.toString()
        })

        let newQuantity = 1
        const updatedCartItems = [...this.cart.items]

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1
            updatedCartItems[cartProductIndex].quantity = newQuantity
        } else {
            updatedCartItems.push({
                productID: new ObjectID(product._id),
                quantity: newQuantity
            })
        }

        const updatedCart = {
            items: updatedCartItems
        }

        const db = getDb()
        return db.collection('users')
            .updateOne(
                { _id: new ObjectID(this._id) },
                { $set: { cart: updatedCart } }
            )
    }

    addOrder() {
        const db = getDb()
        return this.getCart()
            .then(products => {
                console.log(this)
                const order = {
                    items: products,
                    user: {
                        _id: new ObjectID(this._id),
                        name: this.name,
                    }
                }
                return db
                    .collection('orders')
                    .insertOne(order)
            })
            .then(result => {
                this.cart = { items: [] }
                return db
                    .collection('users')
                    .updateOne(
                        { _id: new ObjectID(this._id) },
                        { $set: { cart: { items: [] } } }
                    )
            })
    }

    deleteItemFromCart(productID) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productID.toString() !== productID.toString()
        })
        const db = getDb()
        return db.collection('users')
            .updateOne(
                { _id: new ObjectID(this._id) },
                { $set: { cart: updatedCartItems } }
            )

    }

    getCart() {
        const db = getDb()
        const productIDs = this.cart.items.map(index => {
            return index.productID
        })
        return db
            .collection('products')
            .find({ _id: { $in: productIDs } })
            .toArray()
            .then(products => {
                return products.map(product => {
                    return {
                        ...product,
                        quantity: this.cart.items.find(index => {
                            return index.productID.toString() === product._id.toString()
                        })
                    }
                })
            })
            .catch(err => { console.log(err) })
    }

    getOrders() {
        const db = getDb()
        return db
            .collection('orders')
            .find({ 'user._id': new ObjectID(this._id) })
            .toArray()
    }

    static findById(userID) {
        const db = getDb()
        return db
            .collection('users')
            .find({ _id: new ObjectID(userID) })
            .next()
        // .then(result => {
        //     console.log(result)
        // })
        // .catch(err => console.log(err))
    }
}

module.exports = User