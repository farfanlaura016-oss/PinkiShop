import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
  Modal,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from 'react-native';

const CATALOGO_INICIAL = [
  { id: 'PROD-001', nombre: 'Audífonos Inalámbricos Pink', categoria: 'Tecnología', precio: 120000, stock: 8, descripcion: 'Cancelación de ruido activa y diseño estético en tono pastel.', icono: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5IhnrD87UaiI8lKvJBtuWa5DyOE38ibiOWYgxQhr9gw&s=10' },
  { id: 'PROD-002', nombre: 'Smartwatch Rose Gold', categoria: 'Tecnología', precio: 180000, stock: 5, descripcion: 'Monitoreo de salud, llamadas y correa magnética elegante.', icono: 'https://exitocol.vtexassets.com/arquivos/ids/24633028/reloj-inteligente-smartwatch-t500pro-serie-7-rosado-scroll-obsequio-pulso-adicional-color-aleatorio.jpg?v=638617724449200000' },
  { id: 'PROD-003', nombre: 'Teclado Mecánico Kawaii', categoria: 'Tecnología', precio: 145000, stock: 10, descripcion: 'Teclas redondas estilo retro con iluminación LED suave.', icono: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ79tQiORVSUnQN5Ttt_9vDbZ6hac96LFtKlO62ZDB0QDtEMpBM55igV9I-&s=10' },
  { id: 'PROD-004', nombre: 'Hoodie Oversize Cloud', categoria: 'Moda', precio: 95000, stock: 12, descripcion: 'Algodón afelpado ultra suave, ajuste cómodo y moderno.', icono: 'https://i.etsystatic.com/67931559/r/il/a13380/8566524249/il_fullxfull.8566524249_qytz.jpg' },
  { id: 'PROD-005', nombre: 'Gafas de Sol Coquette', categoria: 'Moda', precio: 60000, stock: 15, descripcion: 'Protección UV400 con montura en tonos cálidos y chic.', icono: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRUPW5O8mM1mokOFc6VXfOvfcd1QVbLzFxaUoY05gpPOC1F8qRB29aOifd&s=10' },
  { id: 'PROD-006', nombre: 'Bolso Elegante Chic', categoria: 'Moda', precio: 85000, stock: 7, descripcion: 'Diseño versátil con detalles dorados y gran espacio interior.', icono: 'https://img.kwcdn.com/product/fancy/0fbfa4d6-958d-42c1-9db7-8c87784d28e6.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp' },
  { id: 'PROD-007', nombre: 'Lámpara Atardecer LED', categoria: 'Hogar', precio: 75000, stock: 6, descripcion: 'Proyección de luz cálida ideal para fotos y relax.', icono: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNrwZLurAJ5VlL45uyt0EYj60EiMadEzM7PDabenCj1g&s' },
  { id: 'PROD-008', nombre: 'Organizador Pastel Desk', categoria: 'Hogar', precio: 45000, stock: 20, descripcion: 'Compartimentos estéticos para mantener tu espacio impecable.', icono: 'https://png.pngtree.com/png-vector/20260516/ourlarge/pngtree-pastel-desk-organizer-stack-with-stationery-scissors-and-notebook-3d-render-png-image_19320998.webp' },
  { id: 'PROD-009', nombre: 'Mini Cafetera Estética', categoria: 'Hogar', precio: 65000, stock: 9, descripcion: 'Prensa francesa de diseño delicado en vidrio y detalles rose.', icono: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLe2Y80jJqyaUqk-qaLTAvCWePPo69Nfm4CR0sW-Yug&s=10' },
  { id: 'PROD-010', nombre: 'Mochila Antirrobo Velvet', categoria: 'Accesorios', precio: 110000, stock: 4, descripcion: 'Cierres ocultos, segura, impermeable y muy femenina.', icono: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnSwGFtqyLogNPAi9gHj-BYn5_XJe4QprEff0vHsN1Ow&s=10' },
  { id: 'PROD-011', nombre: 'Botella Térmica Glow', categoria: 'Accesorios', precio: 55000, stock: 14, descripcion: 'Acero inoxidable que mantiene tus bebidas frías todo el día.', icono: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDEimqx7x_gzEi4T59fPiV2PcLEFS6NuXIoVP9kX68Kg&s=10' },
  { id: 'PROD-012', nombre: 'Soporte Laptop Glossy', categoria: 'Accesorios', precio: 50000, stock: 11, descripcion: 'Ergonómico, plegable y con acabado metalizado brillante.', icono: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlC-t3XfI3OgaXyMcydMsK7yjjTMH1T3VisDGPSVhYqA&s=10' },
];

export default function App() {
  const [productos, setProductos] = useState(CATALOGO_INICIAL);
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [vistaActual, setVistaActual] = useState('catalogo');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [ordenPrecio, setOrdenPrecio] = useState(null);
  const [modalCheckoutVisible, setModalCheckoutVisible] = useState(false);
  const [nombreComprador, setNombreComprador] = useState('');
  const [telefonoComprador, setTelefonoComprador] = useState('');
  const [municipioComprador, setMunicipioComprador] = useState('');
  const [direccionComprador, setDireccionComprador] = useState('');

  const categorias = ['Todas', 'Tecnología', 'Moda', 'Hogar', 'Accesorios'];

  const productosFiltrados = productos.filter(item => {
    const coincideNombre = item.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === 'Todas' || item.categoria === categoriaSeleccionada;
    return coincideNombre && coincideCategoria;
  }).sort((a, b) => {
    if (ordenPrecio === 'asc') return a.precio - b.precio;
    if (ordenPrecio === 'desc') return b.precio - a.precio;
    return 0;
  });

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter(favId => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  const agregarAlCarrito = (producto) => {
    if (producto.stock <= 0) {
      Alert.alert('Agotado', 'Este tesorito no tiene existencias por ahora.');
      return;
    }

    const index = carrito.findIndex(item => item.producto.id === producto.id);
    if (index >= 0) {
      const itemActual = carrito[index];
      if (itemActual.cantidad >= producto.stock) {
        Alert.alert('Stock máximo', 'Ya alcanzaste el límite disponible de este producto.');
        return;
      }
      const nuevoCarrito = [...carrito];
      nuevoCarrito[index].cantidad += 1;
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { producto, cantidad: 1 }]);
    }
    Alert.alert('¡Añadido!', `${producto.nombre} se guardó en tu carrito.`);
  };

  const cambiarCantidadCarrito = (id, delta) => {
    const index = carrito.findIndex(item => item.producto.id === id);
    if (index < 0) return;

    const itemActual = carrito[index];
    const prodCatalogo = productos.find(p => p.id === id);
    const nuevaCantidad = itemActual.cantidad + delta;

    if (nuevaCantidad <= 0) {
      setCarrito(carrito.filter(item => item.producto.id !== id));
      return;
    }

    if (nuevaCantidad > prodCatalogo.stock) {
      Alert.alert('Stock excedido', 'No hay más unidades disponibles en stock.');
      return;
    }

    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad = nuevaCantidad;
    setCarrito(nuevoCarrito);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.producto.id !== id));
  };

  const subtotal = carrito.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);
  const envio = subtotal === 0 ? 0 : (subtotal >= 150000 ? 0 : 8000);
  const total = subtotal + envio;

  const procesarCompra = () => {
    if (!nombreComprador.trim() || !telefonoComprador.trim() || !municipioComprador.trim() || !direccionComprador.trim()) {
      Alert.alert('Datos incompletos', 'Por favor llena todos los campos para enviarte tu pedido.');
      return;
    }

    for (let item of carrito) {
      const pOriginal = productos.find(p => p.id === item.producto.id);
      if (item.cantidad > pOriginal.stock) {
        Alert.alert('Error de Stock', `El producto ${pOriginal.nombre} ya no cuenta con el stock requerido.`);
        return;
      }
    }

    const nuevosProductos = productos.map(prod => {
      const itemEnCarrito = carrito.find(c => c.producto.id === prod.id);
      if (itemEnCarrito) {
        return { ...prod, stock: prod.stock - itemEnCarrito.cantidad };
      }
      return prod;
    });
    setProductos(nuevosProductos);

    const codigoPedido = 'PINK-' + Math.floor(100000 + Math.random() * 900000);
    const nuevoPedido = {
      codigo: codigoPedido,
      fecha: new Date().toLocaleString(),
      items: [...carrito],
      subtotal,
      envio,
      total,
      comprador: { nombre: nombreComprador, municipio: municipioComprador, direccion: direccionComprador }
    };

    setHistorialPedidos([nuevoPedido, ...historialPedidos]);
    setCarrito([]);
    setModalCheckoutVisible(false);
    setNombreComprador('');
    setTelefonoComprador('');
    setMunicipioComprador('');
    setDireccionComprador('');
    
    setVistaActual('historial');
    Alert.alert('¡Pedido Exitoso! ✨', `Tu compra ${codigoPedido} ha sido registrada con éxito.`);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>PinkiShop 🌸✨</Text>
        <Text style={styles.headerSubtitle}>Tus caprichos favoritos en un solo lugar</Text>
      </View>
      <View style={styles.navIconsRow}>
        <Pressable onPress={() => setVistaActual('catalogo')} style={[styles.navBtn, vistaActual === 'catalogo' && styles.navBtnActive]}>
          <Text style={styles.navBtnText}>🏠</Text>
        </Pressable>
        <Pressable onPress={() => setVistaActual('favoritos')} style={[styles.navBtn, vistaActual === 'favoritos' && styles.navBtnActive]}>
          <Text style={styles.navBtnText}>💖</Text>
        </Pressable>
        <Pressable onPress={() => setVistaActual('carrito')} style={[styles.navBtn, vistaActual === 'carrito' && styles.navBtnActive]}>
          <Text style={styles.navBtnText}>🛍️</Text>
        </Pressable>
        <Pressable onPress={() => setVistaActual('historial')} style={[styles.navBtn, vistaActual === 'historial' && styles.navBtnActive]}>
          <Text style={styles.navBtnText}>✨</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderCatalogo = () => (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Busca tus favoritos aquí..."
        placeholderTextColor="#aaa"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {categorias.map(cat => (
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

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Ordenar:</Text>
        <Pressable onPress={() => setOrdenPrecio('asc')} style={[styles.sortBtn, ordenPrecio === 'asc' && styles.sortBtnActive]}>
          <Text style={[styles.sortBtnText, ordenPrecio === 'asc' && { color: '#fff' }]}>Precio bajo</Text>
        </Pressable>
        <Pressable onPress={() => setOrdenPrecio('desc')} style={[styles.sortBtn, ordenPrecio === 'desc' && styles.sortBtnActive]}>
          <Text style={[styles.sortBtnText, ordenPrecio === 'desc' && { color: '#fff' }]}>Precio alto</Text>
        </Pressable>
        {ordenPrecio && (
          <Pressable onPress={() => setOrdenPrecio(null)} style={styles.clearSortBtn}>
            <Text style={styles.clearSortText}>Limpiar</Text>
          </Pressable>
        )}
      </View>

      {productosFiltrados.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Ups, no encontramos productos con esa búsqueda.</Text>
        </View>
      ) : (
        <FlatList
          data={productosFiltrados}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
          renderItem={({ item }) => {
            const esFav = favoritos.includes(item.id);
            return (
              <View style={styles.productCard}>
                <Pressable onPress={() => { setProductoSeleccionado(item); setVistaActual('detalle'); }}>
                  <View style={styles.productIconBox}>
                    <Image source={{ uri: item.icono }} style={styles.productImage} />
                  </View>
                  <Text style={styles.productName} numberOfLines={1}>{item.nombre}</Text>
                  <Text style={styles.productCat}>{item.categoria}</Text>
                  <Text style={styles.productPrice}>$ {item.precio.toLocaleString()} COP</Text>
                  <Text style={[styles.productStock, item.stock === 0 && { color: '#ff4d6d' }]}>
                    {item.stock > 0 ? `Disponibles: ${item.stock}` : 'Agotado 🚫'}
                  </Text>
                </Pressable>

                <View style={styles.cardActions}>
                  <Pressable style={styles.favSmallBtn} onPress={() => toggleFavorito(item.id)}>
                    <Text>{esFav ? '💖' : '🤍'}</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.addSmallBtn, item.stock === 0 && styles.btnDisabled]} 
                    onPress={() => agregarAlCarrito(item)}
                  >
                    <Text style={styles.addSmallBtnText}>Agregar +</Text>
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
    if (!productoSeleccionado) return null;
    const esFav = favoritos.includes(productoSeleccionado.id);

    return (
      <ScrollView style={styles.detailContainer}>
        <Pressable style={styles.backBtn} onPress={() => setVistaActual('catalogo')}>
          <Text style={styles.backBtnText}>← Volver a la tienda</Text>
        </Pressable>

        <View style={styles.detailCard}>
          <Image source={{ uri: productoSeleccionado.icono }} style={styles.detailImageLarge} />
          <Text style={styles.detailTitle}>{productoSeleccionado.nombre}</Text>
          <Text style={styles.detailCategory}>Categoría: {productoSeleccionado.categoria}</Text>
          <Text style={styles.detailPrice}>$ {productoSeleccionado.precio.toLocaleString()} COP</Text>
          <Text style={[styles.detailStock, productoSeleccionado.stock === 0 && { color: '#ff4d6d' }]}>
            Stock: {productoSeleccionado.stock > 0 ? `${productoSeleccionado.stock} unidades` : 'Agotado'}
          </Text>
          
          <Text style={styles.detailDescTitle}>Descripción:</Text>
          <Text style={styles.detailDescText}>{productoSeleccionado.descripcion}</Text>

          <View style={styles.detailButtonsRow}>
            <Pressable style={styles.actionFavBtn} onPress={() => toggleFavorito(productoSeleccionado.id)}>
              <Text style={styles.actionFavText}>{esFav ? '💖 En favoritos' : '🤍 Agregar a favoritos'}</Text>
            </Pressable>

            <Pressable 
              style={[styles.actionAddBtn, productoSeleccionado.stock === 0 && styles.btnDisabled]} 
              onPress={() => agregarAlCarrito(productoSeleccionado)}
            >
              <Text style={styles.actionAddText}>Añadir al carrito</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderFavoritos = () => {
    const prodsFavs = productos.filter(p => favoritos.includes(p.id));
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Tus Favoritos 💖 ({prodsFavs.length})</Text>
        {prodsFavs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aún no tienes productos guardados en favoritos.</Text>
            <Pressable style={styles.primaryBtn} onPress={() => setVistaActual('catalogo')}>
              <Text style={styles.primaryBtnText}>Explorar tienda</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={prodsFavs}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.favRowItem}>
                <Image source={{ uri: item.icono }} style={styles.favItemImage} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.favItemName}>{item.nombre}</Text>
                  <Text style={styles.favItemPrice}>$ {item.precio.toLocaleString()} COP</Text>
                </View>
                <Pressable onPress={() => toggleFavorito(item.id)} style={styles.trashBtn}>
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
      <Text style={styles.sectionTitle}>Tu Carrito de Compras 🛍️</Text>
      {carrito.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tu carrito está solito, ¡anímate a llenarlo!</Text>
          <Pressable style={styles.primaryBtn} onPress={() => setVistaActual('catalogo')}>
            <Text style={styles.primaryBtnText}>Ver productos</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          {carrito.map(item => (
            <View key={item.producto.id} style={styles.cartRowItem}>
              <Image source={{ uri: item.producto.icono }} style={styles.cartItemImage} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.cartItemName} numberOfLines={1}>{item.producto.nombre}</Text>
                <Text style={styles.cartItemPrice}>$ {item.producto.precio.toLocaleString()} c/u</Text>
              </View>
              <View style={styles.qtyControl}>
                <Pressable onPress={() => cambiarCantidadCarrito(item.producto.id, -1)} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </Pressable>
                <Text style={styles.qtyText}>{item.cantidad}</Text>
                <Pressable onPress={() => cambiarCantidadCarrito(item.producto.id, 1)} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </Pressable>
              </View>
              <Pressable onPress={() => eliminarDelCarrito(item.producto.id)} style={{ marginLeft: 10 }}>
                <Text>🗑️</Text>
              </Pressable>
            </View>
          ))}

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal:</Text>
              <Text style={styles.summaryValue}>$ {subtotal.toLocaleString()} COP</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Envío:</Text>
              <Text style={styles.summaryValue}>
                {envio === 0 ? '¡GRATIS! (Compras ≥ $150k)' : `$ ${envio.toLocaleString()} COP`}
              </Text>
            </View>
            <View style={[styles.summaryRow, { borderTopWidth: 1, borderColor: '#ffe5ec', marginTop: 8, paddingTop: 8 }]}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalValue}>$ {total.toLocaleString()} COP</Text>
            </View>

            <Pressable style={styles.checkoutBtn} onPress={() => setModalCheckoutVisible(true)}>
              <Text style={styles.checkoutBtnText}>Continuar con la Compra ✨</Text>
            </Pressable>
          </View>
        </View>
      )}

      <Modal visible={modalCheckoutVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Datos de Envío 🌸</Text>
            <Text style={styles.modalSubtitle}>Simulación académica (No se requieren datos bancarios).</Text>

            <TextInput
              style={styles.inputField}
              placeholder="Tu nombre completo *"
              placeholderTextColor="#aaa"
              value={nombreComprador}
              onChangeText={setNombreComprador}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Teléfono de contacto *"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={telefonoComprador}
              onChangeText={setTelefonoComprador}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Municipio (Mosquera / Madrid / Funza) *"
              placeholderTextColor="#aaa"
              value={municipioComprador}
              onChangeText={setMunicipioComprador}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Dirección de entrega *"
              placeholderTextColor="#aaa"
              value={direccionComprador}
              onChangeText={setDireccionComprador}
            />

            <View style={styles.modalBtnsRow}>
              <Pressable style={styles.cancelModalBtn} onPress={() => setModalCheckoutVisible(false)}>
                <Text style={styles.cancelModalText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.confirmModalBtn} onPress={procesarCompra}>
                <Text style={styles.confirmModalText}>Confirmar Pedido</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  const renderHistorial = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Tus Pedidos Confirmados ✨</Text>
      {historialPedidos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aún no tienes pedidos registrados en el sistema.</Text>
        </View>
      ) : (
        historialPedidos.map((pedido, index) => (
          <View key={index} style={styles.orderCard}>
            <View style={styles.orderHeaderRow}>
              <Text style={styles.orderCode}>{pedido.codigo}</Text>
              <Text style={styles.orderDate}>{pedido.fecha}</Text>
            </View>
            <Text style={styles.orderClient}>Cliente: {pedido.comprador.nombre} ({pedido.comprador.municipio})</Text>
            <Text style={styles.orderClient}>Dirección: {pedido.comprador.direccion}</Text>
            
            <View style={{ marginTop: 8, borderTopWidth: 1, borderColor: '#ffe5ec', paddingTop: 6 }}>
              {pedido.items.map((it, idx) => (
                <Text key={idx} style={styles.orderItemText}>
                  • {it.producto.nombre} (x{it.cantidad}) - $ {(it.producto.precio * it.cantidad).toLocaleString()} COP
                </Text>
              ))}
            </View>

            <View style={styles.orderFooterRow}>
              <Text style={styles.orderTotalLabel}>Total Pagado:</Text>
              <Text style={styles.orderTotalValue}>$ {pedido.total.toLocaleString()} COP</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#ff758c" barStyle="light-content" />
      {renderHeader()}
      <View style={styles.bodyContainer}>
        {vistaActual === 'catalogo' && renderCatalogo()}
        {vistaActual === 'detalle' && renderDetalle()}
        {vistaActual === 'favoritos' && renderFavoritos()}
        {vistaActual === 'carrito' && renderCarrito()}
        {vistaActual === 'historial' && renderHistorial()}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#ffe5ec',
  },
  navIconsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  navBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  navBtnActive: {
    backgroundColor: '#fff',
  },
  navBtnText: {
    fontSize: 12,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff9fa',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    paddingTop: 8,
  },
  container: {
    flex: 1,
    padding: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffb3c6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  categoriesWrapper: {
    height: 48,
    marginBottom: 8,
    justifyContent: 'center',
  },
  categoriesContainer: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  catChip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff758c',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    height: 38,
    justifyContent: 'center',
  },
  catChipActive: {
    backgroundColor: '#ff758c',
  },
  catChipText: {
    color: '#ff758c',
    fontSize: 12,
    fontWeight: '600',
  },
  catChipTextActive: {
    color: '#fff',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  sortLabel: {
    fontSize: 11,
    color: '#888',
  },
  sortBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffb3c6',
  },
  sortBtnActive: {
    backgroundColor: '#ff758c',
    borderColor: '#ff758c',
  },
  sortBtnText: {
    fontSize: 11,
    color: '#555',
  },
  clearSortBtn: {
    paddingHorizontal: 6,
  },
  clearSortText: {
    fontSize: 11,
    color: '#ff758c',
    fontWeight: 'bold',
  },
  productList: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 6,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ffe5ec',
    shadowColor: '#ff758c',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productIconBox: {
    height: 90,
    backgroundColor: '#fff0f3',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 6,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  productCat: {
    fontSize: 10,
    color: '#888',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ff758c',
    marginBottom: 2,
  },
  productStock: {
    fontSize: 10,
    color: '#666',
    marginBottom: 6,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ffe5ec',
    paddingTop: 6,
  },
  favSmallBtn: {
    padding: 4,
  },
  addSmallBtn: {
    backgroundColor: '#ff758c',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  addSmallBtnText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  btnDisabled: {
    backgroundColor: '#ddd',
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 16,
  },
  primaryBtn: {
    backgroundColor: '#ff758c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailContainer: {
    flex: 1,
    padding: 16,
  },
  backBtn: {
    marginBottom: 12,
  },
  backBtnText: {
    color: '#ff758c',
    fontWeight: 'bold',
    fontSize: 13,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffe5ec',
  },
  detailImageLarge: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 12,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  detailCategory: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff758c',
    marginBottom: 6,
  },
  detailStock: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  detailDescTitle: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detailDescText: {
    fontSize: 13,
    color: '#555',
    textAlign: 'left',
    marginBottom: 20,
    lineHeight: 18,
  },
  detailButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  actionFavBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ff758c',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionFavText: {
    color: '#ff758c',
    fontSize: 11,
    fontWeight: 'bold',
  },
  actionAddBtn: {
    flex: 1,
    backgroundColor: '#ff758c',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionAddText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  favRowItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ffe5ec',
  },
  favItemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  favItemName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  favItemPrice: {
    fontSize: 12,
    color: '#ff758c',
  },
  trashBtn: {
    padding: 6,
  },
  cartRowItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ffe5ec',
  },
  cartItemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  cartItemName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: 11,
    color: '#888',
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffb3c6',
    borderRadius: 8,
  },
  qtyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  qtyBtnText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ff758c',
  },
  qtyText: {
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ffe5ec',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 13,
    color: '#555',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  totalText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ff758c',
  },
  checkoutBtn: {
    backgroundColor: '#ff758c',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  checkoutBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 11,
    color: '#888',
    marginBottom: 16,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ffb3c6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 13,
  },
  modalBtnsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  cancelModalBtn: {
    flex: 1,
    backgroundColor: '#ffe5ec',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelModalText: {
    color: '#ff758c',
    fontWeight: 'bold',
  },
  confirmModalBtn: {
    flex: 1,
    backgroundColor: '#ff758c',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmModalText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ffe5ec',
  },
  orderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderCode: {
    fontWeight: 'bold',
    color: '#ff758c',
    fontSize: 13,
  },
  orderDate: {
    fontSize: 10,
    color: '#888',
  },
  orderClient: {
    fontSize: 11,
    color: '#555',
  },
  orderItemText: {
    fontSize: 11,
    color: '#444',
    marginBottom: 2,
  },
  orderFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: '#ffe5ec',
    paddingTop: 6,
  },
  orderTotalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  orderTotalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff758c',
  },
});