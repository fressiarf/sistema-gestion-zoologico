import { Animal } from './animal.js';

export class Reptil extends Animal {
    constructor(id, nombre, especie, claseAnimal, esReptil) {
        super(id, nombre, especie, claseAnimal);
        this.esReptil = esReptil;
    }

    emitirSonido() {
        return "El reptil sisea o hace sonidos.";
    }

    desplazarse() {
        return "El reptil se desplaza o arrastra.";
    }

    mostrarInformacion() {
        return `${super.mostrarInformacion()}, Es Reptil: ${this.esReptil ? 'Sí' : 'No'}`;
    }
}
