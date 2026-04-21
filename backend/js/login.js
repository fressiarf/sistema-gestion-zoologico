import { Autenticacion } from '../classes/autenticacion.js';

document.addEventListener('DOMContentLoaded', () => {
    if (Autenticacion.verificarSesion()) {
        window.location.href = './dashboard.html';
        return;
    }

    const loginForm = document.getElementById('login-form');
    const usernameIn = document.getElementById('username');
    const passwordIn = document.getElementById('password');
    const authMsg = document.getElementById('auth-msg');

    function showMsg(text, isError=false) {
        authMsg.textContent = text;
        authMsg.style.color = isError ? '#ef4444' : '#1a5127';
        setTimeout(() => authMsg.textContent = '', 3000);
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = usernameIn.value.trim();
        const p = passwordIn.value.trim();
        
        if (Autenticacion.login(u, p)) {
            const user = Autenticacion.obtenerUsuarioActual();
            
            if (user.rol === 'Administrador') {
                Swal.fire({
                    title: 'Bóveda de Seguridad',
                    text: 'Ingresa el PIN de Administrador para continuar',
                    input: 'password',
                    icon: 'warning',
                    inputPlaceholder: 'PIN Secreto',
                    showCancelButton: true,
                    confirmButtonColor: '#1a5127',
                    cancelButtonColor: '#ef4444',
                    confirmButtonText: 'Verificar',
                    cancelButtonText: 'Cancelar',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (result.value === '1234') {
                            window.location.href = './dashboard.html';
                        } else {
                            Autenticacion.logout();
                            Swal.fire('Error', 'PIN incorrecto. Sesión cerrada.', 'error');
                        }
                    } else {
                        Autenticacion.logout();
                    }
                });
            } else {
                window.location.href = './index.html';
            }
        } else {
            showMsg('Credenciales incorrectas.', true);
        }
    });
});

