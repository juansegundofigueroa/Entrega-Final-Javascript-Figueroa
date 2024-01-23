let edad = Number(prompt("ingrese su edad"));
if(edad >= 16){
//en este apartado esta la seccion de datos del cliente
    alert("Sos mayor y podes ingresar en la web");
    let cliente = prompt("Como es tu nombre y apellido?");
    alert(`Bienvenido ${cliente}`);
    function orden(){
    alert(`Orden tomada para ${cliente}`);
}

// en este apartado se ven lo que incluye el menu
    let numero = Number(prompt("Bienvenido al menu,para ver las opciones presiona el numero correspondiente: 1:clasico 2:vegetariano 3:premium 4:seguir por el menu"));
    while(numero != 4){
        switch (numero){
            case 1:
                alert("incluye: comida + bebida + postre");
                break;
            case 2:
                alert("incluye: comida vegetariana + bebida + postre vegano");
                break;
            case 3:
                alert("incluye: entrada + comida + bebida + postre");
                break;
            default:
                alert("opcion incorrecta");
                break;
        }
        numero = Number(prompt ("Bienvenido al menu,para ver las opciones presiona el numero correspondiente: 1:clasico 2:vegetariano 3:premium 4:seguir por el menu"));
    }

// en este apartado se ve el precio de los productos
    let pedido = Number(prompt("para ver los valores y tomar la orden presiona el numero correspondiente: 1:clasico 2:vegetariano 3:premium 4:seguir por el menu"));
    while(pedido != 4){
        switch (pedido){
            case 1:
                alert("Elegiste la opcion Clasica,su precio es de $1000 + iva");
                const suma = (a, b) => a + b;
                const iva = (precioIva) => precioIva * 0.21;
                const opcion1 = 1000;
                let precioFinal = suma(opcion1, iva(opcion1));
                alert (`Precio final a abonar es ${precioFinal}`);
                orden(cliente);
                break;
            case 2:
                alert("Elegiste la opcion Vegetariana,su precio es de $2000 + iva");
                const suma2 = (a, b) => a + b;
                const iva2 = (precioIva) => precioIva * 0.21;
                const opcion2 = 2000;
                let precioFinal2 = suma2(opcion2, iva2(opcion2));
                alert (`Precio final a abonar es ${precioFinal2}`);
                orden(cliente);
                break;
            case 3:
                alert("Elegiste la opcion Premium,su precio es de $3000 + iva");
                const suma3 = (a, b) => a + b;
                const iva3 = (precioIva) => precioIva * 0.21;
                const opcion3 = 3000;
                let precioFinal3 = suma3(opcion3, iva3(opcion3));
                alert (`Precio final a abonar es ${precioFinal3}`);
                orden(cliente);
                break;
            default:
                alert("opcion incorrecta");
                break;
        }
        pedido = Number(prompt ("para ver los valores y tomar la orden presiona el numero correspondiente: 1:clasico 2:vegetariano 3:premium 4:seguir por el menu"));
    }
// si incluye descuento o no
    let cantidad = Number(prompt(`ingrese la cantidad deseada de menus:(Maximo 7,tenes descuento!)`));
    while(cantidad != 0){
        if(cantidad == 7){
        alert(`Con la compra de 7,tenes un descuento del 10% en el total de la compra`);
        break;
    }else if(cantidad <=6){
        alert(`Tu pedido tiene ${cantidad} menus`);
        break;
    }else{
        alert(`Solo disponemos 7 menus semanales,indica un numero menor a 7`);
    }
        cantidad = Number(prompt(`ingrese la cantidad deseada de menus:`));
    }
    orden(cliente)
    alert (`Gracias por comprar con nosotros`);
    }else{
    alert("No eres mayor de edad por lo que no puedes entrar a la web");
    }