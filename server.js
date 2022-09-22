const express = require('express');
const { default: random } = require('random');
const app = express();
const Contenedor = require('./main');
// const random = require('random');

let productos = new Contenedor('productos.txt');

const getProductos = async () => {
    let listProductos = JSON.stringify(await productos.getAll());
    return listProductos;
}

const getProductoRandom = async () => {
    let productosR = await productos.getAll();
    let productosLength = await productos.getLength();
    let productoRandom = Math.floor(Math.random() * productosLength);
    return JSON.stringify(productosR[productoRandom]);
}

app.get('/productos',async (rec, res) => {
    res.send(`Lista de productos: ${await getProductos()}`);
})

app.get('/productoRandom',async (rec, res) => {
    res.send(`ProductoRandom: ${await getProductoRandom()}` )
})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))