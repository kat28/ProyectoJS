
const db = firebase.firestore();

//CREACION DE OBJETOS
const form = document.querySelector("#form"); 
const contenedor = document.querySelector("#tblDatos > tbody"); 

const coleccion = "Login";
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

//METODOS DEL CRUD

const guardarContacto = (firstn, lastn, email, mobilen, password, repassword) =>{
    db.collection(coleccion).doc().set({
        firstn,
        lastn,
        email,
        mobilen,
        password,
        repassword
    })
} ;

const findAll = () => db.collection(coleccion).get();

const findById = (id) => db.collection(coleccion).doc(id).get();

const onFindAll = (callback) => db.collection(coleccion).onSnapshot(callback);

const onDelete = (id) => db.collection(coleccion).doc(id).delete();

const onUpdate = (id, Login) => db.collection(coleccion).doc(id).update(Login);

//EVENTO ONLOAD
window.addEventListener("load", async (e)=> {
    onFindAll((query) => {
        
        contenedor.innerHTML = "";
        
        query.forEach((doc)=>{
            var dato = doc.data();
            contenedor.innerHTML += `<tr>
                                        <td>${dato.firstn}</td>
                                        <td>${dato.lastn}</td>
                                        <td>${dato.email}</td>
                                        <td>${dato.mobilen}</td>
                                        <td>${dato.password}</td>
                                        <td>${dato.repassword}</td>
                                        <td><button class="btn btn-primary btn-modificar" data-id="${doc.id}">Modificar</button></td>
                                        <td><button class="btn btn-warning btn-borrar" data-id="${doc.id}">Borrar</button></td>
                                    </tr>`;
        });

        const btnBorrar = contenedor.querySelectorAll(".btn-borrar");

        btnBorrar.forEach((btn)=>{
            btn.addEventListener("click", async(e)=>{
                try{
                    if (window.confirm("Desea borrar el registro?")){
                        await onDelete(e.target.dataset.id);
                        iqwerty.toast.toast('Datos Eliminados!', deleteMessage);
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
                    //console.log(e.target.dataset.id);  
                    //console.log(doc.data()); 
                    const doc = await findById(e.target.dataset.id); 
                    const contacto = doc.data();

                    form.txtFirstN.value = Login.firstn;
                    form.txtLastN.value = Login.lastn;
                    form.txtEmail.value = Login.email;
                    form.txtMobileN.value = Login.mobilen;
                    form.txtPassword.value = Login.password;
                    form.txtRepassword.value = Login.repassword;   
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

    var firstn = form.txtFirstN;
    var lastn = form.txtLastN;
    var email = form.txtEmail;
    var mobilen = form.txtMobileN;
    var password = form.txtPassword;
    var repassword = form.txtRepassword;
   
    try {
        if (!editStatus){
            await guardarContacto(firstn.value, lastn.value, email.value, mobilen.value, password.value, repassword.value);
            alert('Datos Almacenados correctamente!', guardarMessage);
        }else{
            console.log(idSeccionado);
            await onUpdate(idSeccionado, {
                firstn : firstn.value,
                lastn : lastn.value,
                email : email.value,
                mobilen : mobilen.value,
                password: password.value,
                repassword: repassword.value,               
            })

            editStatus = false;
            idSeccionado = "";
            form.btnGuardar.innerText = "Guardar"

            iqwerty.toast.toast('Datos Modificados correctamente!', guardarMessage);
        }
        form.reset();
        nombre.focus();        
    } catch (error) {
        console.log(">>> Error. " + error);    
    }    

});



