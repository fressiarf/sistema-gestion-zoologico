import { Animal } from './animal.js';

export class Ave extends Animal {
    constructor(id, nombre, especie, claseAnimal, esAve) {
        super(id, nombre, especie, claseAnimal);
        this.esAve = esAve;
    }

    emitirSonido() {
        return "El ave canta o hace sonidos.";
    }

    volar() {
        return "El ave vuela por los aires.";
    }

    mostrarInformacion() {
        return `${super.mostrarInformacion()}, Es Ave: ${this.esAve ? 'Sí' : 'No'}`;
    }
}

