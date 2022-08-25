

//CREAR OBJETO DE CONEXIÓN
const db = firebase.firestore();

//console.log(db);

//CREACION DE OBJETOS
const contenedor = document.querySelector("#navCategoria");
const producto = document.querySelector("#colProducto");
const btnVer = document.querySelector("#btnVer");

//VARIABLES
let idSeccionado = "";
var estrellas = "";
//METODOS DEL CRUD

const findByIdProductoCat = (id) => db.collection("producto").where("idCategoria", "==", id).get();
const onFindAllCategorias = (callback) => db.collection("categoria").onSnapshot(callback);
const findByIdCategoria = (id) => db.collection("categoria").doc(id).get();
const onFindAllSlider = (callback) => db.collection("slider").onSnapshot(callback);
const onFindAllProductos = (callback) => db.collection("producto").onSnapshot(callback);


window.addEventListener("load", async (e) => {

    console.log(window.location.href);

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');

    onFindAllCategorias((query) => {
        contenedor.innerHTML = "";

        query.forEach((doc) => {

            var dato = doc.data();
            contenedor.innerHTML += `<li class="nav-item">
                                        <a class="nav-link" href="${dato.url}"><i class="fa fa-home"></i>${dato.descripcion}</a>
                                     </li>`;
        });
    });

    if (myParam != null) {

        const query = await db.collection("producto").where("idcategoria", "==", myParam).get();

        producto.innerHTML = "";

        

        query.forEach((doc) => {
            const prod = doc.data();

            const id = doc.id;
            estrellas = "";
            if (prod.estrellas > 0) {
                for (let index = 0; index < prod.estrellas; index++) {
                    estrellas += ` <i class="fa fa-star"></i>`
                }
            }
            producto.innerHTML += getEstructuraProd(prod, id, estrellas);
        });
    } else {
        onFindAllProductos((query) => {

            producto.innerHTML = "";

            

            query.forEach((doc) => {
                const prod = doc.data();

                const id = doc.id;
                estrellas = "";
                if (prod.estrellas > 0) {
                    for (let index = 0; index < prod.estrellas; index++) {
                        estrellas += ` <i class="fa fa-star"></i>`
                    }
                }
                producto.innerHTML += getEstructuraProd(prod, id, estrellas);
            });
        });
    }
});

function getEstructuraProd(prod, doc, estrellas) {

    var html = `<div class="col-md-4"><div class="product-item">
    <div class="product-title">
        <a href="#">${prod.producto}</a>
        <div class="ratting">${estrellas}</div>
    </div>
    <div class="product-image">
        <a href="product-detail.html">
            <img src="${prod.img}" alt="Product Image">
        </a>
        <div class="product-action">
            <a href="#"><i class="fa fa-cart-plus"></i></a>
            <a href="product-detail.html?q=${doc}" ><i class="fa fa-search"></i></a>
        </div>
    </div>
    <div class="product-price">
        <h3><span>${prod.moneda}</span>${prod.precio}</h3>
        <a class="btn" href="/cart.html"><i class="fa fa-shopping-cart"></i>Añadir</a>
    </div></div>
</div> `

    return html;
}

