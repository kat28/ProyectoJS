

//CREAR OBJETO DE CONEXIÓN
const db = firebase.firestore();

//console.log(db);

//CREACION DE OBJETOS
const contenedor = document.querySelector("#navCategoria");
const producto = document.querySelector("#colProducto");


//VARIABLES

let idSeccionado = "";

//METODOS DEL CRUD

const findByIdProducto = (id) => db.collection("producto").doc(id).get();
const onFindAllCategorias = (callback) => db.collection("categoria").onSnapshot(callback);
const findByIdCategoria = (id) => db.collection("categoria").doc(id).get();
const onFindAllSlider = (callback) => db.collection("slider").onSnapshot(callback);
const onFindAllProductos = (callback) => db.collection("producto").onSnapshot(callback);


window.addEventListener("load", async (e) => {

    onFindAllCategorias((query) => {
        contenedor.innerHTML = "";

        query.forEach((doc) => {

            var dato = doc.data();
            contenedor.innerHTML += `<li class="nav-item">
                                        <a class="nav-link" href="${dato.url}"><i class="fa fa-home"></i>${dato.descripcion}</a>
                                     </li>`;
        });
    });
    onFindAllProductos((query) => {
        producto.innerHTML = "";

        query.forEach((doc) => {

            var prod = doc.data();
            console.log(prod);
            producto.innerHTML += `<div class="col-md-4"><div class="product-item">
                                            <div class="product-title">
                                                <a href="#">${prod.nombre}</a>
                                                <div class="ratting">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <div class="product-image">
                                                <a href="product-detail.html">
                                                    <img src="${prod.img}" alt="Product Image">
                                                </a>
                                                <div class="product-action">
                                                    <a href="#"><i class="fa fa-cart-plus"></i></a>
                                                    <a href="product-detail.html"><i class="fa fa-search"></i></a>
                                                </div>
                                            </div>
                                            <div class="product-price">
                                                <h3><span>${prod.moneda}</span>${prod.precio}</h3>
                                                <a class="btn" href=""><i class="fa fa-shopping-cart"></i>Añadir</a>
                                            </div></div>
                                        </div> `;
        });
    });


});
