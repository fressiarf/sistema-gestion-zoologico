class Animal {
    constructor(id, nombre, especie, clase) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.clase = clase;
    }

    mostrarInformacion() {
        console.log(`ID: ${this.id}`);
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Especie: ${this.especie}`);
        console.log(`Clase: ${this.clase}`);
    }

    getNombre() {
        return this.nombre;
    }

    getEspecie() {
        return this.especie;
    }

    getClase() {
        return this.clase;
    }
}





/* class Empresa {
    constructor(nombre) {
        this.nombre = nombre;
        this.departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];
    }

    agregarDepartamento(departamento) {
        this.departamentos.push(departamento);
        localStorage.setItem("departamentos", JSON.stringify(this.departamentos));
        console.log("El departamento ha sido agregado con éxito");
    }

    mostrarInfo() {
        console.log(`\nEmpresa: ${this.nombre} ======`);
        this.departamentos.forEach(departamento => {
            console.log(`\nDepartamento: ${departamento.nombre}`);
            if (departamento.empleados && departamento.empleados.length > 0) {
                departamento.empleados.forEach(empleado => {
                    console.log(`   - Nombre: ${empleado.nombre} | Puesto: ${empleado.puesto}`);
                });
            } else {
                console.log("   Sin empleados registrados.");
            }
        });
    }
}
const miEmpresa = new Empresa("Dev Costa Rica");
 */