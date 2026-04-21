import { Mamifero, Ave, Reptil, Animal, Usuario } from '../classes/zoologico.js';
export function crearObjetoAnimal(dataAnimal) {
    if (!dataAnimal) return null;
    
    const claseDesc = dataAnimal.claseAnimal ? dataAnimal.claseAnimal.toLowerCase() : '';
    
    switch (claseDesc) {
        case 'mamifero':
        case 'mamífero':
            return new Mamifero(dataAnimal.id, dataAnimal.nombre, dataAnimal.especie, dataAnimal.claseAnimal, dataAnimal.esMamifero);
        case 'ave':
            return new Ave(dataAnimal.id, dataAnimal.nombre, dataAnimal.especie, dataAnimal.claseAnimal, dataAnimal.esAve);
        case 'reptil':
            return new Reptil(dataAnimal.id, dataAnimal.nombre, dataAnimal.especie, dataAnimal.claseAnimal, dataAnimal.esReptil);
        default:
            return new Animal(dataAnimal.id, dataAnimal.nombre, dataAnimal.especie, dataAnimal.claseAnimal);
    }
}
const ANIMALES_KEY = 'animales_db';

export function guardarAnimales(animalesArray) {
    localStorage.setItem(ANIMALES_KEY, JSON.stringify(animalesArray));
}

export function obtenerAnimales() {
    const data = JSON.parse(localStorage.getItem(ANIMALES_KEY)) || [];
    return data.map(item => crearObjetoAnimal(item));
}

export function obtenerAnimalPorId(id) {
    const animales = obtenerAnimales();
    return animales.find(animal => animal.id === id) || null;
}

export function crearAnimal(animal) {
    const animales = obtenerAnimales();
    animales.push(animal);
    guardarAnimales(animales);
    return animal;
}

export function actualizarAnimal(id, animalActualizado) {
    const animales = obtenerAnimales();
    const index = animales.findIndex(a => a.id === id);
    if (index !== -1) {
        animales[index] = animalActualizado;
        guardarAnimales(animales);
        return true;
    }
    return false;
}

export function eliminarAnimal(id) {
    const animales = obtenerAnimales();
    const nuevaLista = animales.filter(a => a.id !== id);
    guardarAnimales(nuevaLista);
    return true;
}
const USUARIOS_KEY = 'usuarios_db';

export function guardarUsuarios(usuariosArray) {
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuariosArray));
}

export function obtenerUsuarios() {
    const data = JSON.parse(localStorage.getItem(USUARIOS_KEY)) || [];
    return data.map(u => new Usuario(u.id, u.username, u.password, u.rol));
}

export function buscarUsuario(username) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(u => u.username === username) || null;
}

export function registrarUsuario(usuarioInstancia) {
    const usuarios = obtenerUsuarios();
    if (usuarios.find(u => u.username === usuarioInstancia.username)) {
        console.error("El usuario ya está registrado en la base de datos.");
        return false;
    }
    usuarios.push(usuarioInstancia);
    guardarUsuarios(usuarios);
    return true;
}

export function validarCredenciales(username, password) {
    const usuario = buscarUsuario(username);
    if (usuario && usuario.password === password) {
        return true;
    }
    return false;
}

