class Mamifero extends Animal {
    constructor(id, nombre, especie, clase) {
        super(id, nombre, especie, clase);
    }

    emitirSonido() {
        console.log("El mamifero emite un sonido");
    }

    tipoMovimiento() {
        console.log("El mamifero se mueve");
    }

    mostrarInformacion() {
        super.mostrarInformacion();
        this.emitirSonido();
        this.tipoMovimiento();
    }
}