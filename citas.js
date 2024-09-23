//Colocamos todos los selectores 
const mascotaInput = document.querySelector('#mascota')
const propietarioInput = document.querySelector('#propietario')
const telefonoInput = document.querySelector('#telefono')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const sintomasInput = document.querySelector('#sintomas')

const formulario = document.querySelector('#nueva-cita')
const contenedorCitas = document.querySelector('#citas')

let editar;

//Estructura para guardar la informacion que se reciba de los inputs
const ObjCitas = {
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:''
}

//Creamos las clases
class citas{
    constructor(){
        this.citas = []
        
    }

    agregarCita(cita){
        //this.citas.push(cita)
        this.citas = [...this.citas,cita]
        console.log(this.citas) //Para ir viendo como se van agregando las citas
    }

    eliminarCita(id){
        this.citas = this.citas.filter(citas=>citas.id !== id);
    }

    editarCita(citaAct){
        this.citas = this.citas.map(citas=> citas.id === citaAct.id ? citaAct:citas);
    }
}

class ui{
    imprimirCitas({citas}){
    this.limpiarHTML();
    citas.forEach(i=>{
        const {mascota, propietario, telefono, fecha, hora, sintomas, id} = i;
        const divCita = document.createElement('div');
        divCita.classList.add('cita', 'p-3');
        //Creamos un atributo personalizado
        divCita.dataset.id = id;

        //Generamos textos para las fichas de citas
        const mascotaParrafo = document.createElement('h2');
        mascotaParrafo.classList.add('card-title', 'font-weight-border');
        mascotaParrafo.textContent = mascota;

        const propietarioParrafo = document.createElement('p');
        propietarioParrafo.innerHTML = `<span class="font-weight-border">Propietario:</span>${propietario}`;
        
        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `<span class="font-weight-border">Telefono:</span>${telefono}`;

        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `<span class="font-weight-border">Fecha:</span>${fecha}`;

        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `<span class="font-weight-border">Hora:</span>${hora}`;

        const sintomasParrafo = document.createElement('p');
        sintomasParrafo.innerHTML = `<span class="font-weight-border">Sintomas:</span>${sintomas}`;


        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn','btn-danger', 'mr-2');
        btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        btnEliminar.onclick = () => eliminarCita(id); //Evento para poder utilizar el boton

        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn','btn-info');
        btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
        btnEditar.onclick = () => cargarEdicion(i); //Evento para poder utilizar el boton
        //Para que me aparezca en la interfaz debemos tener appendChild asi que:
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);
        divCita.appendChild(btnEliminar); //Elimina la cita
        divCita.appendChild(btnEditar); //Edita la cita

        contenedorCitas.appendChild(divCita);
        })
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
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
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'));

        setTimeout(()=>{
            divMensaje.remove();
        },3000);
    }

}

//Instanciacion
const useri = new ui();
const administrarCitas = new citas();

//administrarCitas.
//Creamos los eventos
eventos()
function eventos(){
    formulario.addEventListener('submit', nuevaCita); //submit es el boton linea 58 del HTML
    mascotaInput.addEventListener('change', datosCita); //tambien se puede usar input en vez de change
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);

}

function nuevaCita(e){ //e de evento change
    //Aqui agregamos y validamos una nueva cita
    e.preventDefault()
   // console.log('nueva cita')

   //Aqui indicamos que todos los campos son obligatorios y extraigo la infor. del objeto cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = ObjCitas 
    if (mascota === '' || propietario==='' || telefono==='' || fecha==='' || hora==='' || sintomas===''){
        //console.log('Todos los campos son obligatorios')
        useri.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return;
    }

        if(editar){
            console.log('estoy editando');

            formulario.querySelector('button[type=submit]').textContent = 'Crear cita';
            editar = false; //Una vez modificada la cita volvemos a colocar el boton como estaba

            administrarCitas.editarCita({...ObjCitas}); 

            //mensaje datos correctos
            useri.imprimirAlerta('Se ha modificado la cita correctamente')
        }else {
            //Agregar al arreglo o crear nueva cita
            console.log('Estoy creando una nueva cita');
            //Generamos un id
            ObjCitas.id = Date.now();
            //console.log('nueva cita')
            administrarCitas.agregarCita({...ObjCitas});
            //Mensaje de datos correctos
            useri.imprimirAlerta('Se ha agregado la cita correctamente')
        }

    //reset del formulario 
    formulario.reset();
    reiniciarObjeto();
    useri.imprimirCitas(administrarCitas);

}
//Estructura para guardar los valores en el campo correcto
function datosCita(e){
    //console.log(e.target.name)
    ObjCitas[e.target.name] = e.target.value
    //console.log(ObjCitas)
}

function reiniciarObjeto(){
    ObjCitas.mascota = '';
    ObjCitas.propietario = '';
    ObjCitas.telefono = '';
    ObjCitas.fecha = '';
    ObjCitas.hora = '';
    ObjCitas.sintomas = '';
}

function eliminarCita(id){
    //console.log(id);
    administrarCitas.eliminarCita(id); 
    //mostrar el mensaje 
    useri.imprimirAlerta('La cita se ha eliminado correctamente');
    //Actualizar el objeto para actualizar la interfaz
    useri.imprimirCitas(administrarCitas);
}

function cargarEdicion(cita){
    console.log(cita);

    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    //Llenamos los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenamos el objeto actualizandolo con los nuevos campos 
    ObjCitas.mascota = mascota;
    ObjCitas.propietario = propietario;
    ObjCitas.telefono = telefono;
    ObjCitas.fecha = fecha;
    ObjCitas.hora = hora;
    ObjCitas.sintomas = sintomas;
    ObjCitas.id = id;

    //Vamos a cambiar el texto del boton 
    formulario.querySelector('button[type=submit]').textContent = 'Guardar';

    editar = true; //Para que ingrese al if de la linea 159 de la funcion "nuevaCita"
}