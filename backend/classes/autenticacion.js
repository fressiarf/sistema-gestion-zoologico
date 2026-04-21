import { Usuario } from './usuario.js';

export const Autenticacion = {
    registrarUsuario(id, username, password, rol) {
        const usuariosDB = JSON.parse(localStorage.getItem('usuarios_db')) || [];
        const existe = usuariosDB.find(user => user.username === username);
        
        if (existe) {
            console.error("El usuario ya existe.");
            return false;
        }

        const nuevoUsuario = new Usuario(id, username, password, rol);
        usuariosDB.push(nuevoUsuario);
        localStorage.setItem('usuarios_db', JSON.stringify(usuariosDB));
        console.log("Usuario registrado exitosamente.");
        return true;
    },

    login(username, password) {
        const usuariosDB = JSON.parse(localStorage.getItem('usuarios_db')) || [];
        const usuarioEncontrado = usuariosDB.find(user => user.username === username && user.password === password);
        
        if (usuarioEncontrado) {
            localStorage.setItem('usuario_actual', JSON.stringify(usuarioEncontrado));
            const instancia = new Usuario(
                usuarioEncontrado.id, 
                usuarioEncontrado.username, 
                usuarioEncontrado.password, 
                usuarioEncontrado.rol
            );
            instancia.iniciarSesion();
            return true;
        }
        
        console.error("Credenciales incorrectas.");
        return false;
    },

    logout() {
        const actual = this.obtenerUsuarioActual();
        if (actual) {
            const instancia = new Usuario(actual.id, actual.username, actual.password, actual.rol);
            instancia.cerrarSesion();
        }
        localStorage.removeItem('usuario_actual');
        return true;
    },

    obtenerUsuarioActual() {
        const actual = localStorage.getItem('usuario_actual');
        return actual ? JSON.parse(actual) : null;
    },

    verificarSesion() {
        return this.obtenerUsuarioActual() !== null;
    }
};

