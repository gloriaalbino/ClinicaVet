//Creacion de selectores 
const origenInput = document.querySelector('#origen')
const destinoInput = document.querySelector('#destino')
const pasajerosInput = document.querySelector('#pasajeros')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const observacionesInput = document.querySelector('#observaciones')

const formulario = document.querySelector('#nueva-reserva')
const contenedorReservas = document.querySelector('#reservas')

let editar;

//Estructura para guardar la informacion que se reciba de los inputs
const ObjReservas = {
    origen:'',
    destino:'',
    pasajeros:'',
    fecha:'',
    hora:'',
    observaciones:''
}

//Creacion de las clases
class reservas{
    constructor(){
        this.reservas = []
        
    }

    agregarReserva(reserva){
        //this.reservas.push(reserva)
        this.reservas = [...this.reservas,reserva]
        console.log(this.reservas) //Para ir viendo como se van agregando las reservas
    }

    eliminarReserva(id){
        this.reservas = this.reservas.filter(reservas=>reservas.id !== id);
    }

    editarReserva(reservaAct){
        this.reservas = this.reservas.map(reservas=> reservas.id === reservaAct.id ? reservaAct:reservas);
    }
}

class ui{ //ui= user interface
    imprimirReservas({reservas}){
    this.limpiarHTML();
    reservas.forEach(i=>{
        const {origen, destino, pasajeros, fecha, hora, observaciones, id} = i;
        const divReserva = document.createElement('div');
        divReserva.classList.add('reserva', 'p-3');
        //Creamos un atributo personalizado
        divReserva.dataset.id = id;

        //Generamos textos para las fichas de reservas
        const origenParrafo = document.createElement('h1');
        origenParrafo.classList.add('card-title', 'font-weight-border');
        origenParrafo.textContent = origen;

        const destinoParrafo = document.createElement('p');
        destinoParrafo.innerHTML = `<span class="font-weight-border">Destino:</span>${destino}`;
        
        const pasajerosParrafo = document.createElement('p');
        pasajerosParrafo.innerHTML = `<span class="font-weight-border">Pasajeros:</span>${pasajeros}`;

        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `<span class="font-weight-border">Fecha:</span>${fecha}`;

        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `<span class="font-weight-border">Hora:</span>${hora}`;

        const observacionesParrafo = document.createElement('p');
        observacionesParrafo.innerHTML = `<span class="font-weight-border">Observaciones:</span>${observaciones}`;


        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn','btn-danger', 'mr-2');
        btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        btnEliminar.onclick = () => eliminarReserva(id); //Evento para poder utilizar el boton

        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn','btn-info');
        btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
        btnEditar.onclick = () => cargarEdicion(i); //Evento para poder utilizar el boton de edicion de reservas

        //Para que me aparezca en la interfaz debemos tener appendChild asi que:
        divReserva.appendChild(origenParrafo);
        divReserva.appendChild(destinoParrafo);
        divReserva.appendChild(pasajerosParrafo);
        divReserva.appendChild(fechaParrafo);
        divReserva.appendChild(horaParrafo);
        divReserva.appendChild(observacionesParrafo);
        divReserva.appendChild(btnEliminar); //Elimina la reserva
        divReserva.appendChild(btnEditar); //Editar la reserva

        contenedorReservas.appendChild(divReserva);
        })
    }

    limpiarHTML(){
        while(contenedorReservas.firstChild){
            contenedorReservas.removeChild(contenedorReservas.firstChild)
        }
    }

    imprimirAlerta(mensaje, tipo){
        //Vamos un div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        if(tipo==='error'){
            divMensaje.classList.add('alert-danger'); //alert danger es para que salga la alerta en rojo
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Vemos el mensaje de error en la interfaz
        divMensaje.textContent = mensaje;
        //Agregamos el mensaje
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-reserva'));

        setTimeout(()=>{
            divMensaje.remove();
        },3000);
    }

}

//Instanciacion: Crear una variable para poder utilizar los metodos que estan dentro de la clase que cree.
                 //Crear un objeto nuevo a partir de una clase.
const useri = new ui();
const administrarReservas = new reservas();


//Creamos los eventos
eventos()
function eventos(){
    formulario.addEventListener('submit', nuevaReserva); //submit es el boton linea 58 del HTML
    origenInput.addEventListener('change', datosReserva);
    destinoInput.addEventListener('change', datosReserva);
    pasajerosInput.addEventListener('change', datosReserva);
    fechaInput.addEventListener('change', datosReserva);
    horaInput.addEventListener('change', datosReserva);
    observacionesInput.addEventListener('change', datosReserva);
    fechaInput.addEventListener('change', validarFecha);

}

