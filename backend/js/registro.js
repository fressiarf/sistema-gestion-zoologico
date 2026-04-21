import { Autenticacion } from '../classes/autenticacion.js';

document.addEventListener('DOMContentLoaded', () => {
    if (Autenticacion.verificarSesion()) {
        window.location.href = './dashboard.html';
        return;
    }

    const registerForm = document.getElementById('register-form');
    const usernameIn = document.getElementById('username');
    const passwordIn = document.getElementById('password');
    const roleDropdown = document.getElementById('register-role');
    const authMsg = document.getElementById('auth-msg');

    function showMsg(text, isError=false) {
        authMsg.textContent = text;
        authMsg.style.color = isError ? '#ef4444' : '#1a5127';
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = usernameIn.value.trim();
        const p = passwordIn.value.trim();
        const setRole = roleDropdown ? roleDropdown.value : 'Visitante';

        if(!u || !p) {
            showMsg('Llene ambos campos por favor', true);
            setTimeout(() => authMsg.textContent = '', 3000);
            return;
        }

        if (Autenticacion.registrarUsuario(Date.now(), u, p, setRole)) {
            showMsg(`¡${setRole} Registrado Exitósamente! Redirigiendo a Iniciar Sesión...`);
            setTimeout(() => {
                window.location.href = './login.html';
            }, 1800);
        } else {
            showMsg('Ese nombre de usuario ya existe en el sistema.', true);
            setTimeout(() => authMsg.textContent = '', 3000);
        }
    });
});

