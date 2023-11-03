
class Cancion{

    constructor(titulo,autor,duracion){
        this.titulo=titulo;
        this.autor=autor;
        this.duracion=duracion;
    }
}

class Disco {

    constructor(nombre,artista,fechaPublicacion,estiloMusical,listaCanciones = []){
        this.nombre=nombre;
        this.listaCanciones=listaCanciones;
        this.artista=artista;
        this.fechaPublicacion=fechaPublicacion;
        this.estiloMusical=estiloMusical;
    }

    mostrarCanciones(){

        document.write(`<h2>Canciones del Disco ${this.nombre}</h2>`)
        document.write(`<ul>`)
        this.listaCanciones.forEach((element)=>{
            debugger;
            document.write(`<li>Titulo: ${element.titulo}<li> <br>`)
            document.write(`<li>Autor: ${element.autor}<li> <br>`)
            document.write(`<li>Duracion: ${element.duracion}<li> <br>`)
        })
        document.write(`</ul>`)

    }

    addCanciones(){
        let titulo = prompt("Nombre de la canción que quieres añadir")
        let autor= prompt("Autor de la cancion")
        let duracion = prompt("Cuanto dura la cancion?")

        this.listaCanciones.push(new Cancion(titulo,autor,duracion))
    }

    borrarCanciones(){
        let titulo = prompt("Como se llama la cancion que quieres borrar?")

        let posicion = this.listaCanciones.findIndex((cancion)=> cancion.titulo== titulo)

        if(posicion!=-1){
            this.listaCanciones.splice(posicion,1);
            alert(`Cancion ${posicion.titulo} borrada`)
        }else{
            alert("Cancion no encontrada")
        }
    }
}


    function addDisco(){
            let nombre=prompt("Nombre del disco")
            let artista = prompt("Nombre del artista del disco")
            let fecha = prompt("Año de publicación del disco")
            let estilo = prompt("Estilo musical del disco")

            let disco = new Disco(nombre,artista,fecha,estilo);

        let pregunta = confirm("Desea añadir una cancion?")

        while(pregunta===true){
            disco.addCanciones();
            pregunta=confirm("¿Desea añadir otra cancion?")
        } 
        
        guardarDiscoLocalStorage(disco)

    }

    function eliminarDisco(){

        const Coleccion =cargarColeccion();

        let nombre = prompt("Que disco deseas eliminar?")

        let posicion = Coleccion.findIndex((element)=>element.nombre==nombre)
        
        if(posicion!== -1){
            Coleccion.splice(posicion,1);
            alert(`Disco borrado`)
            guardarDiscoLocalStorage(Coleccion)
        }else{
            alert("Disco no encontrado")
        }


    }

    function cargarColeccion(){
        const Coleccion = [];
        if(localStorage.getItem("coleccion")!==null){
            let coleccionJS = JSON.parse(localStorage.getItem("coleccion"));
            coleccionJS.forEach((element)=>{
                let fecha = new Date(element.fechaPublicacion)
                const disco = new Disco(element.nombre,element.artista,fecha,element.estiloMusical)
                Coleccion.push(disco);
            })
            alert("Se ha cargado la coleccion")
        }else{
            alert("No se ha cargado ninguna agenda")
        }

        return Coleccion;
    }

    function guardarDiscoLocalStorage(disco){
        const Coleccion=cargarColeccion();
        Coleccion.push(disco)
        localStorage.setItem("coleccion", JSON.stringify(Coleccion))
    }

    function addCancionesADiscoExistente(){

        const Coleccion= cargarColeccion();

        let nombreDisco = prompt("Como se llama el disco al que vas a añadir canciones?")

        let discoBuscado = Coleccion.find((element) => element.nombre== nombreDisco);

        if(discoBuscado){
            discoBuscado.addCanciones();
            guardarDiscoLocalStorage(discoBuscado)
        }else{
            alert("Disco no encontrado")
        }

        
    }

    function mostrarCancionesDeDiscoExistente(){
        const Coleccion= cargarColeccion(); 
        Coleccion.forEach((element)=>{
            debugger;
            element.mostrarCanciones()
        });
    }


    function menu(){

        let salir = false;

        do{
    
            let opcion = prompt("¿Qué desea hacer? \n 1.Añadir nuevo disco a la coleccion \n 2.Añadir Canciones a un disco Existente \n 3.Eliminar disco \n 4.Salir")

            switch(opcion){

                case "1":
                    addDisco();
                break;

                case "2":
                    addCancionesADiscoExistente();
                break;

                case "3":
                    eliminarDisco();
                break;

                case "4":
                    mostrarCancionesDeDiscoExistente();
                    salir=true;
                break;

            }

        }while(!salir)

    }

    menu();


    
//FUncion cargarcoleccion que os devuelva la coleccion y guardar coleccion cada vez que quiera guardar algo