//Creacion de funciones

function validarOrigenDestino() {
    const origen = origenInput.value.trim();
    const destino = destinoInput.value.trim();

    if (origen === destino) {
        useri.imprimirAlerta('El origen y el destino no pueden ser iguales.', 'error');
        return false;
    }

    return true;
}

function nuevaReserva(e){ //e de evento change
    //Aqui agregamos y validamos una nueva reserva
    e.preventDefault()
   // console.log('nueva reserva')

   //Aqui indicamos que todos los campos son obligatorios y extraigo la infor. del objeto reservas
    const {origen, destino, pasajeros, fecha, hora, observaciones} = ObjReservas;
    if (origen === '' || destino==='' || pasajeros==='' || fecha==='' || hora==='' || observaciones===''){
        //console.log('Todos los campos son obligatorios')
        useri.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return;
    }

        // Validar que origen y destino no sean iguales
        if (!validarOrigenDestino()) {
        return;
        }

        // Validar la fecha
        if (!validarFecha()) {
            return;
        }

        if(editar){
            //console.log('estoy editando');

            formulario.querySelector('button[type=submit]').textContent = 'Añadir vuelo';
            editar = false; //Una vez modificada la reserva volvemos a colocar el boton como estaba

            administrarReservas.editarReserva({...ObjReservas}); 

            //mensaje datos correctos
            useri.imprimirAlerta('Se ha modificado la reserva correctamente')
        }else {
            //Agregar al arreglo o crear nueva cita
            console.log('Estoy creando una nueva reserva');
            //Generamos un id para cada reserva
            ObjReservas.id = Date.now();
            //console.log('nueva cita')
            administrarReservas.agregarReserva({...ObjReservas});
            //Mensaje de datos correctos
            useri.imprimirAlerta('Se ha reservado correctamente su vuelo')
        }

    //reset del formulario para que al agregar una reserva se borren los datos del formulario
    formulario.reset();
    reiniciarObjeto();
    useri.imprimirReservas(administrarReservas);

}
//Estructura para guardar los valores en el campo correcto
function datosReserva(e){
    //console.log(e.target.name)
    ObjReservas[e.target.name] = e.target.value;
    console.log(ObjReservas)
}

function reiniciarObjeto(){
    ObjReservas.origen = '';
    ObjReservas.destino = '';
    ObjReservas.telefono = '';
    ObjReservas.fecha = '';
    ObjReservas.hora = '';
    ObjReservas.observaciones = '';
}

function eliminarReserva(id){
    //console.log(id);
    administrarReservas.eliminarReserva(id); 
    //mostrar el mensaje 
    useri.imprimirAlerta('La reserva de su vuelo se ha eliminado correctamente');
    //Actualizar el objeto para actualizar la interfaz sin la reserva que se elimino
    useri.imprimirReservas(administrarReservas);
}

function cargarEdicion(reserva){
    //console.log(reserva);

    const {origen, destino, pasajeros, fecha, hora, observaciones, id} = reserva;

    //Llenamos los inputs
    origenInput.value = origen;
    destinoInput.value = destino;
    pasajerosInput.value = pasajeros;
    fechaInput.value = fecha;
    horaInput.value = hora;
    observacionesInput.value = observaciones;

    //Llenamos el objeto actualizandolo con los nuevos campos que se colocaron 
    ObjReservas.origen = origen;
    ObjReservas.destino = destino;
    ObjReservas.pasajeros = pasajeros;
    ObjReservas.fecha = fecha;
    ObjReservas.hora = hora;
    ObjReservas.observaciones = observaciones;
    ObjReservas.id = id;

    //Cmabio del texto en el boton 
    formulario.querySelector('button[type=submit]').textContent = 'Guardar cambios';
    editar = true; //Para que ingrese al if de la linea 161 de la funcion "nuevaReserva"
}

// Configuracion de la fecha mínima y permitir la selección del día actual
document.addEventListener('DOMContentLoaded', () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    const ano = hoy.getFullYear();
    const fechaMinima = `${ano}-${mes}-${dia}`;

    // Asignar la fecha mínima al campo de fecha
    fechaInput.setAttribute('min', fechaMinima);
});

// Validacion de la fecha seleccionada y dejar que permita el día actual
function validarFecha() {
    const fechaSeleccionada = Date(fechaInput.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Con este metodo ignoramos horas para comparar solo las fechas

    if (fechaSeleccionada < hoy) {
        useri.imprimirAlerta('La fecha no puede ser anterior al día actual. Intente nuevamente.', 'error');
        return false;
    }

    return true;
}
