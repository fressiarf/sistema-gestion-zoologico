export class Animal {
    constructor(id, nombre, especie, claseAnimal) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.claseAnimal = claseAnimal;
    }

    getNombre() {
        return this.nombre;
    }

    getEspecie() {
        return this.especie;
    }

    getClase() {
        return this.claseAnimal;
    }

    mostrarInformacion() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Especie: ${this.especie}, Clase Animal: ${this.claseAnimal}`;
    }
}
