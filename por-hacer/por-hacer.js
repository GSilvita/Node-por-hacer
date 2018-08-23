const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`DB/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../DB/data.json')
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    listadoPorHacer = require('../DB/data.json');
    return listadoPorHacer;
}

const actualizarTarea = (descripcion, completado) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;

        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrarTarea = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }


}

const listarTareasCompletadas = () => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado !== false);

    if (nuevoListado.length >= 0) {
        return nuevoListado;
    } else {
        return "No hay tareas completadas";
    }
}

module.exports = {
    crear,
    getListado,
    actualizarTarea,
    borrarTarea,
    listarTareasCompletadas
}