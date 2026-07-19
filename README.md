# GrwStore - Tienda Online Mejorada

## 🎉 Mejoras Implementadas

### 1. **Menú Móvil con Hamburguesa** ✅
- Botón de menú hamburguesa responsive
- Animación suave al abrir/cerrar
- Se cierra automáticamente al seleccionar una opción
- Accesible con teclado y screen readers

### 2. **Accesibilidad (A11y)** ✅
- ARIA labels en todos los botones interactivos
- Roles semánticos (navigation, dialog, list, listitem)
- Soporte para navegación por teclado
- Focus visible mejorado
- Textos alternativos para elementos visuales
- Skip link para saltar al contenido principal
- Notificaciones toast accesibles con `aria-live`

### 3. **Refactorización del Código JavaScript** ✅
- **ES6 Modules**: Separación de datos y lógica
- **Clase GrwStore**: Encapsulamiento completo
- **Eliminación de inline onclick**: Eventos binded correctamente
- **Debounce en el buscador**: Mejora de rendimiento (300ms)
- **Caché de elementos DOM**: Mejor performance
- **Código más mantenible y escalable**

### 4. **Datos Externalizados** ✅
- Productos en módulo separado (`products-data.js`)
- Fácil de actualizar sin tocar la lógica
- Exportación de categorías para reutilización

### 5. **Sistema de Notificaciones Toast Mejorado** ✅
- Contenedor dedicado en HTML
- Tipos: success, error, info
- Accesible con `role="alert"`
- Auto-eliminación después de 3 segundos

### 6. **Validación de Formularios** ✅
- Validación visual con bordes rojos
- Mensajes de error claros
- Prevención de envío vacío

### 7. **Mejoras Responsive Adicionales** ✅
- Grid de productos ajustado en móvil
- Categorías y features en una columna
- Espaciado optimizado para pantallas pequeñas

## 📁 Estructura del Proyecto

```
/workspace
├── index.html          # Estructura HTML con mejoras de accesibilidad
├── styles.css          # Estilos con menú móvil y accessibility
├── script.js           # Lógica refactorizada con ES6 modules
├── products-data.js    # Datos de productos externalizados
└── README.md           # Documentación
```

## 🚀 Cómo Usar

1. Abre `index.html` en un navegador moderno
2. O usa un servidor local:
   ```bash
   python3 -m http.server 8080
   ```
3. Visita `http://localhost:8080`

## 📱 Características

- ✅ Carrito de compras funcional con localStorage
- ✅ Filtrado por categorías
- ✅ Búsqueda con debounce
- ✅ Menú móvil responsive
- ✅ Totalmente accesible
- ✅ Notificaciones toast
- ✅ Diseño moderno y limpio

## 🔮 Próximas Mejoras Sugeridas

1. **Integración con Backend**: Conectar a API real
2. **Pasarela de Pago**: Stripe/PayPal integration
3. **PWA**: Service workers para offline
4. **Tests**: Unit tests con Jest
5. **Framework**: Migrar a React/Vue si escala
6. **Imágenes Reales**: Reemplazar emojis por fotos
7. SEO optimization
8. Analytics integration

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 con variables
- JavaScript ES6+ (modules, classes)
- Font Awesome icons
- LocalStorage API

---

**© 2024 GrwStore** - Tu tienda online mejorada
