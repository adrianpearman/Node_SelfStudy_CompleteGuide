const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productID: {
                    type: Schema.Types.ObjectId, 
                    ref: 'Product',
                    required: true
                }, 
                quantity: { 
                    type: Number, 
                    required: true
                }
            }
        ],
    }
})

userSchema.methods.addToCart = function(product){
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
            productID: product._id,
            quantity: newQuantity
        })
    }

    const updatedCart = {
        items: updatedCartItems
    }

    this.cart = updatedCart
    return this.save()
}

userSchema.methods.deleteItemFromCart = function(productID) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productID.toString() !== productID.toString()
    })
    this.cart.items = updatedCartItems
    return this.save()
}

userSchema.methods.clearCart = function(){
    this.cart = { items: [] }
    return this.save()
}


module.exports = mongoose.model('User', userSchema)

// const mongoDB = require('mongodb')
// const getDb = require('../util/database').getDb
// const ObjectID = mongoDB.ObjectID

// class User {
//     constructor(username, email, cart, id) {
//         this.name = username
//         this.email = email
//         this.cart = cart
//         this._id = id
//     }

//     save() {
//         const db = getDb()
//         let dBOperation
//         return dBOperation = db
//             .collection('users')
//             .insertOne(this)
//     }



//     addOrder() {
//         const db = getDb()
//         return this.getCart()
//             .then(products => {
//                 console.log(this)
//                 const order = {
//                     items: products,
//                     user: {
//                         _id: new ObjectID(this._id),
//                         name: this.name,
//                     }
//                 }
//                 return db
//                     .collection('orders')
//                     .insertOne(order)
//             })
//             .then(result => {
//                 this.cart = { items: [] }
//                 return db
//                     .collection('users')
//                     .updateOne(
//                         { _id: new ObjectID(this._id) },
//                         { $set: { cart: { items: [] } } }
//                     )
//             })
//     }





//     getOrders() {
//         const db = getDb()
//         return db
//             .collection('orders')
//             .find({ 'user._id': new ObjectID(this._id) })
//             .toArray()
//     }

//     static findById(userID) {
//         const db = getDb()
//         return db
//             .collection('users')
//             .find({ _id: new ObjectID(userID) })
//             .next()
//         // .then(result => {
//         //     console.log(result)
//         // })
//         // .catch(err => console.log(err))
//     }
// }

// module.exports = User