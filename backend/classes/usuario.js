export class Usuario {
    constructor(id, username, password, rol) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.rol = rol;
    }

    iniciarSesion() {
        console.log(`El usuario ${this.username} ha iniciado sesión.`);
        return true;
    }

    cerrarSesion() {
        console.log(`El usuario ${this.username} ha cerrado sesión.`);
        return true;
    }

    mostrarInformacion() {
        return `ID: ${this.id}, Username: ${this.username}, Rol: ${this.rol}`;
    }

    getRol() {
        return this.rol;
    }
}

