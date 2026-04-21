import { Autenticacion } from '../classes/autenticacion.js';
import { Zoologico } from '../classes/zoologico.js';
import { crearObjetoAnimal } from '../services/storageService.js';
import { DataService } from '../services/dataService.js';

document.addEventListener('DOMContentLoaded', () => {

    if (!Autenticacion.verificarSesion()) {
        window.location.replace('./login.html');
        return;
    }

    const user = Autenticacion.obtenerUsuarioActual();

    if (user.rol !== 'Administrador') {
        Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: 'Sólo el perfil Administrador puede ingresar al Panel Central.',
            confirmButtonColor: '#1a5127'
        }).then(() => window.location.replace('./index.html'));
        return;
    }

    document.getElementById('app').classList.remove('hidden');
    document.getElementById('user-display').textContent = `Admin: ${user.username}`;

    document.getElementById('btn-logout').addEventListener('click', () => {
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: 'Tendrás que volver a ingresar para acceder al panel.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1a5127',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Autenticacion.logout();
                window.location.href = './login.html';
            }
        });
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        });
    });

    initAnimales();
    initHorarios();
    initMembresias();
    initRecintos();
    initLanding();

    function showSuccess(msg) {
        Swal.fire({ icon: 'success', title: '¡Guardado!', text: msg, timer: 1800, showConfirmButton: false });
    }

    function initAnimales() {
        const miZoo = new Zoologico('Zoo TerraNova');
        const animalForm = document.getElementById('animal-form');
        const animalGrid = document.getElementById('animal-grid');
        const statsBadge = document.getElementById('animal-stats');

        renderAnimales();

        animalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const animalClass = document.getElementById('animal-class').value;
            const nombre = document.getElementById('animal-name').value.trim();
            const especie = document.getElementById('animal-species').value.trim();
            const baseProps = { id: Date.now(), nombre, especie, claseAnimal: animalClass };
            if (animalClass === 'Mamifero') baseProps.esMamifero = true;
            if (animalClass === 'Ave') baseProps.esAve = true;
            if (animalClass === 'Reptil') baseProps.esReptil = true;
            const objFinal = crearObjetoAnimal(baseProps);
            if (miZoo.agregarAnimal(objFinal)) {
                animalForm.reset();
                renderAnimales();
                showSuccess('Animal registrado correctamente.');
            }
        });

        function renderAnimales() {
            const animales = miZoo.listarAnimales();
            statsBadge.textContent = `Total: ${animales.length}`;
            animalGrid.innerHTML = animales.length === 0
                ? `<div class="empty-state">No hay animales registrados aún.</div>`
                : '';
            animales.forEach(a => {
                const card = document.createElement('div');
                card.className = 'animal-card';
                card.innerHTML = `
                    <div class="animal-card-info">
                        <h4>${a.nombre} <span class="tag">${a.claseAnimal}</span></h4>
                        <p>${a.especie}</p>
                    </div>
                    <i class="ph ph-trash del-icon" title="Eliminar" data-id="${a.id}"></i>
                `;
                card.querySelector('.del-icon').addEventListener('click', () => {
                    if (miZoo.eliminarAnimal(a.id)) renderAnimales();
                });
                animalGrid.appendChild(card);
            });
        }
    }

    function initHorarios() {
        const data = DataService.get('horarios');
        const fields = ['diasAbierto', 'apertura', 'cierre', 'diasCerrado', 'motivoCierre', 'estacionamiento', 'notaTaquilla', 'ubicacion'];
        fields.forEach(f => {
            const el = document.getElementById('h-' + f);
            if (el) el.value = data[f] || '';
        });
        document.getElementById('save-horarios').addEventListener('click', () => {
            const updated = {};
            fields.forEach(f => {
                const el = document.getElementById('h-' + f);
                if (el) updated[f] = el.value.trim();
            });
            DataService.set('horarios', updated);
            showSuccess('Horarios actualizados en el sitio.');
        });
    }

    function initMembresias() {
        const membresias = DataService.get('membresias');
        const container = document.getElementById('membresias-list');
        container.innerHTML = '';
        membresias.forEach((m, i) => {
            const card = document.createElement('div');
            card.className = `membresia-admin-card ${m.popular ? 'popular' : ''} ${m.premium ? 'premium' : ''}`;
            card.innerHTML = `
                <h3>${m.popular ? '⭐ ' : ''}${m.nombre}</h3>
                <div class="form-grid">
                    <div class="input-group">
                        <label>Nombre del plan</label>
                        <input type="text" class="m-nombre" value="${m.nombre}">
                    </div>
                    <div class="input-group">
                        <label>Precio (Q)</label>
                        <input type="number" class="m-precio" value="${m.precio}">
                    </div>
                    <div class="input-group">
                        <label>Período</label>
                        <input type="text" class="m-periodo" value="${m.periodo}">
                    </div>
                </div>
                <div class="input-group" style="margin-top:0.8rem;">
                    <label>Beneficios (uno por línea)</label>
                    <textarea class="m-beneficios" rows="4">${m.beneficios.join('\n')}</textarea>
                </div>
                <button class="btn-save save-membresia" data-index="${i}"><i class="ph ph-floppy-disk"></i> Guardar</button>
            `;
            container.appendChild(card);
        });

        container.querySelectorAll('.save-membresia').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                const card = btn.closest('.membresia-admin-card');
                membresias[idx].nombre = card.querySelector('.m-nombre').value.trim();
                membresias[idx].precio = parseFloat(card.querySelector('.m-precio').value);
                membresias[idx].periodo = card.querySelector('.m-periodo').value.trim();
                membresias[idx].beneficios = card.querySelector('.m-beneficios').value.split('\n').map(l => l.trim()).filter(l => l);
                DataService.set('membresias', membresias);
                showSuccess('Membresía actualizada en el sitio.');
            });
        });
    }

    function initRecintos() {
        const recintos = DataService.get('recintos');
        const container = document.getElementById('recintos-list');
        container.innerHTML = '';
        recintos.forEach((r, ri) => {
            const card = document.createElement('div');
            card.className = 'recinto-admin-card';
            let animalesHTML = r.animales.map((a, ai) => `
                <div class="animal-recinto-row">
                    <div class="input-group">
                        <label>Nombre</label>
                        <input type="text" class="r-a-nombre" data-ri="${ri}" data-ai="${ai}" value="${a.nombre}">
                    </div>
                    <div class="input-group">
                        <label>Descripción</label>
                        <input type="text" class="r-a-desc" data-ri="${ri}" data-ai="${ai}" value="${a.descripcion}">
                    </div>
                </div>
            `).join('');
            card.innerHTML = `
                <h3><i class="ph ph-tree-evergreen"></i> ${r.region}</h3>
                <div class="form-grid">
                    <div class="input-group full-width">
                        <label>Descripción de la región</label>
                        <input type="text" class="r-desc" data-ri="${ri}" value="${r.descripcion}">
                    </div>
                </div>
                <div class="animales-recinto">
                    <h4>Exhibiciones / Animales</h4>
                    ${animalesHTML}
                </div>
                <button class="btn-save save-recinto" data-ri="${ri}"><i class="ph ph-floppy-disk"></i> Guardar Recinto</button>
            `;
            container.appendChild(card);
        });

        container.querySelectorAll('.save-recinto').forEach(btn => {
            btn.addEventListener('click', () => {
                const ri = parseInt(btn.dataset.ri);
                const card = btn.closest('.recinto-admin-card');
                recintos[ri].descripcion = card.querySelector('.r-desc').value.trim();
                card.querySelectorAll('.r-a-nombre').forEach(el => {
                    const ai = parseInt(el.dataset.ai);
                    recintos[ri].animales[ai].nombre = el.value.trim();
                });
                card.querySelectorAll('.r-a-desc').forEach(el => {
                    const ai = parseInt(el.dataset.ai);
                    recintos[ri].animales[ai].descripcion = el.value.trim();
                });
                DataService.set('recintos', recintos);
                showSuccess('Recinto actualizado en el sitio.');
            });
        });
    }

    function initLanding() {
        const data = DataService.get('landing');
        const fields = ['heroTitulo', 'heroTituloSpan', 'heroSubtitulo', 'heroBtnTexto',
            'sobreNosotrosP1', 'sobreNosotrosP2',
            'stat1Num', 'stat1Label', 'stat2Num', 'stat2Label', 'stat3Num', 'stat3Label'];
        fields.forEach(f => {
            const el = document.getElementById('l-' + f);
            if (el) el.value = data[f] || '';
        });
        document.getElementById('save-landing').addEventListener('click', () => {
            const updated = {};
            fields.forEach(f => {
                const el = document.getElementById('l-' + f);
                if (el) updated[f] = el.value.trim();
            });
            DataService.set('landing', updated);
            showSuccess('Landing page actualizada. Los cambios se ven al visitar el sitio.');
        });
    }

});
