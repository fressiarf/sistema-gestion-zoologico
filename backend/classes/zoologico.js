import { Animal } from './animal.js';
import { Mamifero } from './mamifero.js';
import { Ave } from './ave.js';
import { Reptil } from './reptil.js';
import { Usuario } from './usuario.js';
import { Autenticacion } from './autenticacion.js';
import { crearObjetoAnimal, guardarAnimales } from '../services/storageService.js';

export class Zoologico {
    constructor(nombre) {
        this.nombre = nombre;
        this.listaAnimales = this._cargarDesdeStorage();
    }

    _cargarDesdeStorage() {
        const data = JSON.parse(localStorage.getItem('animales_db')) || [];
        return data.map(item => crearObjetoAnimal(item));
    }

    _verificarPermiso(accion) {
        const user = Autenticacion.obtenerUsuarioActual();
        if (!user) {
            console.error(`Acceso denegado. Se requiere iniciar sesión.`);
            return false;
        }

        if (user.rol === 'Administrador') {
            return true;
        }

        if (user.rol === 'Visitante' && accion === 'listar') {
            return true;
        }

        console.error(`Acceso denegado. Un '${user.rol}' no tiene permisos para la acción: ${accion}`);
        return false;
    }

    agregarAnimal(animal) {
        if (!this._verificarPermiso('agregar')) return false;

        this.listaAnimales.push(animal);
        guardarAnimales(this.listaAnimales);
        console.log(`Animal agregado exitosamente al zoológico ${this.nombre}.`);
        return true;
    }

    eliminarAnimal(id) {
        if (!this._verificarPermiso('eliminar')) return false;

        const longitudOriginal = this.listaAnimales.length;
        this.listaAnimales = this.listaAnimales.filter(a => a.id !== id);
        
        if (longitudOriginal !== this.listaAnimales.length) {
            guardarAnimales(this.listaAnimales);
            console.log(`Animal eliminado.`);
            return true;
        }
        return false;
    }

    actualizarAnimal(id, nuevoAnimal) {
        if (!this._verificarPermiso('actualizar')) return false;

        const index = this.listaAnimales.findIndex(a => a.id === id);
        if (index !== -1) {
            this.listaAnimales[index] = nuevoAnimal;
            guardarAnimales(this.listaAnimales);
            console.log(`Animal actualizado.`);
            return true;
        }
        return false;
    }

    listarAnimales() {
        if (!this._verificarPermiso('listar')) return [];
        return this.listaAnimales;
    }

    buscarAnimal(id) {
        if (!this._verificarPermiso('listar')) return null;
        return this.listaAnimales.find(a => a.id === id) || null;
    }

    mostrarInformacion() {
        if (!this._verificarPermiso('listar')) return "Acceso Denegado";
        return `Zoológico: ${this.nombre} | Animales Totales: ${this.listaAnimales.length}`;
    }
}

export {
    Animal,
    Mamifero,
    Ave,
    Reptil,
    Usuario,
    Autenticacion
};
