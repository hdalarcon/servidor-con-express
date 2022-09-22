const fs = require('fs');

class Contenedor{
    constructor(file){
        this.file=file;
    }

    async save(producto){
        let contenido = await fs.promises.readFile(this.file)
        let contObj = JSON.parse(contenido)
        let newId;

        newId = contObj.length > 0 ? contObj.length + 1 : 1;
        console.log("Se agrega el producto: ",producto)
        producto.id = newId;
        contObj.push(producto)
        await fs.promises.writeFile(this.file, JSON.stringify(contObj))
    }

    async getAll(){
        let contenido = await fs.promises.readFile(this.file)
        let contObj = JSON.parse(contenido)
        // console.log("Resultado de obtener todo: ",contObj)
        return contObj
    }

    async getById(id){
        let contObj = await this.getAll()
        let resultado = contObj.find(obj => obj.id == id)
        console.log("Resultado de busqueda por id: ",resultado)
        return resultado
    }

    async deleteById(id){
        let contObj = await this.getAll()
        let nuevoObj = contObj.filter(obj => obj.id != id)
        contObj.filter(obj => obj.id == id).length > 0  ? (await fs.promises.writeFile(this.file, JSON.stringify(nuevoObj)), console.log("Se eliminó el producto con id: ",id)) : console.log("No se encontró el id :",id)
    }

    async deleteAll(){
        console.log("Elimina todo.")
        await fs.promises.writeFile(this.file, "[]")
    }

    async getLength(){
        let list = await this.getAll();
        return await list.length;
    }
}

let producto1 = {
    title : "REMERA STAR WARS LIGHTSABERS",
    price : 5693,
    thumbnail : "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/244/141/products/reverpass_03050-n0-211-cac9ad90935842df9e16515856963759-1024-1024.jpg"
}

let producto2 = {
    title : "REMERA STAR WARS OBI WAN BATTLE",
    price : 6072,
    thumbnail : "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/244/141/products/reverpass_03045-n0-11-e691812bb7f9377f8516515998189066-1024-1024.jpg"
}

let producto3 = {
    title : "REMERA STAR WARS BABY YODA ADORABLE",
    price : 5693,
    thumbnail : "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/244/141/products/reverpass_03052-vl-21-af78654f240850805b16521527803482-1024-1024.jpg"
}


module.exports = Contenedor;
