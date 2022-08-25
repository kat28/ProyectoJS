

//CREAR OBJETO DE CONEXIÓN
const db = firebase.firestore();

//console.log(db);

//CREACION DE OBJETOS
const contenedor = document.querySelector("#navCategoria");
const productoDetalle = document.querySelector("#detalleItem");
const productoImagen = document.querySelector("#imagenItem");

//METODOS DEL CRUD
const onFindAllCategorias = (callback) => db.collection("categoria").onSnapshot(callback);


window.addEventListener("load", async (e) => {

    console.log(window.location.href);

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('q');

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

        const query = await db.collection("producto").doc(myParam).get();;
        const doc = query.data();
        var estrellas = "";

        if (doc.estrellas > 0) {
            for (let index = 0; index < doc.estrellas; index++) {
                estrellas += ` <i class="fa fa-star"></i>`
            }
        }
        productoImagen.innerHTML = "";
        productoDetalle.innerHTML = "";
        productoImagen.innerHTML += `<div class="product-slider-single-nav normal-slider">
                                         <div class="slider-nav-img"><img src="${doc.img}" alt="Product Image"></div>
                                    </div>`

        productoDetalle.innerHTML += `<div class="title">
                                        <h2>${doc.producto}</h2>
                                    </div>
                                    <div class="ratting">${estrellas}</div>
                                    <div class="price">

                                        <h4>Precio:</h4>
                                        <p>${doc.moneda}${doc.precio} </p>
                                    </div>
                                    <div>
                                        <div class="price">
                                            <h4 >Descripcion:</h4>
                                        </div>
                                        <p>${doc.descripcion}</p>
                                    </div>`;


    } else {
        productoDetalle.innerHTML = "";
        productoDetalle.innerHTML += `<div class="title">
                                        <h2>Base Liquida Perfect Cover</h2>
                                    </div>
                                    <div class="ratting">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    </div>
                                    <div class="price">

                                        <h4>Precio:</h4>
                                        <p>$200</p>
                                    </div>
                                    <div>
                                        <div class="price">
                                            <h4 >Descripcion:</h4>
                                        </div>
                                        <p>Base liquida Amuse, brinda un efecto semi matte, alta cobertura, perfecta para todo tipo de piel.</p>
                                    </div>`;
    }
});

