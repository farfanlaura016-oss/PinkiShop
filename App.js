import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';

const PRODUCTOS_INICIALES = [
  {
    id: 'PROD-001',
    nombre: 'Audífonos Inalámbricos Pink',
    categoria: 'Tecnología',
    marca: 'SonyKawaii',
    precioBase: 120000,
    descripcion: 'Cancelación de ruido activa, almohadillas ultra suaves y batería de 24 horas.',
    icono: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    variantes: [
      { id: 'VAR-01A', etiqueta: 'Rosa Pastel', precioFinal: 120000, stock: 5 },
      { id: 'VAR-01B', etiqueta: 'Blanco Perla', precioFinal: 120000, stock: 3 },
      { id: 'VAR-01C', etiqueta: 'Edición Glitter', precioFinal: 135000, stock: 0 },
    ],
  },
  {
    id: 'PROD-002',
    nombre: 'Smartwatch Rose Gold',
    categoria: 'Tecnología',
    marca: 'PinkTech',
    precioBase: 180000,
    descripcion: 'Monitoreo de salud, notificaciones y correa magnética intercambiable.',
    icono: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
    variantes: [
      { id: 'VAR-02A', etiqueta: 'Correa Silicona (38mm)', precioFinal: 180000, stock: 4 },
      { id: 'VAR-02B', etiqueta: 'Correa Malla Metálica (42mm)', precioFinal: 195000, stock: 2 },
    ],
  },
  {
    id: 'PROD-003',
    nombre: 'Teclado Mecánico Kawaii',
    categoria: 'Tecnología',
    marca: 'PinkTech',
    precioBase: 145000,
    descripcion: 'Teclas redondas estilo retro con iluminación LED suave y conexión Bluetooth.',
    icono: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300',
    variantes: [
      { id: 'VAR-03A', etiqueta: 'Switch Silencioso', precioFinal: 145000, stock: 6 },
    ],
  },
  {
    id: 'PROD-004',
    nombre: 'Hoodie Oversize Cloud',
    categoria: 'Moda',
    marca: 'CoquetteWear',
    precioBase: 95000,
    descripcion: 'Algodón afelpado ultra suave, ajuste cómodo y capucha amplia.',
    icono: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300',
    variantes: [
      { id: 'VAR-04A', etiqueta: 'Talla S - Rosa', precioFinal: 95000, stock: 4 },
      { id: 'VAR-04B', etiqueta: 'Talla M - Rosa', precioFinal: 95000, stock: 5 },
      { id: 'VAR-04C', etiqueta: 'Talla L - Crema', precioFinal: 98000, stock: 0 },
    ],
  },
  {
    id: 'PROD-005',
    nombre: 'Gafas de Sol Coquette',
    categoria: 'Moda',
    marca: 'CoquetteWear',
    precioBase: 60000,
    descripcion: 'Protección UV400 con montura en tonos cálidos y estuche rígido.',
    icono: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300',
    variantes: [
      { id: 'VAR-05A', etiqueta: 'Única - Carey Rosa', precioFinal: 60000, stock: 10 },
    ],
  },
  {
    id: 'PROD-006',
    nombre: 'Bolso Elegante Chic',
    categoria: 'Moda',
    marca: 'GlowStyle',
    precioBase: 85000,
    descripcion: 'Diseño versátil con herrajes dorados y correa ajustable.',
    icono: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300',
    variantes: [
      { id: 'VAR-06A', etiqueta: 'Palo de Rosa', precioFinal: 85000, stock: 4 },
      { id: 'VAR-06B', etiqueta: 'Blanco Marfil', precioFinal: 85000, stock: 3 },
    ],
  },
  {
    id: 'PROD-007',
    nombre: 'Lámpara Atardecer LED',
    categoria: 'Hogar',
    marca: 'SweetHome',
    precioBase: 75000,
    descripcion: 'Proyección de luz cálida giratoria 180° ideal para tu cuarto.',
    icono: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300',
    variantes: [
      { id: 'VAR-07A', etiqueta: 'Luz Sunset Pink', precioFinal: 75000, stock: 6 },
    ],
  },
  {
    id: 'PROD-008',
    nombre: 'Organizador Pastel Desk',
    categoria: 'Hogar',
    marca: 'SweetHome',
    precioBase: 45000,
    descripcion: 'Compartimentos modulares para mantener tu escritorio impecable.',
    icono: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=300',
    variantes: [
      { id: 'VAR-08A', etiqueta: 'Set 4 Piezas', precioFinal: 45000, stock: 12 },
    ],
  },
  {
    id: 'PROD-009',
    nombre: 'Mini Cafetera Estética',
    categoria: 'Hogar',
    marca: 'SweetHome',
    precioBase: 65000,
    descripcion: 'Prensa francesa de vidrio borosilicato y detalles metálicos.',
    icono: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300',
    variantes: [
      { id: 'VAR-09A', etiqueta: '350 ml', precioFinal: 65000, stock: 0 },
    ],
  },
  {
    id: 'PROD-010',
    nombre: 'Mochila Antirrobo Velvet',
    categoria: 'Accesorios',
    marca: 'GlowStyle',
    precioBase: 110000,
    descripcion: 'Cierres ocultos, tela impermeable y bolsillo acolchado para laptop.',
    icono: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300',
    variantes: [
      { id: 'VAR-10A', etiqueta: 'Estándar 15"', precioFinal: 110000, stock: 4 },
    ],
  },
  {
    id: 'PROD-011',
    nombre: 'Botella Térmica Glow',
    categoria: 'Accesorios',
    marca: 'GlowStyle',
    precioBase: 55000,
    descripcion: 'Acero inoxidable doble pared que mantiene bebidas frías 24h.',
    icono: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300',
    variantes: [
      { id: 'VAR-11A', etiqueta: '500 ml Degradado', precioFinal: 55000, stock: 8 },
    ],
  },
  {
    id: 'PROD-012',
    nombre: 'Soporte Laptop Glossy',
    categoria: 'Accesorios',
    marca: 'PinkTech',
    precioBase: 50000,
    descripcion: 'Base ergonómica plegable en aluminio con funda protectora.',
    icono: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300',
    variantes: [
      { id: 'VAR-12A', etiqueta: 'Aluminio Rosa', precioFinal: 50000, stock: 9 },
    ],
  },
];

const DIRECCIONES_INICIALES = [
  {
    id: 'DIR-01',
    alias: 'Casa Principal',
    municipio: 'Mosquera',
    descripcion: 'Barrio El Poblado, Calle 10 # 5-20 Apto 301',
    principal: true,
  },
  {
    id: 'DIR-02',
    alias: 'Sede Estudio',
    municipio: 'Madrid',
    descripcion: 'Carrera 6 # 12-45, cerca al parque principal',
    principal: false,
  },
];

const CONSULTAS_INICIALES = [
  {
    id: 'CONS-01',
    productoId: 'PROD-001',
    pregunta: '¿Estos audífonos traen cable auxiliar por si se acaba la batería?',
    respuesta: '¡Hola! Sí, incluyen cable de audio de 3.5mm y cable de carga USB-C en la caja. (Respuesta simulada)',
    estado: 'Respondida',
    fecha: '20/11/2026',
  },
];

const PEDIDOS_INICIALES = [
  {
    codigo: 'PINK-849201',
    fecha: '22/11/2026, 2:30 p. m.',
    estado: 'Preparando',
    historialEstados: [
      { estado: 'Confirmado', fecha: '22/11/2026, 2:30 p. m.' },
      { estado: 'Preparando', fecha: '22/11/2026, 4:15 p. m.' },
    ],
    items: [
      {
        productoId: 'PROD-005',
        varianteId: 'VAR-05A',
        nombre: 'Gafas de Sol Coquette',
        varianteEtiqueta: 'Única - Carey Rosa',
        precioUnitario: 60000,
        cantidad: 1,
      },
    ],
    subtotal: 60000,
    envio: 6000,
    total: 66000,
    modalidadEnvio: 'Estándar (1 a 2 días)',
    comprador: {
      nombre: 'Cliente Demo',
      telefono: '3001234567',
      municipio: 'Mosquera',
      direccion: 'Barrio El Poblado, Calle 10 # 5-20 Apto 301',
    },
    stockRestituido: false,
  },
];

const TARIFAS_ENVIO = {
  Mosquera: { Estandar: { costo: 6000, plazo: '1 a 2 días' }, Expres: { costo: 10000, plazo: 'Mismo día / 24h' } },
  Funza: { Estandar: { costo: 8000, plazo: '1 a 2 días' }, Expres: { costo: 12000, plazo: '1 a 2 días' } },
  Madrid: { Estandar: { costo: 10000, plazo: '2 a 3 días' }, Expres: { costo: 14000, plazo: '1 a 2 días' } },
};

