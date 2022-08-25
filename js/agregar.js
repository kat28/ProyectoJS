// Lab 02 - CRUD + Firebase
// Autor: Ricardo Rojas
// Fecha: 08/20/2022


// OBJETO CONEXION FIREBASE DATABASE
const db = firebase.firestore();

//CREACION FORMULARIO Y TABLA
const form = document.querySelector("#form"); 
const contenedor = document.querySelector("#tblDatos > tbody"); 

// CREACION COLECCION PARA LA BASE DE DATOS
const coleccion = "producto";
let editStatus = false;
let idSeccionado = "";

// CONSTANTES DEL MENSAJE 
const guardarMessage = {
    style: {
        main: {
          background: "#d4edda",
          color: "#155724",
          "box-shadow": "none",
      },
    },    
};

const deleteMessage = {
    style: {
        main: {
          background: "#f8d7da",
          color: "#721c24",
          "box-shadow": "none",
      },
    },    
};

//METODOS GUARDAR / LEER / ELMINAR Y ACTUALIZAR
const guardarArticulo = (img,moneda,precio,producto, descripcion, idcategoria, estrellas) =>{
    db.collection(coleccion).doc().set({
        img,
        moneda,
        precio,
        producto,
        descripcion,
        idcategoria,
        estrellas
    })
} ;

const findAll = () => db.collection(coleccion).get();

const findById = (id) => db.collection(coleccion).doc(id).get();

const onFindAll = (callback) => db.collection(coleccion).onSnapshot(callback);

const onDelete = (id) => db.collection(coleccion).doc(id).delete();

const onUpdate = (id, contacto) => db.collection(coleccion).doc(id).update(contacto);

//EVENTO LEER DATOS INICIALES
window.addEventListener("load", async (e)=> {
    onFindAll((query) => {
        
        contenedor.innerHTML = "";
        
        query.forEach((doc)=>{
            var dato = doc.data();
            contenedor.innerHTML +=  `<tr>
            <td><img class="card-img-top" src="${dato.img}"></td>                                        
            <td>${dato.producto}</td>
            <td>${dato.precio}</td>
            <td>${dato.moneda}</td>
            <td><button class="btn btn-primary btn-modificar" data-id="${doc.id}" 
            
            <input type="image" src="img/icoEditar.png" style="border: double;" height="80" width="170"/>
                     
            </button></td>
            
            <td><button class="btn btn-warning btn-borrar" data-id="${doc.id}" 
            
            <input type="image" src="img/icoEliminar.png" style="border: double;" height="80" width="170"/>        
            
            </button></td>

              </tr>`;
        });

        const btnBorrar = contenedor.querySelectorAll(".btn-borrar");

        btnBorrar.forEach((btn)=>{
            btn.addEventListener("click", async(e)=>{
                try{
                    if (window.confirm("Desea proceder con la eliminacion del registro?")){
                        await onDelete(e.target.dataset.id);
                        iqwerty.toast.toast('Registro eliminado', deleteMessage);
                    }
                } catch (error) {
                    console.log(">>> Error al borrar. " + error);
                }
            });
        });
        
        const btnModificar = contenedor.querySelectorAll(".btn-modificar");

        btnModificar.forEach((btn)=>{
            btn.addEventListener("click", async(e)=>{
                try {

                    const doc = await findById(e.target.dataset.id); 
                    const producto = doc.data();

                    form.txtproducto.value = producto.producto;
                    form.txtprecio.value = producto.precio;
                    form.txtmoneda.value = producto.moneda; 
                    form.txtimg.value = producto.img;
                    form.txtdescripcion.value = producto.descripcion
                    form.txtcategoria.value = producto.idcategoria
                    form.txtestrellas.value = producto.estrellas
    
                    form.btnGuardar.innerText = "Modificar"
                    
                    editStatus = true;
                    idSeccionado = doc.id;
                    
                } catch (error) {
                    console.log(">>> Error al modificar. " + error);    
                }                             
            });    
        });
    });


});
//EVENTO SUBMIT
form.addEventListener("submit", async(e) =>{
    e.preventDefault();

    var producto = form.txtproducto;
    var precio = form.txtprecio;
    var moneda = form.txtmoneda;
    var img = form.txtimg;
    var descripcion = form.txtdescripcion;
    var idcategoria =form.txtcategoria;
    var estrellas =form.txtestrellas;

    try {
        if (!editStatus){
            await guardarArticulo(img.value, moneda.value, precio.value, producto.value, descripcion.value, idcategoria.value, estrellas.value);
            iqwerty.toast.toast('Articulo registrado exitosamente', guardarMessage);
        }else{
            console.log(idSeccionado);
            await onUpdate(idSeccionado, {
                img: img.value,               
                moneda: moneda.value,
                precio: precio.value,
                producto: producto.value,
                descripcion: descripcion.value,
                idcategoria: idcategoria.value,
                estrellas: estrellas.value
                
              
            })

            editStatus = false;
            idSeccionado = "";
            form.btnGuardar.innerText = "Guardar"

            iqwerty.toast.toast('Articulo modificados exitosamente', guardarMessage);
        }
        form.reset();
        nombre.focus();        
    } catch (error) {
        console.log(">>> Error. " + error);    
    }    

});
