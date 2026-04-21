export const DataService = {
    KEYS: {
        horarios: 'zoo_horarios',
        membresias: 'zoo_membresias',
        recintos: 'zoo_recintos',
        landing: 'zoo_landing',
        animales: 'zoo_animales'
    },

    defaults: {
        horarios: {
            apertura: '9:00 AM',
            cierre: '4:00 PM',
            diasAbierto: 'Martes a Domingo',
            diasCerrado: 'Lunes',
            motivoCierre: 'Mantenimiento',
            notaTaquilla: '* Las taquillas cierran 30 minutos antes del cierre.',
            ubicacion: 'Zona 13, Ciudad de Guatemala',
            estacionamiento: 'Q20 por día'
        },
        membresias: [
            {
                id: 1,
                nombre: 'Pase Diario',
                precio: 40,
                periodo: '/día',
                popular: false,
                premium: false,
                beneficios: ['Acceso individual por 1 día', 'Acceso a todos los recintos regulares', 'Presentaciones educativas en vivo'],
                noIncluye: ['Acceso a áreas VIP', 'Estacionamiento (Q20 extra)']
            },
            {
                id: 2,
                nombre: 'Pasaporte VIP Anual',
                precio: 150,
                periodo: '/año',
                popular: true,
                premium: false,
                beneficios: ['Acceso ilimitado por 1 año', 'Acceso prioritario sin filas', 'Estacionamiento VIP incluido', '20% descuento en tiendas', 'Acceso a recorridos nocturnos'],
                noIncluye: []
            },
            {
                id: 3,
                nombre: 'Pase Familiar Anual',
                precio: 450,
                periodo: '/año',
                popular: false,
                premium: false,
                beneficios: ['Acceso para 2 Adultos + 3 Niños', 'Estacionamiento incluido', 'Meriendas con 15% descuento', 'Talleres de verano para niños', '2 pases de invitado al año'],
                noIncluye: []
            },
            {
                id: 4,
                nombre: 'Socio Benefactor',
                precio: 1000,
                periodo: '/año',
                popular: false,
                premium: true,
                beneficios: ['Todos los beneficios del Pase Familiar', 'Apadrinamiento de un animal', 'Placa con tu nombre en el recinto', 'Tour exclusivo detrás de escena', 'Invitación a galas de conservación'],
                noIncluye: []
            }
        ],
        recintos: [
            {
                id: 1,
                region: 'Región Africana',
                descripcion: 'Siente la inmensidad de la sabana y conoce a los gigantes del continente madre.',
                colorClass: 'africa',
                animales: [
                    { nombre: 'La Sabana Africana', descripcion: 'Un encuentro directo y emocionante con los majestuosos grandes felinos y las manadas más imponentes de toda África.', imagen: 'https://images.unsplash.com/photo-1549480017-d76466a4b7e8?q=80&w=600&auto=format&fit=crop' },
                    { nombre: 'Valle de los Elefantes', descripcion: 'Observa de cerca la inteligencia y la fuerza de estos gigantes apacibles mientras se refrescan en su oasis natural.', imagen: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600&auto=format&fit=crop' },
                    { nombre: 'Mirador de las Jirafas', descripcion: 'Alimenta a las jirafas desde una plataforma elevada y maravíllate con su increíble altura y gracia.', imagen: '../img/jirafas.jpg' }
                ]
            },
            {
                id: 2,
                region: 'Paraíso Tropical',
                descripcion: 'Un estallido de colores, cantos y biodiversidad selvática.',
                colorClass: 'tropico',
                animales: [
                    { nombre: 'Aviario Libre Tropical', descripcion: 'Siente el estallido de colores y plumas volando sobre ti. Escucha sus cantos hermosos en este inmersivo recinto.', imagen: 'https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg?auto=compress&cs=tinysrgb&w=600' },
                    { nombre: 'Isla de los Primates', descripcion: 'Ríete con las acrobacias y el comportamiento social de diversas especies de monos en un entorno libre de jaulas tradicionales.', imagen: '../img/primates.png' }
                ]
            },
            {
                id: 3,
                region: 'Mundo Reptil',
                descripcion: 'Descubre a los habitantes más antiguos y misteriosos de la tierra.',
                colorClass: 'reptil',
                animales: [
                    { nombre: 'Herpetario Climatizado', descripcion: 'Adéntrate en el silencio de las serpientes exóticas, camaleones y cocodrilos prehistóricos en su hábitat perfectamente controlado.', imagen: '../img/serpiente.jpg' },
                    { nombre: 'Santuario de Tortugas', descripcion: 'Conoce a las longevas tortugas gigantes, un testamento viviente de la paciencia y resistencia de la naturaleza.', imagen: '../img/TortugaVerde.jpg' }
                ]
            }
        ],
        landing: {
            heroTitulo: 'Explora la',
            heroTituloSpan: 'Aventura Natural',
            heroSubtitulo: 'Descubre, aprende y enamórate de la inmensa biodiversidad. Cientos de especies y espacios ecológicos te esperan en el corazón natural de la ciudad.',
            heroBtnTexto: 'Adquirir Entradas',
            sobreNosotrosTitulo: 'Nuestra',
            sobreNosotrosTituloSpan: 'Historia',
            sobreNosotrosTituloSufijo: 'y Misión',
            sobreNosotrosP1: 'Ubicado en el corazón de la ciudad, el Zoológico TerraNova es mucho más que un parque recreativo; somos un centro vital para la preservación de la vida silvestre y la educación ambiental en toda la región.',
            sobreNosotrosP2: 'Fundado hace más de cuatro décadas, nuestro principal propósito ha sido crear un puente entre el ser humano y el reino natural. Trabajamos incansablemente junto a biólogos y veterinarios expertos para rehabilitar especies, reproducir aquellas en peligro de extinción y educar a las nuevas generaciones sobre la importancia de proteger nuestro frágil ecosistema.',
            stat1Num: '+500',
            stat1Label: 'Especies Rescatadas',
            stat2Num: '+50',
            stat2Label: 'Hectáreas Verdes',
            stat3Num: '1M',
            stat3Label: 'Visitantes Anuales'
        }
    },

    get(key) {
        const raw = localStorage.getItem(this.KEYS[key]);
        return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(this.defaults[key]));
    },

    set(key, value) {
        localStorage.setItem(this.KEYS[key], JSON.stringify(value));
    },

    reset(key) {
        localStorage.removeItem(this.KEYS[key]);
    }
};
