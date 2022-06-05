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
});
// SELECCIONAR OFERTAS
let ofertas = $(".ofertas-container").children(".ofertas-item");
ofertas.on("click", function(){
    $(this).toggleClass("oferta-seleccionada");
});
// GUARDAR LAS OFERTAS SELECCIONADAS
let ofertasSeleccionada = [];
let items = [];
let precioTotal = 0;
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
    recarga: "2400"
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
            console.log(ofertasSeleccionada[i]);
        }
        carritoItems = true;
        carritoInterfaz();
    }else{
        false;
    }
    ofertasSeleccionada.length = 0;
    items.length = 0;
    $(".oferta-seleccionada").removeClass("oferta-seleccionada");
});
// INTERFAZ CARRITO
// MOSTRAR SELECCIÓN EN EL CARRITO
function carritoInterfaz(){
    let item;
    $(".oferta-seleccionada").css({
        color: "#fff",
        fontWeight: "bold",
        borderBottom: "2px solid #fff" 
    });
    for(i=0; items.length > i; i++){
        item = $(".oferta-seleccionada")[i];
        $(".carrito__lista").append(item);
    }
}