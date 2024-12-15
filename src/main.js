const express = require("express");
const PUERTO = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productos = [
    {id:"1", title: "lavaropa1", price: 200, description:"Soy un lavaropa1", code: "ABC", status:true, stock: 1, category: "lavaropa"},
    {id:"2", title: "lavaropa2", price: 2000, description:"Soy un lavaropa2", code: "DEF", status:true, stock: 3, category: "lavaropa"},
    {id:"3", title: "lavaropa3", price: 20000, description:"Soy un lavaropa3", code: "GHI", status:true, stock: 2, category: "lavaropa"}
];

//GET

app.get("/", (req, res) => {
    res.send(productos)
})

app.get("/:id", (req, res) => {
    let id = req.params.id;
    
    const productoEncontrado = productos.find(productos => productos.id === id);

    if(productoEncontrado){
       return res.send(productoEncontrado) 
    }else{
        return res.send("Che no hay nada")
    }

    
})

app.get("/api/carts/", (req, res) => {
    res.send("Bienvenidos a /api/carts/")
})

//POST
app.post("/", (req, res) => {
    const nuevoProducto = req.body;

    productos.push(nuevoProducto)
    console.log(productos);
    res.send("Producto Agregado")
})

//PUT
app.put("/:id", (req, res) =>{
    let id = req.params.id;
    const {title, description, category} = req.body;

    const productoIndex = productos.findIndex(productos => productos.id === id);

    if(productoIndex !== -1){
        productos[productoIndex].title = title;
        productos[productoIndex].description = description;
        productos[productoIndex].category = category;


        console.log(productos);
        res.send({status: "success", mensaje: "Producto actualizado"})

    }else{
        res.status(404).send({status:"error", mensaje: "Producto no encontrado"})
    }
})



app.listen(PUERTO, () => {
    console.log(`Escuchando el puerto: ${PUERTO}`)
})