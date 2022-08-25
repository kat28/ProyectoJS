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




const findAll = () => db.collection(coleccion).get();

const findById = (id) => db.collection(coleccion).doc(id).get();

const onFindAll = (callback) => db.collection(coleccion).onSnapshot(callback);

const onDelete = (id) => db.collection(coleccion).doc(id).delete();

const onUpdate = (id, producto) => db.collection(coleccion).doc(id).update(producto);



//EVENTO LEER DATOS INICIALES <td>${dato.precio}</td>
window.addEventListener("load", async (e)=> {
    onFindAll((query) => {
        
        contenedor.innerHTML = "";
        
        query.forEach((doc)=>{
            var dato = doc.data();
            contenedor.innerHTML += `<tr class="cart-item">

    
                                  
            
                                        <td><img class="card-img-top" src="${dato.img}"></td>                                        
                                        <td>${dato.producto}</td>
                                        
                                        <td id = precio>${dato.precio}</td>
                                       
                                        <td>${dato.moneda}</td>
                                       
                                                                               
                                        <td> <input class="input is-primary cart-item-qty" style="width:100px" type="number" min="1" value= 0
                                                                           
                                        </td>  

                                        <td id=total class="cart-item-total">                                         </td>



                                    </tr>`;
    });

    var cost = document.getElementsByName('blog_linkm_one[]');
            
    for (var i = 0; i < cost.length; i++) {
    sum += parseFloat(cost[i].value);
}
    

    $(".cart-item-qty").change(function() {

        var button = this,
        cell = button.parentElement,
        row = cell.parentElement;
        const tds = row.querySelectorAll('#precio');
        tds.forEach(td => {
        var $this = $(this);
        var parent = $this.parent().parent();
        //var price = $this.attr("data-price");
        var quantity = $this.val();
        //console.log(firstCell);
        var total = td.textContent * quantity;
        parent.find(".cart-item-total").html(total.toFixed(2));
        recalculateCart2()
  


    })

   // function recalculateCart() {
                      
     //   row = cell.parentElement,
      //  firstCell = row.querySelector('td'); 
        //const tds = document.querySelectorAll('#total');
        //tds.forEach(td => {
        //console.log(td.textContent);

       
                 
    //})

  
       
      //}


      function recalculateCart2() {
        var subTotal = 0;
        var grandTotal = 0;
        
        var items = $(".cart-item");
        $.each(items, function() {
          
          var itemQuantity = $(this).find(".cart-item-qty");
            console.log(itemQuantity);
            var itemTotal = itemQuantity.val() * 1;
            subTotal += itemTotal;
            console.log(subTotal);
        });
        if (subTotal > 0) {
          
          grandTotal = subTotal ;
          $(".totals,.checkout").show();
        } else {
          $(".totals,.checkout").show();
        }
        $("#cart-subtotal").html(subTotal.toFixed(2));
        $("#cart-total").html(grandTotal.toFixed(2));
       
        
      }
                  
});

});

});
