const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/Product')
const Manufacturer = require('./models/Manufacturer')

mongoose.connect('mongodb+srv://overlord:overlord123@democluster-yjntg.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true });

const port = 3000

/**
 * Find Apple Products using manufacturer name 'Apple'
 */
app.get('/', async(req, res) => {
    const response = await Product.aggregate(
        [   {$lookup:
                {from:"manufacturers",
                localField:"manufacturer",
                foreignField:"_id",
                as:"value"
            }},{$unwind: "$value"},
            {$match:{"value.name":"Apple"}},
            {$group:{_id:"$value.name",products:{$push:"$name"}}},
            {$project:{products:1,_id:0}}
        ]
    )
    console.log(response)
})



app.get('/seed', (req, res) => {
    let manufacturers = [{ "_id": "5dc1224924d59204fa4f1d12", "name": "Apple", "__v": 0 }, { "_id": "5dc122aa1ae17a0501d7f6a2", "name": "Samsung", "__v": 0 }]
    let products = [{ "_id": "5dc123361e26a9050bed961c", "price": 2300, "name": "Macbook pro", "manufacturer": "5dc1224924d59204fa4f1d12", "__v": 0 }, { "_id": "5dc123b1e01a3c050ea1c0be", "price": 1100, "name": "iPhone 11 pro", "manufacturer": "5dc1224924d59204fa4f1d12", "__v": 0 },{"_id":"5dc1613b5c90e307a7fe5d69","price":1200,"name":"Galaxy s10","manufacturer":"5dc122aa1ae17a0501d7f6a2","__v":0}]
    Product.insertMany(products).then()
    Manufacturer.insertMany(manufacturers).then()
    res.send("Added data")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))