// Products Data Module
// External data file for better separation of concerns

export const products = [
    {
        id: 1,
        name: "Laptop Pro 15",
        category: "electronica",
        price: 999.99,
        icon: "💻",
        description: "Laptop de alto rendimiento para profesionales"
    },
    {
        id: 2,
        name: "Smartphone X",
        category: "electronica",
        price: 699.99,
        icon: "📱",
        description: "Teléfono inteligente de última generación"
    },
    {
        id: 3,
        name: "Auriculares Wireless",
        category: "electronica",
        price: 149.99,
        icon: "🎧",
        description: "Sonido inalámbrico de alta calidad"
    },
    {
        id: 4,
        name: "Camiseta Casual",
        category: "ropa",
        price: 29.99,
        icon: "👕",
        description: "Camiseta cómoda para uso diario"
    },
    {
        id: 5,
        name: "Jeans Clásicos",
        category: "ropa",
        price: 59.99,
        icon: "👖",
        description: "Jeans de corte clásico y duradero"
    },
    {
        id: 6,
        name: "Zapatillas Deportivas",
        category: "ropa",
        price: 89.99,
        icon: "👟",
        description: "Zapatillas ligeras para deporte"
    },
    {
        id: 7,
        name: "Lámpara de Mesa",
        category: "hogar",
        price: 45.99,
        icon: "💡",
        description: "Iluminación elegante para tu espacio"
    },
    {
        id: 8,
        name: "Cojín Decorativo",
        category: "hogar",
        price: 24.99,
        icon: "🛋️",
        description: "Cojín decorativo para sala o dormitorio"
    },
    {
        id: 9,
        name: "Reloj Inteligente",
        category: "electronica",
        price: 249.99,
        icon: "⌚",
        description: "Monitoreo de salud y notificaciones"
    },
    {
        id: 10,
        name: "Chaqueta de Cuero",
        category: "ropa",
        price: 129.99,
        icon: "🧥",
        description: "Chaqueta elegante de cuero genuino"
    },
    {
        id: 11,
        name: "Planta Decorativa",
        category: "hogar",
        price: 34.99,
        icon: "🪴",
        description: "Planta artificial de bajo mantenimiento"
    },
    {
        id: 12,
        name: "Tablet Ultra",
        category: "electronica",
        price: 449.99,
        icon: "📱",
        description: "Tablet potente para trabajo y entretenimiento"
    }
];

// Export categories for potential use in filters
export const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'electronica', name: 'Electrónica' },
    { id: 'ropa', name: 'Ropa' },
    { id: 'hogar', name: 'Hogar' }
];
