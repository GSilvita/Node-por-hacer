const argv = require('./config/yargs').argv;
const colors = require('colors');

const porHacer = require('./por-hacer/por-hacer');


let comando = argv._[0];

switch (comando) {
    case 'crear':
        console.log('Creando tarea'.yellow);
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.getListado();
        console.log('=========Tareas========='.green);
        for (const tarea of listado) {
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('==========================='.green);
        }
        break;

    case 'actualizar':
        let atualizacion = porHacer.actualizarTarea(argv.descripcion, argv.completado);
        break;

    case 'borrar':
        let borrado = porHacer.borrarTarea(argv.descripcion);
        break;
    case 'listarC':
        let tareasCompletadas = porHacer.listarTareasCompletadas();
        console.log('=========Completadas========='.green);
        for (const tarea of tareasCompletadas) {
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('==========================='.green);
        }
        break;
    default:
        console.log('Comando vacio'.cyan);
        break;
}

//actualizar repositorio Git de carpeta 3 y 4