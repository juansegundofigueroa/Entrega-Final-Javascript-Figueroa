
function crearCliente(){
    const cliente = [
        {
        nombre: prompt(`cual es tu nombre?`),
        apellido: prompt(`cual es tu apellido?`),
        mail: prompt(`tu correo de mail?`),
        telefono: Number(prompt(`cual es tu numero de telefono`))
        }
    ]
    alert(`Bienvenido ${cliente.nombre}`)
}

crearCliente()
console.log(crearCliente)