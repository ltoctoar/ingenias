// Creamos el servidor base
const express = require('express');
const app= express();
const path = require ('path');
const fs = require('fs');
const { Console } = require('console');
const PORT = 3008;


//Carga de datos
const filedata = path.join(__dirname,'data','trailerflix.json');
let Trailerflix = [];
try{
    const data=fs.readFileSync(filedata,'utf8')
    Trailerflix=JSON.parse(data);
}catch(error){
    Console.error('Error al cargar los datos de Trailerflix')
}


//Crea un contenido en formato texto de bienvenida para la ruta raíz del proyecto “/”. El
//mensaje a mostrar puede ser texto plano, o contenido HTML. (Mejor si es este último

app.get('/', (req,res)=>{
    res.send('Bienvenidos a Trailerflix')

});

//Crea un endpoint llamado /catalogo que liste todo el contenido de trailerflix JSON

app.get('/catalogo',(req,res)=>{
    res.json(Trailerflix);

});
//  Crea un endpoint llamado /titulo/:title que liste el catálogo de películas y/o series que
// se aproxime al título enviado (la búsqueda del nombre debe ser parcial).


app.get('/titulo/:title', (req,res)=>{
 const resultado =req.params.tittle.toLowerCase();
 const resultados = Trailerflix.filter(item =>
    item.titulo.toLowerCase().includes(resultado));
    if (resultados.length == 0){
        return res.status(404).json({mensaje:'No existe coincidencias'});

    }
    res.json(resultados);
});
//  Crea un endpoint llamado /categoria/:cat que liste todo el contenido del archivo JSON
// de acuerdo a la categoría enviada como parámetro (serie o película).
app.get('/categoria/:cat',(req,res)=>{

    const categoriausuario =req.params.cat.toLowerCase();
    const categoriaresul = Trailerflix.filter(item => 
        item.categoria.toLowerCase() === categoriausuario);
    if (categoriaresul.length === 0){
        return res.status(404).json({mensaje:'No existen datos relacionados'});
    }
    res.json(categoriaresul);
}
);


// Crea un endpoint llamado /reparto/:act que liste el catálogo que incluya a la actriz o
// actor indicado por el nombre (la búsqueda del nombre debe ser parcial).

app.get('/reparto/:act',(req,res)=>{

    const repartousuario =req.params.act.toLowerCase();
    const repartoesul = Trailerflix.filter(item => 
        item.reparto.toLowerCase() === repartousuario);
    if (repartoesul.length === 0){
        return res.status(404).json({mensaje:'No existen datos relacionados'});
    }
    res.json(repartoesul);
}
);

//  Crea un endpoint llamado /trailer/:id que retorne la URL del trailer de la película o serie.
// Si ésta no posee video asociado, que retorne un mensaje en formato JSON notificando
// la no disponibilidad del mismo.

app.get('/trailer/:id',(req,res)=>{

    const idusuario =Number(req.params.id);
    const idresul = Trailerflix.find(item => item.id ===idusuario);
    if (!idresul){
        return res.status(404).json({mensaje:'No existen datos relacionados'});
    }
    res.json({trailer:idresul.trailer});
});

//Activar servidor

app.listen(PORT ,()=>{
    console.log(`Sevidor escuchando en ${PORT}`)
});