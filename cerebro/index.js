let carrito = $(".carrito");
let botonCarrito = $("#desplegar-carrito");
let mostrarCosto = $(".mostrar-costo");
mostrarCosto.append(0);
let carritoItems = false;

// MOSTRAR CARRITO
botonCarrito.on("click", function(){
    if(carritoItems == true){
        let left = $(window).width() - carrito.outerWidth();
        carrito.animate({
            left: `${left}px`
        }, 200)
    }else{
        false;
    }
});
// CERRAR CARRITO
$("#cerrar-carrito").on("click", function(){
    carrito.animate({
        left: "100vw"
    }, 200)
    $(".oferta-seleccionada").children(".eliminar-item").remove();
});
// SELECCIONAR OFERTAS
let ofertas;
function clickOfertas(){
    ofertas = $(".ofertas-item");
    ofertas.on("click", function(){
        $(this).toggleClass("oferta-seleccionada");
    });
}
clickOfertas();
// GUARDAR LAS OFERTAS SELECCIONADAS
let ofertasSeleccionada = [];
let items = [];
let posicion;
let agregar;
let lista = [{
    precio: 9,
    recarga: "80cp"
},
{
    precio: 18,
    recarga: "160cp"
}, 
{
    precio: 33,
    recarga: "420cp"
}, 
{
    precio: 40,
    recarga: "500cp"
}, 
{
    precio: 48,
    recarga: "580cp"
}, 
{
    precio: 60,
    recarga: "880cp"
}, 
{
    precio: 120,
    recarga: "1760cp"
}, 
{
    precio: 145,
    recarga: "2400cp"
}, 
{
    precio: 195,
    recarga: "3280cp"
}, 
{
    precio: 235,
    recarga: "5000cp"
}, 
{
    precio: 380,
    recarga: "7400cp"
}, 
{
    precio: 550,
    recarga: "10000cp"
}];
$("#agregar-al-carrito").on("click", function(){

    for(e=0; $(".oferta-seleccionada").length > e; e++){
        for(i=0; ofertas.length > i; i++){
            if($(".oferta-seleccionada")[e] == ofertas[i]){
                items.push(i);
            }else{
                false;
            }
        }
    }

    if(items.length > 0){
        for(i=0; items.length > i; i++){
            posicion = items[i];
            agregar = lista[posicion];
            ofertasSeleccionada.push(agregar);
            console.log(agregar);
        }
        carritoItems = true;
        carritoInterfaz();
        eliminarItem()
        calcularCosto();
    }else{
        false;
        carritoItems = false;
    }
    // VACIAR ARRAYS
    items.length = 0;
    $(".oferta-seleccionada").removeClass("oferta-seleccionada");
});
// INTERFAZ CARRITO
function carritoInterfaz(){
    let item;
    $(".oferta-seleccionada").addClass("carrito-item");
    $(".oferta-seleccionada").css({
        color: "#fff",
        fontWeight: "bold",
        border: "2px solid #000",
        borderBottomColor: "#fff" 
    });
    for(i=0; items.length > i; i++){
        item = $(".oferta-seleccionada")[i];
        $(".carrito__lista").append(item);
    }
    // ICONO ELIMINAR ITEMS
    $(".carrito-item").prepend("<button class='cerrar eliminar-item' aria-labelledby='eliminar-item'><img src='../multimedia/iconos/close.png' alt='cerrar' class='img-fluid'></button>");
    $(".carrito-item").on("mouseenter", function(){
        $(this).children(".eliminar-item").animate({
            left: "0",
            opacity: "1"
        }, 200);
    });
    $(".carrito-item").on("mouseleave", function(){
        $(this).children(".eliminar-item").animate({
            left: "100%",
            opacity: "0.7"
        }, 50)
    });
}
// ELIMINAR ITEMS
let devolverItem;

function eliminarItem(){
    $(".eliminar-item").on("click", function(){
        $(this).parent().css({
            fontWeight: "400",
            border: "none",
            zIndex: "20"
    });
        $(this).parent().removeClass("carrito-item");
        devolverItem = $(this).parent()[0];
        // ELIMINAR ITEMS DE LA LISTA

        let element = $(this).parent();
        let recarga = element.children(".texto-oferta").children(".recarga").text().replace(/ /g, "").toLowerCase();
        for(i=0; ofertasSeleccionada.length > i; i++){
           if(ofertasSeleccionada[i].recarga == recarga){
               let a = i+1;
               ofertasSeleccionada.splice(i, 1);
           }else{
               false;
           }
        }
        verificarItems();
        calcularCosto();
    // DEVOLVER ITEMS A LA LISTA DE OFERTAS
        $(".ofertas-container").prepend(devolverItem);   
        $(".ofertas-container").children(".ofertas-item").children(".eliminar-item").remove();
    });
}
// CALCULAAR COSTO TOTAL
let sumar;
let precioTotal;
function calcularCosto(){
    precioTotal = 0;
    if(ofertasSeleccionada.length > 0){
        for(i=0; ofertasSeleccionada.length > i; i++){
            sumar = ofertasSeleccionada[i].precio;
            precioTotal += sumar;
            $(".mostrar-costo").text(`${precioTotal}.000`);
        }
    }else{
        $(".mostrar-costo").text(`${precioTotal}.000`); 
    }
}
// VERIFICAR SI HAY ITEMS EN EL CARRITO
function verificarItems(){
    if(ofertasSeleccionada.length > 0){
        carritoItems = true;
    }else{
        carritoItems = false;
    }
}