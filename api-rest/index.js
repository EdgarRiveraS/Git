'use strict';
require ('dotenv').config();
const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const Products = require ('./models/product');
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product', (req, res) => {
Products.find({},(err, products)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!products) return res.status(404).send({message: 'No existen productos'})

        res.status(200).send({products})
    })
})

app.get('/api/product/:productId',(req,res) => {
    let productId = req.params.productId

    Products.findById(productId,(err,product)=>{
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!product) return res.status(404).send({message:`El producto no existe`})
        
        res.status(200).send({product : product})
    })
})

app.post ('api/product', (req, res) => {
    console.log('POST/api/product')
    console.log(req.body)
    const product = new Products();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;
    product.save((err, productStored) => {
        if (err) res.status(500).send({ message: `Error al salvar en la base de datos: ${err}` })
        
        res.status(200).send({product: productStored})
    })
})

app.put('api/product/:productId', (req, res) => {
    
})

app.delete('api/product/:productId', (req, res) => {
    
})

mongoose.connect(`mongodb+srv://Oceano:${process.env.CONNECT}@cluster0.srbdh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, (err, res) => {
    if (err) {
        return console.log (`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexión a la base de datos establecida...')

    app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
    })
})