export default function App() {
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES);
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [comparador, setComparador] = useState([]);
  const [direcciones, setDirecciones] = useState(DIRECCIONES_INICIALES);
  const [historialPedidos, setHistorialPedidos] = useState(PEDIDOS_INICIALES);
  const [consultas, setConsultas] = useState(CONSULTAS_INICIALES);
  const [notificaciones, setNotificaciones] = useState([]);
  const [alertasStock, setAlertasStock] = useState([]);
  const [ticketsSoporte, setTicketsSoporte] = useState([]);

  const [vistaActual, setVistaActual] = useState('catalogo');
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(null);
  const [varianteSeleccionadaId, setVarianteSeleccionadaId] = useState(null);
  const [cantidadDetalle, setCantidadDetalle] = useState(1);

  const [avisoError, setAvisoError] = useState('');
  const [avisoExito, setAvisoExito] = useState('');
  const [alertaPregunta, setAlertaPregunta] = useState('');

  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('Todas');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [ordenPrecio, setOrdenPrecio] = useState(null);

  const [nuevaPregunta, setNuevaPregunta] = useState('');

  const [direccionSeleccionadaId, setDireccionSeleccionadaId] = useState(null);
  const [modalidadEnvio, setModalidadEnvio] = useState(null);
  const [nombreComprador, setNombreComprador] = useState('');
  const [telefonoComprador, setTelefonoComprador] = useState('');

  const [mostrandoFormDir, setMostrandoFormDir] = useState(false);
  const [editandoDirId, setEditandoDirId] = useState(null);
  const [dirAlias, setDirAlias] = useState('');
  const [dirMunicipio, setDirMunicipio] = useState('Mosquera');
  const [dirDescripcion, setDirDescripcion] = useState('');
  const [dirEsPrincipal, setDirEsPrincipal] = useState(false);

  const [ticketPedidoCodigo, setTicketPedidoCodigo] = useState('');
  const [ticketMotivo, setTicketMotivo] = useState('Entrega');
  const [ticketDescripcion, setTicketDescripcion] = useState('');

  const notificarError = (msg) => {
    setAvisoExito('');
    setAvisoError(msg);
  };

  const notificarExito = (msg) => {
    setAvisoError('');
    setAvisoExito(msg);
  };

  const cambiarVista = (nuevaVista) => {
    setAvisoError('');
    setAvisoExito('');
    setAlertaPregunta('');
    setMostrandoFormDir(false);
    setVistaActual(nuevaVista);
  };

  const calcularStockTotal = (prod) => prod.variantes.reduce((acc, v) => acc + Math.max(0, v.stock), 0);

  const generarNotificacion = (tipo, mensaje, eventoClave) => {
    setNotificaciones((prev) => {
      if (prev.some((n) => n.eventoClave === eventoClave)) return prev;
      return [
        {
          id: `${eventoClave}-${Date.now()}`,
          eventoClave,
          tipo,
          mensaje,
          fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          leida: false,
        },
        ...prev,
      ];
    });
  };

  const categorias = ['Todas', 'Tecnología', 'Moda', 'Hogar', 'Accesorios'];
  const marcas = ['Todas', 'SonyKawaii', 'PinkTech', 'CoquetteWear', 'GlowStyle', 'SweetHome'];

  const validarRangoPrecio = () => {
    const min = precioMin.trim() === '' ? null : Number(precioMin);
    const max = precioMax.trim() === '' ? null : Number(precioMax);
    if (min !== null && max !== null && !Number.isNaN(min) && !Number.isNaN(max) && min > max) {
      notificarError('El precio mínimo no puede ser mayor que el precio máximo. No se aplicó el rango inválido.');
      return false;
    }
    setAvisoError('');
    return true;
  };

  const restablecerFiltros = () => {
    setBusqueda('');
    setCategoriaSeleccionada('Todas');
    setMarcaSeleccionada('Todas');
    setPrecioMin('');
    setPrecioMax('');
    setSoloDisponibles(false);
    setOrdenPrecio(null);
    notificarExito('Filtros restablecidos al estado inicial.');
  };

  const minNum = precioMin.trim() === '' ? null : Number(precioMin);
  const maxNum = precioMax.trim() === '' ? null : Number(precioMax);
  const rangoPrecioValido = !(minNum !== null && maxNum !== null && !Number.isNaN(minNum) && !Number.isNaN(maxNum) && minNum > maxNum);

  const productosFiltrados = productos
    .filter((item) => {
      const stockTotal = calcularStockTotal(item);
      const coincideNombre = item.nombre.toLowerCase().includes(busqueda.trim().toLowerCase());
      const coincideCat = categoriaSeleccionada === 'Todas' || item.categoria === categoriaSeleccionada;
      const coincideMarca = marcaSeleccionada === 'Todas' || item.marca === marcaSeleccionada;
      const coincideDisp = !soloDisponibles || stockTotal > 0;
      const coincideMin = !rangoPrecioValido || minNum === null || Number.isNaN(minNum) || item.precioBase >= minNum;
      const coincideMax = !rangoPrecioValido || maxNum === null || Number.isNaN(maxNum) || item.precioBase <= maxNum;

      return coincideNombre && coincideCat && coincideMarca && coincideDisp && coincideMin && coincideMax;
    })
    .sort((a, b) => {
      if (ordenPrecio === 'asc') return a.precioBase - b.precioBase;
      if (ordenPrecio === 'desc') return b.precioBase - a.precioBase;
      return 0;
    });

  const toggleFavorito = (id) => {
    setFavoritos((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const toggleComparador = (id) => {
    if (comparador.includes(id)) {
      setComparador(comparador.filter((c) => c !== id));
      notificarExito('Producto retirado del comparador.');
    } else {
      if (comparador.length >= 3) {
        notificarError('Límite alcanzado: solo puedes comparar hasta 3 productos a la vez.');
        return;
      }
      setComparador([...comparador, id]);
      notificarExito('Producto añadido al comparador.');
    }
  };

  const abrirDetalle = (prod) => {
    setProductoSeleccionadoId(prod.id);
    setVarianteSeleccionadaId(null);
    setCantidadDetalle(1);
    setAvisoError('');
    setAvisoExito('');
    setAlertaPregunta('');
    setNuevaPregunta('');
    setVistaActual('detalle');
  };

  const agregarAlCarrito = (producto, variante, cantidadSolicitada = 1) => {
    if (!variante) {
      notificarError('Por favor elige una opción (variante) antes de agregar este producto al carrito.');
      return;
    }
    if (variante.stock <= 0) {
      notificarError('Esta variante no tiene unidades disponibles y no puede comprarse.');
      return;
    }
    if (cantidadSolicitada > variante.stock) {
      notificarError(`Stock insuficiente: el máximo permitido para ${variante.etiqueta} es ${variante.stock} unidades.`);
      return;
    }

    const index = carrito.findIndex((i) => i.varianteId === variante.id);
    if (index >= 0) {
      const nuevaCantidad = carrito[index].cantidad + cantidadSolicitada;
      if (nuevaCantidad > variante.stock) {
        notificarError(`Stock insuficiente: ya tienes ${carrito[index].cantidad} en el carrito. Máximo permitido: ${variante.stock}.`);
        return;
      }
      const nuevo = [...carrito];
      nuevo[index].cantidad = nuevaCantidad;
      setCarrito(nuevo);
    } else {
      setCarrito([
        ...carrito,
        {
          productoId: producto.id,
          varianteId: variante.id,
          nombre: producto.nombre,
          varianteEtiqueta: variante.etiqueta,
          precioUnitario: variante.precioFinal,
          icono: producto.icono,
          cantidad: cantidadSolicitada,
        },
      ]);
    }
    setCantidadDetalle(1);
    notificarExito(`Agregado al carrito: ${producto.nombre} (${variante.etiqueta}) x${cantidadSolicitada}.`);
  };

  const cambiarCantidadCarrito = (varianteId, delta) => {
    const index = carrito.findIndex((i) => i.varianteId === varianteId);
    if (index < 0) return;

    const item = carrito[index];
    const prod = productos.find((p) => p.id === item.productoId);
    const varObj = prod?.variantes.find((v) => v.id === varianteId);
    const nuevaCant = item.cantidad + delta;

    if (nuevaCant <= 0) {
      setCarrito(carrito.filter((i) => i.varianteId !== varianteId));
      notificarExito('Producto eliminado del carrito.');
      return;
    }
    if (varObj && nuevaCant > varObj.stock) {
      notificarError(`Stock insuficiente: el máximo disponible para ${item.varianteEtiqueta} es ${varObj.stock} unidades.`);
      return;
    }
    const nuevo = [...carrito];
    nuevo[index].cantidad = nuevaCant;
    setCarrito(nuevo);
    setAvisoError('');
  };

  const eliminarItemCarrito = (varianteId) => {
    setCarrito(carrito.filter((i) => i.varianteId !== varianteId));
    notificarExito('Ítem eliminado del carrito.');
  };

  const toggleAlertaReposicion = (varianteId) => {
    if (alertasStock.includes(varianteId)) {
      setAlertasStock((prev) => prev.filter((a) => a !== varianteId));
      notificarExito('Suscripción cancelada. Al reponer inventario no se creará aviso de reposición.');
    } else {
      setAlertasStock((prev) => (prev.includes(varianteId) ? prev : [...prev, varianteId]));
      notificarExito('Suscripción activa: te avisaremos dentro de la app al simular reposición.');
    }
  };

  const simularReposicion = (prodId, varianteId) => {
    const teniaSuscripcionActiva = alertasStock.includes(varianteId);
    let nombreProd = '';
    let nombreVar = '';

    setProductos((prev) =>
      prev.map((p) => {
        if (p.id !== prodId) return p;
        nombreProd = p.nombre;
        return {
          ...p,
          variantes: p.variantes.map((v) => {
            if (v.id !== varianteId) return v;
            nombreVar = v.etiqueta;
            return { ...v, stock: v.stock + 5 };
          }),
        };
      })
    );

    if (teniaSuscripcionActiva) {
      generarNotificacion(
        'Reposición',
        `¡Ya hay stock disponible de ${nombreProd || 'producto'} (${nombreVar || 'variante'})!`,
        `reposicion-${varianteId}-${Date.now()}`
      );
      setAlertasStock((prev) => prev.filter((a) => a !== varianteId));
      notificarExito('Reposición simulada (+5 uds) y aviso creado en Notificaciones.');
    } else {
      notificarExito('Reposición simulada (+5 uds). No se creó aviso de reposición porque la suscripción fue cancelada.');
    }
  };

  const enviarPregunta = (prodId) => {
    const texto = nuevaPregunta.trim();
    if (texto.length < 10) {
      setAlertaPregunta(`Alerta: mínimo son 10 caracteres (tienes ${texto.length}). No se envió la pregunta.`);
      notificarError(`Alerta en Preguntas frecuentes: mínimo son 10 caracteres (llevas ${texto.length}).`);
      return;
    }
    setAlertaPregunta('');
    const nueva = {
      id: 'CONS-' + Date.now(),
      productoId: prodId,
      pregunta: texto,
      respuesta: '',
      estado: 'Pendiente',
      fecha: new Date().toLocaleDateString(),
    };
    setConsultas([nueva, ...consultas]);
    setNuevaPregunta('');
    notificarExito('Pregunta registrada con fecha y estado Pendiente.');
  };

  const simularRespuestaPregunta = (consultaId) => {
    setConsultas((prev) =>
      prev.map((c) =>
        c.id === consultaId
          ? {
              ...c,
              estado: 'Respondida',
              respuesta: 'Respuesta simulada de demostración: el producto está sujeto a disponibilidad al momento de la compra.',
            }
          : c
      )
    );
    notificarExito('Pregunta marcada como Respondida con texto simulado.');
  };

  const abrirFormularioNuevaDireccion = () => {
    setEditandoDirId(null);
    setDirAlias('');
    setDirMunicipio('Mosquera');
    setDirDescripcion('');
    setDirEsPrincipal(false);
    setMostrandoFormDir(true);
    setAvisoError('');
    setAvisoExito('');
  };

  const abrirFormularioEditarDireccion = (dir) => {
    setEditandoDirId(dir.id);
    setDirAlias(dir.alias);
    setDirMunicipio(dir.municipio);
    setDirDescripcion(dir.descripcion);
    setDirEsPrincipal(Boolean(dir.principal));
    setMostrandoFormDir(true);
    setAvisoError('');
    setAvisoExito('');
  };

  const marcarPrincipal = (id) => {
    setDirecciones(direcciones.map((d) => ({ ...d, principal: d.id === id })));
    setDireccionSeleccionadaId(id);
  };

  const guardarDireccion = () => {
    if (!dirAlias.trim() || !dirDescripcion.trim()) {
      notificarError('Completa el alias y la referencia de entrega.');
      return;
    }

    if (editandoDirId) {
      const actualizadas = direcciones.map((d) => {
        if (d.id === editandoDirId) {
          return {
            ...d,
            alias: dirAlias.trim(),
            municipio: dirMunicipio,
            descripcion: dirDescripcion.trim(),
            principal: dirEsPrincipal,
          };
        }
        return dirEsPrincipal ? { ...d, principal: false } : d;
      });
      if (!actualizadas.some((d) => d.principal) && actualizadas.length > 0) {
        actualizadas[0] = { ...actualizadas[0], principal: true };
      }
      setDirecciones(actualizadas);
      if (dirEsPrincipal) {
        setDireccionSeleccionadaId(editandoDirId);
      }
    } else {
      const nuevoId = 'DIR-' + Date.now();
      const debeSerPrincipal = dirEsPrincipal || direcciones.length === 0;
      const nuevaDir = {
        id: nuevoId,
        alias: dirAlias.trim(),
        municipio: dirMunicipio,
        descripcion: dirDescripcion.trim(),
        principal: debeSerPrincipal,
      };
      const base = debeSerPrincipal
        ? direcciones.map((d) => ({ ...d, principal: false }))
        : [...direcciones];
      setDirecciones([...base, nuevaDir]);
      setDireccionSeleccionadaId(nuevoId);
    }

    setMostrandoFormDir(false);
    setEditandoDirId(null);
    setDirAlias('');
    setDirDescripcion('');
    setDirEsPrincipal(false);
  };

  const direccionActiva = direcciones.find((d) => d.id === direccionSeleccionadaId) || null;
  const tarifaObj =
    direccionActiva && modalidadEnvio && TARIFAS_ENVIO[direccionActiva.municipio]
      ? TARIFAS_ENVIO[direccionActiva.municipio][modalidadEnvio] || null
      : null;

  const subtotal = carrito.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0);
  const costoEnvio = carrito.length === 0 || !tarifaObj ? 0 : tarifaObj.costo;
  const totalCompra = subtotal + costoEnvio;

  const confirmarCompra = () => {
    if (carrito.length === 0) {
      notificarError('Tu carrito está vacío.');
      return;
    }

    const faltantes = [];
    if (!direccionActiva) faltantes.push('dirección de entrega');
    if (!modalidadEnvio) faltantes.push('modalidad de envío');

    if (faltantes.length > 0) {
      notificarError(`Completa los datos faltantes antes de finalizar la compra: ${faltantes.join(' y ')}.`);
      return;
    }

    if (!tarifaObj) {
      notificarError('Elige una dirección en Mosquera, Funza o Madrid y una modalidad de envío válida.');
      return;
    }

    if (!nombreComprador.trim() || !telefonoComprador.trim()) {
      notificarError('Completa los datos faltantes: nombre y teléfono ficticios del comprador.');
      return;
    }

    for (const item of carrito) {
      const prod = productos.find((p) => p.id === item.productoId);
      const varObj = prod?.variantes.find((v) => v.id === item.varianteId);
      if (!varObj || item.cantidad > varObj.stock) {
        notificarError(`Stock insuficiente para ${item.nombre} (${item.varianteEtiqueta}). Máximo: ${varObj ? varObj.stock : 0}.`);
        return;
      }
    }

    setProductos((prev) =>
      prev.map((prod) => ({
        ...prod,
        variantes: prod.variantes.map((v) => {
          const enCarrito = carrito.find((c) => c.varianteId === v.id);
          return enCarrito ? { ...v, stock: Math.max(0, v.stock - enCarrito.cantidad) } : v;
        }),
      }))
    );

    const codigo = 'PINK-' + Math.floor(100000 + Math.random() * 900000);
    const ahora = new Date().toLocaleString();
    const nuevoPedido = {
      codigo,
      fecha: ahora,
      estado: 'Confirmado',
      historialEstados: [{ estado: 'Confirmado', fecha: ahora }],
      items: carrito.map((c) => ({ ...c })),
      subtotal,
      envio: costoEnvio,
      total: totalCompra,
      modalidadEnvio: `${modalidadEnvio} (${tarifaObj.plazo})`,
      comprador: {
        nombre: nombreComprador.trim(),
        telefono: telefonoComprador.trim(),
        municipio: direccionActiva.municipio,
        direccion: direccionActiva.descripcion,
      },
      stockRestituido: false,
    };

    setHistorialPedidos((prev) => [nuevoPedido, ...prev]);
    generarNotificacion('Pedido', `Pedido ${codigo} en estado Confirmado.`, `pedido-${codigo}-Confirmado`);
    setCarrito([]);
    setNombreComprador('');
    setTelefonoComprador('');
    setMostrandoFormDir(false);
    setVistaActual('historial');
    notificarExito(`Compra simulada confirmada. Código de pedido: ${codigo}.`);
  };

  const avanzarEstadoPedido = (codigo) => {
    const flujo = ['Confirmado', 'Preparando', 'En camino', 'Entregado'];
    const pedActual = historialPedidos.find((p) => p.codigo === codigo);
    if (!pedActual) return;

    if (pedActual.estado === 'Entregado' || pedActual.estado === 'Cancelado') {
      notificarError(`El pedido ${codigo} está ${pedActual.estado} y no permite más transiciones.`);
      return;
    }

    const idxActual = flujo.indexOf(pedActual.estado);
    if (idxActual < 0 || idxActual >= flujo.length - 1) return;

    const siguienteEstado = flujo[idxActual + 1];

    setHistorialPedidos((prev) =>
      prev.map((ped) => {
        if (ped.codigo !== codigo) return ped;
        return {
          ...ped,
          estado: siguienteEstado,
          historialEstados: [
            ...ped.historialEstados,
            { estado: siguienteEstado, fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
          ],
        };
      })
    );
    generarNotificacion('Seguimiento', `Pedido ${codigo} cambió a ${siguienteEstado}.`, `pedido-${codigo}-${siguienteEstado}`);
    notificarExito(`Pedido ${codigo} avanzó a ${siguienteEstado}.`);
  };

  const ejecutarCancelacion = (pedido) => {
    if (pedido.estado === 'Cancelado') {
      notificarError(`El pedido ${pedido.codigo} ya está Cancelado. No se duplican unidades.`);
      return;
    }
    if (pedido.estado !== 'Confirmado' && pedido.estado !== 'Preparando') {
      notificarError(`No se puede cancelar el pedido ${pedido.codigo} porque está en estado ${pedido.estado}.`);
      return;
    }

    setProductos((prev) =>
      prev.map((prod) => ({
        ...prod,
        variantes: prod.variantes.map((v) => {
          const itemDevuelto = pedido.items.find((it) => it.varianteId === v.id);
          if (!itemDevuelto || pedido.stockRestituido) return v;
          return { ...v, stock: v.stock + itemDevuelto.cantidad };
        }),
      }))
    );

    setHistorialPedidos((prev) =>
      prev.map((p) =>
        p.codigo === pedido.codigo
          ? {
              ...p,
              estado: 'Cancelado',
              stockRestituido: true,
              historialEstados: [
                ...p.historialEstados,
                { estado: 'Cancelado', fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
              ],
            }
          : p
      )
    );
    generarNotificacion('Cancelación', `Pedido ${pedido.codigo} pasó a Cancelado.`, `pedido-${pedido.codigo}-Cancelado`);
    notificarExito(`Pedido ${pedido.codigo} cancelado y stock restituido.`);
  };

  const cancelarPedido = (pedido) => {
    if (pedido.estado === 'Cancelado') {
      notificarError(`El pedido ${pedido.codigo} ya está Cancelado.`);
      return;
    }
    if (pedido.estado !== 'Confirmado' && pedido.estado !== 'Preparando') {
      notificarError(`No se puede cancelar el pedido ${pedido.codigo} porque está ${pedido.estado}.`);
      return;
    }

    if (Platform.OS === 'web') {
      ejecutarCancelacion(pedido);
      return;
    }

    Alert.alert('Confirmar cancelación', `¿Deseas cancelar el pedido ${pedido.codigo}?`, [
      { text: 'No', style: 'cancel' },
      {
        text: 'Sí, cancelar',
        style: 'destructive',
        onPress: () => ejecutarCancelacion(pedido),
      },
    ]);
  };

  const crearTicketSoporte = () => {
    if (!ticketPedidoCodigo) {
      notificarError('Selecciona un pedido del historial antes de enviar la solicitud.');
      return;
    }
    if (ticketDescripcion.trim().length < 15) {
      notificarError('La descripción debe tener al menos 15 caracteres.');
      return;
    }
    const nuevoTicket = {
      id: 'TKT-' + Math.floor(1000 + Math.random() * 9000),
      pedidoCodigo: ticketPedidoCodigo,
      motivo: ticketMotivo,
      descripcion: ticketDescripcion.trim(),
      estado: 'Abierto',
      respuesta: '',
    };
    setTicketsSoporte((prev) => [nuevoTicket, ...prev]);
    setTicketDescripcion('');
    notificarExito(`Caso ${nuevoTicket.id} creado en estado Abierto.`);
  };

  const simularRespuestaTicket = (ticketId) => {
    setTicketsSoporte((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              estado: 'Respondido',
              respuesta: 'Respuesta simulada de prueba: tu solicitud fue atendida y el registro se conserva.',
            }
          : t
      )
    );
    notificarExito(`Caso ${ticketId} actualizado a Respondido.`);
  };

  const noLeidasCount = notificaciones.filter((n) => !n.leida).length;

  const renderAvisos = () => (
    <View>
      {avisoError ? (
        <View style={styles.alertErrorBox}>
          <Text style={styles.alertErrorText}>⚠️ {avisoError}</Text>
        </View>
      ) : null}
      {avisoExito ? (
        <View style={styles.alertSuccessBox}>
          <Text style={styles.alertSuccessText}>✅ {avisoExito}</Text>
        </View>
      ) : null}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTopRow}>
        <View>
          <Text style={styles.headerTitle}>PinkiShop 2.0 🌸✨</Text>
          <Text style={styles.headerSubtitle}>Marketplace 2.0 • HU21 a HU32</Text>
        </View>
        <View style={styles.navIconsRow}>
          <Pressable onPress={() => cambiarVista('catalogo')} style={[styles.navBtn, vistaActual === 'catalogo' && styles.navBtnActive]}>
            <Text style={styles.navBtnText}>🏠</Text>
          </Pressable>
          <Pressable onPress={() => cambiarVista('comparador')} style={[styles.navBtn, vistaActual === 'comparador' && styles.navBtnActive]}>
            <Text style={styles.navBtnText}>⚖️{comparador.length > 0 ? comparador.length : ''}</Text>
          </Pressable>
          <Pressable onPress={() => cambiarVista('favoritos')} style={[styles.navBtn, vistaActual === 'favoritos' && styles.navBtnActive]}>
            <Text style={styles.navBtnText}>💖</Text>
          </Pressable>
          <Pressable onPress={() => cambiarVista('carrito')} style={[styles.navBtn, vistaActual === 'carrito' && styles.navBtnActive]}>
            <Text style={styles.navBtnText}>🛍️{carrito.length > 0 ? carrito.length : ''}</Text>
          </Pressable>
          <Pressable onPress={() => cambiarVista('historial')} style={[styles.navBtn, vistaActual === 'historial' && styles.navBtnActive]}>
            <Text style={styles.navBtnText}>📦</Text>
          </Pressable>
          <Pressable onPress={() => cambiarVista('notificaciones')} style={[styles.navBtn, vistaActual === 'notificaciones' && styles.navBtnActive]}>
            <Text style={styles.navBtnText}>🔔{noLeidasCount > 0 ? noLeidasCount : ''}</Text>
          </Pressable>
          <Pressable onPress={() => cambiarVista('ayuda')} style={[styles.navBtn, vistaActual === 'ayuda' && styles.navBtnActive]}>
            <Text style={styles.navBtnText}>🆘</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  const renderCatalogo = () => (
    <View style={styles.container}>
      {renderAvisos()}

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar producto por nombre..."
        placeholderTextColor="#aaa"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <View style={styles.chipsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
          {categorias.map((cat) => (
            <Pressable
              key={cat}
              style={[styles.catChip, categoriaSeleccionada === cat && styles.catChipActive]}
              onPress={() => setCategoriaSeleccionada(cat)}
            >
              <Text style={[styles.catChipText, categoriaSeleccionada === cat && styles.catChipTextActive]}>{cat}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.chipsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
          {marcas.map((m) => (
            <Pressable
              key={m}
              style={[styles.brandChip, marcaSeleccionada === m && styles.brandChipActive]}
              onPress={() => setMarcaSeleccionada(m)}
            >
              <Text style={[styles.brandChipText, marcaSeleccionada === m && { color: '#fff' }]}>{m === 'Todas' ? 'Marca: Todas' : m}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.filterBox}>
        <TextInput
          style={styles.priceInput}
          placeholder="Min $"
          keyboardType="numeric"
          value={precioMin}
          onChangeText={setPrecioMin}
          onBlur={validarRangoPrecio}
        />
        <TextInput
          style={styles.priceInput}
          placeholder="Max $"
          keyboardType="numeric"
          value={precioMax}
          onChangeText={setPrecioMax}
          onBlur={validarRangoPrecio}
        />
        <Pressable
          onPress={() => setSoloDisponibles(!soloDisponibles)}
          style={[styles.filterToggleBtn, soloDisponibles && styles.filterToggleActive]}
        >
          <Text style={[styles.filterToggleText, soloDisponibles && { color: '#fff' }]}>Disponibles</Text>
        </Pressable>
        <Pressable onPress={() => setOrdenPrecio(ordenPrecio === 'asc' ? 'desc' : 'asc')} style={styles.filterToggleBtn}>
          <Text style={styles.filterToggleText}>{ordenPrecio === 'asc' ? 'Precio ↑' : 'Precio ↓'}</Text>
        </Pressable>
        <Pressable onPress={restablecerFiltros} style={styles.resetBtn}>
          <Text style={styles.resetBtnText}>Restablecer</Text>
        </Pressable>
      </View>

      {productosFiltrados.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay productos que cumplan con los filtros o búsqueda seleccionados.</Text>
          <Pressable style={styles.primaryBtn} onPress={restablecerFiltros}>
            <Text style={styles.primaryBtnText}>Restablecer</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 25 }}
          renderItem={({ item }) => {
            const stockTotal = calcularStockTotal(item);
            const esFav = favoritos.includes(item.id);
            const enComp = comparador.includes(item.id);

            return (
              <View style={styles.productCard}>
                <Pressable onPress={() => abrirDetalle(item)}>
                  <View style={styles.productIconBox}>
                    <Image source={{ uri: item.icono }} style={styles.productImage} />
                    <View style={styles.brandBadge}>
                      <Text style={styles.brandBadgeText}>{item.marca}</Text>
                    </View>
                  </View>
                  <Text style={styles.productName} numberOfLines={1}>{item.nombre}</Text>
                  <Text style={styles.productCat}>{item.categoria} • {item.variantes.length} opc.</Text>
                  <Text style={styles.productPrice}>Desde $ {item.precioBase.toLocaleString()}</Text>
                  <Text style={[styles.productStock, stockTotal === 0 && { color: '#ff4d6d' }]}>
                    {stockTotal > 0 ? `Stock total: ${stockTotal}` : 'Agotado 🚫'}
                  </Text>
                </Pressable>

                <View style={styles.cardActions}>
                  <Pressable onPress={() => toggleFavorito(item.id)}>
                    <Text>{esFav ? '💖' : '🤍'}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => toggleComparador(item.id)}
                    style={[styles.compBtn, enComp && styles.compBtnActive]}
                  >
                    <Text style={[styles.compBtnText, enComp && { color: '#fff' }]}>{enComp ? '✓ Comp' : '+ Comp'}</Text>
                  </Pressable>
                  <Pressable style={styles.addSmallBtn} onPress={() => abrirDetalle(item)}>
                    <Text style={styles.addSmallBtnText}>Ver</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );

  const renderDetalle = () => {
    const prod = productos.find((p) => p.id === productoSeleccionadoId);
    if (!prod) return null;

    const varianteActual = prod.variantes.find((v) => v.id === varianteSeleccionadaId) || null;
    const precioMostrado = varianteActual ? varianteActual.precioFinal : prod.precioBase;
    const stockMostrado = varianteActual ? varianteActual.stock : calcularStockTotal(prod);
    const preguntasProd = consultas.filter((c) => c.productoId === prod.id);
    const relacionados = productos
      .filter((p) => p.categoria === prod.categoria && p.id !== prod.id && calcularStockTotal(p) > 0)
      .slice(0, 4);

    return (
      <ScrollView style={styles.container}>
        <Pressable style={styles.backBtn} onPress={() => cambiarVista('catalogo')}>
          <Text style={styles.backBtnText}>← Volver al catálogo</Text>
        </Pressable>

        {renderAvisos()}

        <View style={styles.detailCard}>
          <Image source={{ uri: prod.icono }} style={styles.detailImageLarge} />
          <Text style={styles.detailBrand}>{prod.marca} • {prod.categoria}</Text>
          <Text style={styles.detailTitle}>{prod.nombre}</Text>
          <Text style={styles.detailPrice}>$ {precioMostrado.toLocaleString()} COP</Text>
          <Text style={[styles.detailStock, stockMostrado === 0 && { color: '#ff4d6d' }]}>
            {varianteActual
              ? stockMostrado > 0
                ? `Disponibilidad de variante: ${stockMostrado} uds`
                : 'Variante agotada (0 uds) 🚫'
              : `Stock total del producto: ${stockMostrado} uds`}
          </Text>

          <Text style={styles.subLabel}>
            Elige una opción {varianteActual ? `(${varianteActual.etiqueta})` : '(sin seleccionar)'}:
          </Text>
          <View style={styles.variantsRow}>
            {prod.variantes.map((v) => {
              const sel = v.id === varianteSeleccionadaId;
              return (
                <Pressable
                  key={v.id}
                  onPress={() => {
                    setVarianteSeleccionadaId(v.id);
                    setCantidadDetalle(1);
                    setAvisoError('');
                    setAvisoExito('');
                  }}
                  style={[styles.variantChip, sel && styles.variantChipActive, v.stock === 0 && styles.variantOut]}
                >
                  <Text style={[styles.variantText, sel && { color: '#fff' }]}>
                    {v.etiqueta} ({v.stock})
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {varianteActual && varianteActual.stock > 0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, marginBottom: 10 }}>
              <Text style={[styles.subLabel, { marginRight: 10, marginBottom: 0 }]}>Cantidad:</Text>
              <View style={styles.qtyControl}>
                <Pressable onPress={() => setCantidadDetalle((c) => Math.max(1, c - 1))} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </Pressable>
                <Text style={styles.qtyText}>{cantidadDetalle}</Text>
                <Pressable
                  onPress={() => {
                    if (cantidadDetalle + 1 > varianteActual.stock) {
                      notificarError(`Stock insuficiente: el máximo permitido para esta variante es ${varianteActual.stock}.`);
                      return;
                    }
                    setCantidadDetalle((c) => c + 1);
                  }}
                  style={styles.qtyBtn}
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </Pressable>
              </View>
            </View>
          )}

          {varianteActual && varianteActual.stock === 0 && (
            <View style={styles.outStockBox}>
              <Pressable style={styles.alertStockBtn} onPress={() => toggleAlertaReposicion(varianteActual.id)}>
                <Text style={styles.alertStockText}>
                  {alertasStock.includes(varianteActual.id)
                    ? '🔔 Suscrito (Toca para cancelar suscripción)'
                    : '🔔 Avisarme cuando haya stock'}
                </Text>
              </Pressable>
              <Pressable style={[styles.simBtn, { marginTop: 6 }]} onPress={() => simularReposicion(prod.id, varianteActual.id)}>
                <Text style={styles.simBtnText}>⚙️ Simular reposición (+5 uds)</Text>
              </Pressable>
            </View>
          )}

          <Text style={styles.detailDescText}>{prod.descripcion}</Text>

          {avisoError ? (
            <View style={[styles.alertErrorBox, { marginBottom: 6 }]}>
              <Text style={styles.alertErrorText}>⚠️ {avisoError}</Text>
            </View>
          ) : null}

          <Pressable
            style={[styles.checkoutBtn, { width: '100%' }, varianteActual && varianteActual.stock === 0 && styles.btnDisabled]}
            onPress={() => agregarAlCarrito(prod, varianteActual, cantidadDetalle)}
          >
            <Text style={styles.checkoutBtnText}>Agregar al carrito 🛍️</Text>
          </Pressable>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Preguntas frecuentes 💬</Text>
          <Text style={styles.productCat}>
            Alerta de longitud: mínimo son 10 caracteres ({nuevaPregunta.trim().length}/10).
          </Text>

          {alertaPregunta ? (
            <View style={styles.alertErrorBox}>
              <Text style={styles.alertErrorText}>⚠️ {alertaPregunta}</Text>
            </View>
          ) : null}

          <View style={styles.askRow}>
            <TextInput
              style={[styles.searchInput, { flex: 1, marginBottom: 0, marginRight: 6 }]}
              placeholder="Escribe tu pregunta (mín. 10 caracteres)..."
              value={nuevaPregunta}
              onChangeText={(txt) => {
                setNuevaPregunta(txt);
                if (txt.trim().length >= 10) setAlertaPregunta('');
              }}
            />
            <Pressable style={styles.sendSmallBtn} onPress={() => enviarPregunta(prod.id)}>
              <Text style={styles.addSmallBtnText}>Enviar pregunta</Text>
            </Pressable>
          </View>

          {preguntasProd.length === 0 ? (
            <Text style={styles.mutedText}>Aún no hay preguntas registradas para este producto.</Text>
          ) : (
            preguntasProd.map((q) => (
              <View key={q.id} style={styles.qaCard}>
                <Text style={styles.qaQuestion}>❓ {q.pregunta}</Text>
                <Text style={styles.qaMeta}>{q.fecha} • Estado: {q.estado}</Text>
                {q.estado === 'Respondida' ? (
                  <Text style={styles.qaAnswer}>💬 {q.respuesta}</Text>
                ) : (
                  <Pressable style={styles.simSmallBtn} onPress={() => simularRespuestaPregunta(q.id)}>
                    <Text style={styles.simBtnText}>⚙️ Simular respuesta</Text>
                  </Pressable>
                )}
              </View>
            ))
          )}
        </View>

        <View style={[styles.sectionBox, { marginBottom: 30 }]}>
          <Text style={styles.sectionTitle}>Productos relacionados ✨</Text>
          {relacionados.length === 0 ? (
            <Text style={styles.mutedText}>No hay otros productos disponibles en esta categoría.</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {relacionados.map((rel) => (
                <Pressable key={rel.id} style={styles.relCard} onPress={() => abrirDetalle(rel)}>
                  <Image source={{ uri: rel.icono }} style={styles.relImg} />
                  <Text style={styles.productName} numberOfLines={1}>{rel.nombre}</Text>
                  <Text style={styles.productPrice}>$ {rel.precioBase.toLocaleString()}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    );
  };

  const renderComparador = () => {
    const listaComp = productos.filter((p) => comparador.includes(p.id));
    return (
      <ScrollView style={styles.container}>
        {renderAvisos()}
        <Text style={styles.sectionTitle}>Comparador de Productos ⚖️ ({listaComp.length}/3)</Text>
        {listaComp.length < 2 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Selecciona entre 2 y 3 productos en el catálogo para ver su comparación.</Text>
            <Pressable style={styles.primaryBtn} onPress={() => cambiarVista('catalogo')}>
              <Text style={styles.primaryBtnText}>Ir al catálogo</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.compRow}>
            {listaComp.map((p) => {
              const stock = calcularStockTotal(p);
              return (
                <View key={p.id} style={styles.compCol}>
                  <Image source={{ uri: p.icono }} style={styles.compImg} />
                  <Text style={styles.compTitle}>{p.nombre}</Text>
                  <Text style={styles.compSpec}>Marca: {p.marca}</Text>
                  <Text style={styles.productPrice}>$ {p.precioBase.toLocaleString()}</Text>
                  <Text style={styles.compSpec}>
                    Disp.: {stock > 0 ? `${stock} uds` : 'Agotado'}
                  </Text>
                  <Pressable style={styles.removeCompBtn} onPress={() => toggleComparador(p.id)}>
                    <Text style={{ color: '#ff4d6d', fontSize: 11, fontWeight: 'bold' }}>Quitar</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    );
  };

  const renderFavoritos = () => {
    const favs = productos.filter((p) => favoritos.includes(p.id));
    return (
      <View style={styles.container}>
        {renderAvisos()}
        <Text style={styles.sectionTitle}>Tus Favoritos 💖 ({favs.length})</Text>
        {favs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes productos guardados en favoritos.</Text>
          </View>
        ) : (
          <FlatList
            data={favs}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={styles.rowCard}>
                <Image source={{ uri: item.icono }} style={styles.miniImg} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.productName}>{item.nombre}</Text>
                  <Text style={styles.productPrice}>$ {item.precioBase.toLocaleString()} COP</Text>
                </View>
                <Pressable onPress={() => abrirDetalle(item)} style={styles.addSmallBtn}>
                  <Text style={styles.addSmallBtnText}>Ver</Text>
                </Pressable>
                <Pressable onPress={() => toggleFavorito(item.id)} style={{ marginLeft: 8 }}>
                  <Text>❌</Text>
                </Pressable>
              </View>
            )}
          />
        )}
      </View>
    );
  };

  const renderCarrito = () => (
    <ScrollView style={styles.container}>
      {renderAvisos()}
      <Text style={styles.sectionTitle}>Tu Carrito 🛍️</Text>
      {carrito.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
          <Pressable style={styles.primaryBtn} onPress={() => cambiarVista('catalogo')}>
            <Text style={styles.primaryBtnText}>Ir al catálogo</Text>
          </Pressable>
        </View>
      ) : (
        <View style={{ paddingBottom: 30 }}>
          {carrito.map((item) => (
            <View key={item.varianteId} style={styles.rowCard}>
              <Image source={{ uri: item.icono }} style={styles.miniImg} />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.productName} numberOfLines={1}>{item.nombre}</Text>
                <Text style={styles.productCat}>Variante: {item.varianteEtiqueta}</Text>
                <Text style={styles.productPrice}>$ {item.precioUnitario.toLocaleString()} c/u</Text>
              </View>
              <View style={styles.qtyControl}>
                <Pressable onPress={() => cambiarCantidadCarrito(item.varianteId, -1)} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </Pressable>
                <Text style={styles.qtyText}>{item.cantidad}</Text>
                <Pressable onPress={() => cambiarCantidadCarrito(item.varianteId, 1)} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </Pressable>
              </View>
              <Pressable onPress={() => eliminarItemCarrito(item.varianteId)} style={{ marginLeft: 8 }}>
                <Text>🗑️</Text>
              </Pressable>
            </View>
          ))}

          <View style={styles.sectionBox}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <Text style={styles.subLabel}>Mis direcciones:</Text>
              <Pressable onPress={abrirFormularioNuevaDireccion}>
                <Text style={styles.linkText}>+ Agregar dirección</Text>
              </Pressable>
            </View>

            {mostrandoFormDir && (
              <View style={styles.inlineFormCard}>
                <Text style={styles.sectionTitle}>
                  {editandoDirId ? 'Editar dirección' : 'Nueva dirección'}
                </Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Alias (ej. Casa, Trabajo) *"
                  value={dirAlias}
                  onChangeText={setDirAlias}
                />
                <Text style={styles.subLabel}>Municipio:</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
                  {['Mosquera', 'Funza', 'Madrid', 'Otro'].map((m) => (
                    <Pressable
                      key={m}
                      onPress={() => setDirMunicipio(m)}
                      style={[styles.catChip, { marginBottom: 4 }, dirMunicipio === m && styles.catChipActive]}
                    >
                      <Text style={[styles.catChipText, dirMunicipio === m && { color: '#fff' }]}>{m}</Text>
                    </Pressable>
                  ))}
                </View>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Referencia de entrega *"
                  value={dirDescripcion}
                  onChangeText={setDirDescripcion}
                />
                <Text style={styles.subLabel}>¿Establecer como dirección principal?</Text>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Pressable
                    onPress={() => setDirEsPrincipal(true)}
                    style={[styles.modBtn, { marginRight: 8 }, dirEsPrincipal && styles.modBtnActive]}
                  >
                    <Text style={[styles.modBtnText, dirEsPrincipal && { color: '#fff' }]}>Sí, principal</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setDirEsPrincipal(false)}
                    style={[styles.modBtn, !dirEsPrincipal && styles.modBtnActive]}
                  >
                    <Text style={[styles.modBtnText, !dirEsPrincipal && { color: '#fff' }]}>No</Text>
                  </Pressable>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Pressable
                    style={[styles.modBtn, { flex: 1, marginRight: 10 }]}
                    onPress={() => {
                      setMostrandoFormDir(false);
                      setEditandoDirId(null);
                    }}
                  >
                    <Text style={styles.modBtnText}>Cancelar</Text>
                  </Pressable>
                  <Pressable style={[styles.checkoutBtn, { flex: 1, marginTop: 0 }]} onPress={guardarDireccion}>
                    <Text style={styles.checkoutBtnText}>Guardar</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {direcciones.map((d) => {
              const sel = d.id === direccionSeleccionadaId;
              return (
                <View key={d.id} style={[styles.dirCard, sel && styles.dirCardActive]}>
                  <View style={{ flex: 1, paddingRight: 6 }}>
                    <Text style={styles.productName}>
                      {d.alias} • {d.municipio} {d.principal ? '★ Principal' : ''}
                    </Text>
                    <Text style={styles.productCat}>{d.descripcion}</Text>
                    <Pressable onPress={() => setDireccionSeleccionadaId(d.id)} style={{ marginTop: 4 }}>
                      <Text style={styles.linkText}>{sel ? '✓ Seleccionada para envío' : 'Seleccionar para envío'}</Text>
                    </Pressable>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    {!d.principal && (
                      <Pressable style={[styles.smallActionPill, { marginBottom: 6 }]} onPress={() => marcarPrincipal(d.id)}>
                        <Text style={styles.linkText}>Marcar principal</Text>
                      </Pressable>
                    )}
                    <Pressable style={styles.smallActionPill} onPress={() => abrirFormularioEditarDireccion(d)}>
                      <Text style={styles.linkText}>Editar</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}

            <Text style={[styles.subLabel, { marginTop: 8 }]}>Modalidad de envío:</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              {['Estandar', 'Expres'].map((mod, idx) => (
                <Pressable
                  key={mod}
                  onPress={() => setModalidadEnvio(mod)}
                  style={[styles.modBtn, idx === 0 && { marginRight: 8 }, modalidadEnvio === mod && styles.modBtnActive]}
                >
                  <Text style={[styles.modBtnText, modalidadEnvio === mod && { color: '#fff' }]}>
                    {mod === 'Estandar' ? 'Estándar' : 'Exprés'}
                  </Text>
                </Pressable>
              ))}
            </View>

            {tarifaObj && direccionActiva && modalidadEnvio ? (
              <Text style={styles.infoBanner}>
                Envío ({direccionActiva.municipio} - {modalidadEnvio}): $ {tarifaObj.costo.toLocaleString()} • Estimación: {tarifaObj.plazo}
              </Text>
            ) : (
              <Text style={styles.warnBanner}>
                Falta elegir dirección y/o modalidad de envío para calcular el costo.
              </Text>
            )}

            <Text style={[styles.subLabel, { marginTop: 10 }]}>Comprador ficticio:</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Nombre ficticio *"
              value={nombreComprador}
              onChangeText={setNombreComprador}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Teléfono ficticio *"
              keyboardType="phone-pad"
              value={telefonoComprador}
              onChangeText={setTelefonoComprador}
            />
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text>Subtotal:</Text>
              <Text style={{ fontWeight: 'bold' }}>$ {subtotal.toLocaleString()} COP</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Costo de envío:</Text>
              <Text style={{ fontWeight: 'bold' }}>$ {costoEnvio.toLocaleString()} COP</Text>
            </View>
            <View style={[styles.summaryRow, { borderTopWidth: 1, borderColor: '#ffe5ec', paddingTop: 6, marginTop: 6 }]}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Total:</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#ff758c' }}>$ {totalCompra.toLocaleString()} COP</Text>
            </View>

            {avisoError ? (
              <View style={[styles.alertErrorBox, { marginTop: 8, marginBottom: 2 }]}>
                <Text style={styles.alertErrorText}>⚠️ {avisoError}</Text>
              </View>
            ) : null}

            <Pressable style={styles.checkoutBtn} onPress={confirmarCompra}>
              <Text style={styles.checkoutBtnText}>Confirmar compra simulada ✨</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );

  const renderHistorial = () => (
    <ScrollView style={styles.container}>
      {renderAvisos()}
      <Text style={styles.sectionTitle}>Mis pedidos 📦</Text>
      {historialPedidos.map((ped) => (
        <View key={ped.codigo} style={styles.orderCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.orderCode}>{ped.codigo}</Text>
            <View style={[styles.statusBadge, ped.estado === 'Cancelado' && { backgroundColor: '#ff4d6d' }]}>
              <Text style={styles.statusBadgeText}>{ped.estado}</Text>
            </View>
          </View>
          <Text style={styles.productCat}>Fecha: {ped.fecha}</Text>
          <Text style={styles.productCat}>Destino: {ped.comprador.municipio} - {ped.comprador.direccion}</Text>

          <View style={styles.timelineBox}>
            <Text style={styles.subLabel}>Historial cronológico:</Text>
            {ped.historialEstados.map((h, i) => (
              <Text key={i} style={styles.timelineText}>• {h.estado} ({h.fecha})</Text>
            ))}
          </View>

          {ped.items.map((it, idx) => (
            <Text key={idx} style={styles.orderItemText}>
              • {it.nombre} [{it.varianteEtiqueta}] x{it.cantidad} — $ {(it.precioUnitario * it.cantidad).toLocaleString()}
            </Text>
          ))}

          <Text style={[styles.productPrice, { marginTop: 6 }]}>Total: $ {ped.total.toLocaleString()} COP</Text>

          <View style={styles.orderActionsRow}>
            {ped.estado !== 'Entregado' && ped.estado !== 'Cancelado' && (
              <Pressable style={[styles.simBtn, { marginRight: 8 }]} onPress={() => avanzarEstadoPedido(ped.codigo)}>
                <Text style={styles.simBtnText}>Simular avance de entrega</Text>
              </Pressable>
            )}
            <Pressable style={styles.cancelOrderBtn} onPress={() => cancelarPedido(ped)}>
              <Text style={styles.cancelOrderText}>Cancelar pedido</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderNotificaciones = () => (
    <ScrollView style={styles.container}>
      {renderAvisos()}
      <Text style={styles.sectionTitle}>Notificaciones 🔔</Text>
      {notificaciones.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tienes notificaciones internas por el momento.</Text>
        </View>
      ) : (
        notificaciones.map((n) => (
          <Pressable
            key={n.id}
            onPress={() =>
              setNotificaciones((prev) => prev.map((item) => (item.id === n.id ? { ...item, leida: true } : item)))
            }
            style={[styles.notifCard, !n.leida && styles.notifUnread]}
          >
            <View style={styles.summaryRow}>
              <Text style={styles.productName}>{n.tipo} {n.leida ? '(Leída)' : '(No leída)'}</Text>
              <Text style={styles.productCat}>{n.fecha}</Text>
            </View>
            <Text style={styles.qaQuestion}>{n.mensaje}</Text>
          </Pressable>
        ))
      )}
    </ScrollView>
  );

  const renderAyuda = () => (
    <ScrollView style={styles.container}>
      {renderAvisos()}
      <Text style={styles.sectionTitle}>Ayuda y soporte 🆘</Text>
      <View style={styles.sectionBox}>
        <Text style={styles.subLabel}>Pedido:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
          {historialPedidos.map((p) => (
            <Pressable
              key={p.codigo}
              onPress={() => setTicketPedidoCodigo(p.codigo)}
              style={[styles.catChip, ticketPedidoCodigo === p.codigo && styles.catChipActive]}
            >
              <Text style={[styles.catChipText, ticketPedidoCodigo === p.codigo && { color: '#fff' }]}>{p.codigo}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.subLabel}>Motivo:</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          {['Entrega', 'Producto', 'Otro'].map((mot) => (
            <Pressable
              key={mot}
              onPress={() => setTicketMotivo(mot)}
              style={[styles.catChip, ticketMotivo === mot && styles.catChipActive]}
            >
              <Text style={[styles.catChipText, ticketMotivo === mot && { color: '#fff' }]}>{mot}</Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          style={[styles.searchInput, { height: 70, textAlignVertical: 'top' }]}
          multiline
          placeholder="Descripción (mínimo 15 caracteres)..."
          value={ticketDescripcion}
          onChangeText={setTicketDescripcion}
        />

        <Pressable style={styles.checkoutBtn} onPress={crearTicketSoporte}>
          <Text style={styles.checkoutBtnText}>Enviar</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Solicitudes ({ticketsSoporte.length})</Text>
      {ticketsSoporte.map((t) => (
        <View key={t.id} style={styles.orderCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.orderCode}>{t.id} • {t.pedidoCodigo}</Text>
            <Text style={styles.productPrice}>{t.estado}</Text>
          </View>
          <Text style={styles.productCat}>Motivo: {t.motivo}</Text>
          <Text style={styles.qaQuestion}>{t.descripcion}</Text>
          {t.estado === 'Respondido' ? (
            <Text style={styles.qaAnswer}>{t.respuesta}</Text>
          ) : (
            <Pressable style={[styles.simBtn, { marginTop: 8 }]} onPress={() => simularRespuestaTicket(t.id)}>
              <Text style={styles.simBtnText}>Simular respuesta</Text>
            </Pressable>
          )}
        </View>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#ff758c" barStyle="light-content" />
      {renderHeader()}
      <View style={styles.bodyContainer}>
        {vistaActual === 'catalogo' && renderCatalogo()}
        {vistaActual === 'detalle' && renderDetalle()}
        {vistaActual === 'comparador' && renderComparador()}
        {vistaActual === 'favoritos' && renderFavoritos()}
        {vistaActual === 'carrito' && renderCarrito()}
        {vistaActual === 'historial' && renderHistorial()}
        {vistaActual === 'notificaciones' && renderNotificaciones()}
        {vistaActual === 'ayuda' && renderAyuda()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ff758c',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    backgroundColor: '#ff758c',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 10, color: '#ffe5ec' },
  navIconsRow: { flexDirection: 'row' },
  navBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 3,
  },
  navBtnActive: { backgroundColor: '#fff' },
  navBtnText: { fontSize: 11, fontWeight: 'bold' },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff9fa',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
  },
  container: { flex: 1, padding: 12 },
  alertErrorBox: {
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#ff4d6d',
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  alertErrorText: { color: '#b00020', fontSize: 11, fontWeight: 'bold' },
  alertSuccessBox: {
    backgroundColor: '#e8f5e9',
    borderWidth: 1,
    borderColor: '#4caf50',
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  alertSuccessText: { color: '#1b5e20', fontSize: 11, fontWeight: 'bold' },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffb3c6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 8,
    fontSize: 13,
  },
  chipsWrapper: { height: 38, marginBottom: 6 },
  chipsScroll: { alignItems: 'center' },
  catChip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff758c',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    marginRight: 6,
  },
  catChipActive: { backgroundColor: '#ff758c' },
  catChipText: { color: '#ff758c', fontSize: 11, fontWeight: '600' },
  catChipTextActive: { color: '#fff' },
  brandChip: {
    backgroundColor: '#ffe5ec',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  brandChipActive: { backgroundColor: '#d6336c' },
  brandChipText: { color: '#d6336c', fontSize: 10, fontWeight: '600' },
  filterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceInput: {
    width: 54,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffb3c6',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 4,
    fontSize: 11,
    marginRight: 4,
  },
  filterToggleBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff758c',
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 4,
  },
  filterToggleActive: { backgroundColor: '#ff758c' },
  filterToggleText: { fontSize: 10, color: '#ff758c', fontWeight: 'bold' },
  resetBtn: {
    backgroundColor: '#ffe5ec',
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 8,
  },
  resetBtnText: { color: '#ff758c', fontWeight: 'bold', fontSize: 10 },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ffe5ec',
  },
  productIconBox: {
    height: 85,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 6,
    position: 'relative',
  },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  brandBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(255,117,140,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  brandBadgeText: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
  productName: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  productCat: { fontSize: 10, color: '#777', marginBottom: 2 },
  productPrice: { fontSize: 12, fontWeight: 'bold', color: '#ff758c' },
  productStock: { fontSize: 10, color: '#555', marginBottom: 5 },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ffe5ec',
    paddingTop: 5,
  },
  compBtn: {
    borderWidth: 1,
    borderColor: '#ffb3c6',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
  },
  compBtnActive: { backgroundColor: '#ff758c', borderColor: '#ff758c' },
  compBtnText: { fontSize: 9, color: '#ff758c', fontWeight: 'bold' },
  addSmallBtn: {
    backgroundColor: '#ff758c',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  addSmallBtnText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  btnDisabled: { backgroundColor: '#ccc' },
  emptyContainer: { marginTop: 40, alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 13, color: '#777', textAlign: 'center', marginBottom: 12 },
  primaryBtn: { backgroundColor: '#ff758c', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  backBtn: { marginBottom: 8 },
  backBtnText: { color: '#ff758c', fontWeight: 'bold', fontSize: 13 },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ffe5ec',
    marginBottom: 12,
  },
  detailImageLarge: { width: '100%', height: 170, borderRadius: 10, marginBottom: 10 },
  detailBrand: { fontSize: 11, color: '#d6336c', fontWeight: 'bold' },
  detailTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  detailPrice: { fontSize: 17, fontWeight: 'bold', color: '#ff758c', marginBottom: 4 },
  detailStock: { fontSize: 12, color: '#555', marginBottom: 10 },
  subLabel: { fontSize: 12, fontWeight: 'bold', color: '#444', marginBottom: 6 },
  variantsRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  variantChip: {
    borderWidth: 1,
    borderColor: '#ff758c',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 6,
    marginBottom: 6,
  },
  variantChipActive: { backgroundColor: '#ff758c' },
  variantOut: { borderColor: '#ccc', backgroundColor: '#f5f5f5' },
  variantText: { fontSize: 11, color: '#ff758c', fontWeight: '600' },
  outStockBox: { backgroundColor: '#fff0f3', padding: 10, borderRadius: 10, marginBottom: 10 },
  alertStockBtn: { backgroundColor: '#ff758c', padding: 8, borderRadius: 8, alignItems: 'center' },
  alertStockText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  simBtn: { backgroundColor: '#4a4e69', padding: 8, borderRadius: 8, alignItems: 'center' },
  simSmallBtn: { backgroundColor: '#4a4e69', padding: 5, borderRadius: 6, alignSelf: 'flex-start', marginTop: 4 },
  simBtnText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  detailDescText: { fontSize: 12, color: '#555', lineHeight: 18, marginBottom: 12 },
  checkoutBtn: { backgroundColor: '#ff758c', padding: 11, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  checkoutBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  sectionBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ffe5ec',
    marginBottom: 12,
  },
  inlineFormCard: {
    backgroundColor: '#fff9fa',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ff758c',
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  askRow: { flexDirection: 'row', marginBottom: 10 },
  sendSmallBtn: { backgroundColor: '#ff758c', justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10 },
  mutedText: { fontSize: 12, color: '#888', fontStyle: 'italic' },
  qaCard: { backgroundColor: '#fff9fa', padding: 8, borderRadius: 8, marginBottom: 6, borderWidth: 1, borderColor: '#ffe5ec' },
  qaQuestion: { fontSize: 12, fontWeight: '600', color: '#333' },
  qaMeta: { fontSize: 10, color: '#888', marginVertical: 2 },
  qaAnswer: { fontSize: 12, color: '#2b9348', marginTop: 4 },
  relCard: { width: 120, backgroundColor: '#fff9fa', padding: 8, borderRadius: 10, marginRight: 8, borderWidth: 1, borderColor: '#ffe5ec' },
  relImg: { width: '100%', height: 70, borderRadius: 6, marginBottom: 4 },
  compRow: { flexDirection: 'row' },
  compCol: { flex: 1, backgroundColor: '#fff', padding: 8, borderRadius: 10, borderWidth: 1, borderColor: '#ffe5ec', marginRight: 6 },
  compImg: { width: '100%', height: 70, borderRadius: 6, marginBottom: 6 },
  compTitle: { fontSize: 12, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  compSpec: { fontSize: 10, color: '#555', marginBottom: 2 },
  removeCompBtn: { marginTop: 8, backgroundColor: '#ffe5ec', padding: 4, borderRadius: 6, alignItems: 'center' },
  rowCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ffe5ec',
  },
  miniImg: { width: 42, height: 42, borderRadius: 8 },
  qtyControl: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ffb3c6', borderRadius: 8 },
  qtyBtn: { paddingHorizontal: 8, paddingVertical: 2 },
  qtyBtnText: { fontWeight: 'bold', color: '#ff758c', fontSize: 14 },
  qtyText: { paddingHorizontal: 6, fontWeight: 'bold', fontSize: 12 },
  linkText: { color: '#ff758c', fontSize: 11, fontWeight: 'bold' },
  smallActionPill: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffb3c6',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  dirCard: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffe5ec',
    marginBottom: 6,
    backgroundColor: '#fff9fa',
  },
  dirCardActive: { borderColor: '#ff758c', backgroundColor: '#fff0f3' },
  modBtn: { flex: 1, borderWidth: 1, borderColor: '#ff758c', padding: 8, borderRadius: 8, alignItems: 'center' },
  modBtnActive: { backgroundColor: '#ff758c' },
  modBtnText: { color: '#ff758c', fontWeight: 'bold', fontSize: 12 },
  infoBanner: { backgroundColor: '#e8f5e9', color: '#2e7d32', padding: 8, borderRadius: 8, fontSize: 11, fontWeight: '600' },
  warnBanner: { backgroundColor: '#ffebee', color: '#c62828', padding: 8, borderRadius: 8, fontSize: 11, fontWeight: '600' },
  summaryCard: { backgroundColor: '#fff', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#ffe5ec' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  orderCard: { backgroundColor: '#fff', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#ffe5ec', marginBottom: 10 },
  orderCode: { fontWeight: 'bold', color: '#ff758c', fontSize: 13 },
  statusBadge: { backgroundColor: '#ff758c', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  statusBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  timelineBox: { backgroundColor: '#fff9fa', padding: 8, borderRadius: 8, marginVertical: 6 },
  timelineText: { fontSize: 11, color: '#555' },
  orderItemText: { fontSize: 11, color: '#333' },
  orderActionsRow: { flexDirection: 'row', marginTop: 10 },
  cancelOrderBtn: { backgroundColor: '#ffe5ec', padding: 8, borderRadius: 8, alignItems: 'center' },
  cancelOrderText: { color: '#ff4d6d', fontSize: 11, fontWeight: 'bold' },
  notifCard: { backgroundColor: '#fff', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ffe5ec', marginBottom: 8 },
  notifUnread: { borderColor: '#ff758c', backgroundColor: '#fff0f3' },
});