 

//CREAR OBJETO DE CONEXIÓN
const db = firebase.firestore();

//console.log(db);

//CREACION DE OBJETOS
const contenedor = document.querySelector("#navCategoria");
const slide = document.querySelector("#slideProductos");


//VARIABLES
 
let idSeccionado = "";

//METODOS DEL CRUD

const findByIdProducto = (id) => db.collection("producto").doc(id).get();
const onFindAllProductos = (callback) => db.collection("producto").onSnapshot(callback);


window.addEventListener("load", async (e) => {
   
    onFindAllProductos((query) => {
        contenedor.innerHTML = "";
         
        query.forEach((doc) => {
       
            var dato = doc.data();
            contenedor.innerHTML += `<li class="nav-item">
                                        <a class="nav-link" href="${dato.url}"><i class="fa fa-home"></i>${dato.descripcion}</a>
                                     </li>`;
        });
    });

    
  
});
