function getId(n) {
  console.log(n);
  axios
    .get("http://localhost:8080/api/productos/" + n)
    .then(function (response) {
      console.log(response.status);
      console.log(response.data);
      document.getElementById("nombreProducto").innerHTML =
        response.data.articulo.nombre;
      document.getElementById("nombrePrecio").innerHTML =
        response.data.articulo.precio;
    })
    .catch(function (error) {
      console.log(error);
    });
}
function getProductoById(n) {
  console.log(n);
  axios
    .get("http://localhost:8080/api/productos/" + n)
    .then(async function (response) {
      console.log('status',response.status);
      console.log(response.data);
      document.getElementById("nombreProducto").innerHTML =
        response.data.articulo.nombre;
      document.getElementById("nombrePrecio").innerHTML =
        "$" + response.data.articulo.precio + "MXN";
      document.getElementById("nombreDescripcion").innerHTML =
        response.data.articulo.descripcion;
      const miImagen = document.getElementById("nombreImagen");
      miImagen.src = response.data.articulo.url;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getAllProductCar(){
  
  
  if (document.getElementsByClassName("idCarritoTemporal").length > 0) {
    const html=""
    let spanTags = document.getElementsByClassName("idCarritoTemporal");
    console.log(spanTags)
    axios
    .get("http://localhost:8080/api/carrito/"+spanTags[0].id +"/productos")
    .then(async function (response) {
      const data = await response.data.articulo
      
      
      data.map(element => {
        
        existingTag.appendChild(html);
        let existingTag = document.getElementById("make_store_car");
        let newSpanTag = document.createElement("div");        
        newSpanTag.className = "cart-single-wraper";
        existingTag = document.getElementsByClassName("cart-single-wraper");
        newSpanTag = document.createElement("div");
        newSpanTag.className = "cart-img";
        existingTag = document.getElementsByClassName("cart-img");
        newSpanTag = document.createElement(`<a href="#"><img src="${element.url}" alt=""></a>`);
        existingTag = document.getElementsByClassName("cart-single-wraper");
        newSpanTag = document.appendChild(`div`);
        newSpanTag.className = "cart-content";
        

      `
        <div class="cart-single-wraper">
          <div class="cart-img">
              <a href="#"><img src="${element.url}" alt=""></a>
          </div>
          <div class="cart-content">
              <div class="cart-name"> <a href="#">${element.nombre}</a>
              </div>
              <div class="cart-price"> $ ${element.cantidad * element.precio}MXN </div>
              <div class="cart-qty"> Qty: <span>${element.cantidad}</span> </div>
          </div>
          <div class="remove"> <a href="#"><i class="zmdi zmdi-close"></i></a>
          </div>
      </div>
    `

      

    })

    
    let existingTag = document.getElementById("make_store_car");
    existingTag.appendChild(html);
   
  }
    )
}}

function getDeleteProductCar(idArticulo) {
  

  if (document.getElementById(idArticulo).value >0) {
  let idCard=document.getElementsByClassName('container')[2].id
  console.log("http://localhost:8080/api/carrito/"+idCard+"/productos/"+idArticulo)
    axios
    .delete("http://localhost:8080/api/carrito/"+idCard+"/productos/"+idArticulo)
    .then(async function (response) {
       location.reload();
    })
    
    .catch(function (error) {
      location.reload();
      console.log(error);
    });
   
    
    }
  }




function getNewCar(idArticulo, cantidad = 1) {
  

  if (document.getElementsByClassName("idCarritoTemporal").length == 0) {
    

    axios
      .post("http://localhost:8080/api/carrito/", {
        idArticulo,
        cantidad,
      })
       .then(()=>{
        const text = document.getElementsByClassName("itemsCarrito")[0].textContent;
      
        document.getElementsByClassName("itemsCarrito")[0].innerHTML = parseInt(text)+1
        
      })
      .catch(function (error) {
        
        console.log(error)
      });
  } else {
    

    let spanTags = document.getElementsByClassName("idCarritoTemporal");

    axios
      .post("http://localhost:8080/api/carrito/"+spanTags[0].id+"/productos", {
        
        idArticulo:idArticulo,
        cantidad:cantidad
      })
      .then(async function (response) {
        console.log(response.data);
      })
      .then(()=>{
        const text = document.getElementsByClassName("itemsCarrito")[0].textContent;
    
        document.getElementsByClassName("itemsCarrito")[0].innerHTML = parseInt(text)+1
        
      })
      .catch(function (error) {
        
        console.log(error);
      });
  }


}
