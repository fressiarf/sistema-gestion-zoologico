import { Animal } from './animal.js';

export class Mamifero extends Animal {
    constructor(id, nombre, especie, claseAnimal, esMamifero) {
        super(id, nombre, especie, claseAnimal);
        this.esMamifero = esMamifero;
    }

    emitirSonido() {
        return "El mamífero emite un sonido.";
    }

    tipoMovimiento() {
        return "El mamífero se mueve.";
    }

    mostrarInformacion() {
        return `${super.mostrarInformacion()}, Es Mamífero: ${this.esMamifero ? 'Sí' : 'No'}`;
    }
}