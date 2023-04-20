// Clase productManager
class productManager {

    // Constructor
    constructor () {

        this.products = []

    }

    // Métodos
    addProduct(title, description, price, thumbnail, code, stock) {
        try {

            if (this.products.find(prod => prod.code === code)) {

                console.log(`Ya existe un producto con el código ${code}`);
                return;

            } else if (title && description && price && thumbnail && code && stock) {

                if (this.products.find(prod => prod.code === code)) {
                    console.log(`Ya existe un producto con el código ${code}`);
                    return;
                } else {

                    const product = {
                        id: this.products.length,
                        title: title,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: code,
                        stock: stock
                    };
            
                    this.products.push(product);
                }

            } else {

                console.error('Hay parametros vacíos, asegurate de completar todos')
                return;

            }
        } catch (error) {

            console.log(error);

        }

        return this.products;
    }
    
    getProducts () {

        return this.products;

    }
    
    getProductById (id) {
        try {
            return this.products.filter(product => product.id === id);
        } catch (error) {
            console.log('No se encontró el producto');
            console.log(error);
        }
    }
}

// Crear el objeto productManager
let pm = new productManager;

// Agregar productos
pm.addProduct('Maceta', 'Maceta 50 litros', 3000, 'No disponible', 'a1', 10);
pm.addProduct('Mesa', 'Mesa de centro ratona de cafe', 50000, 'No disponible', 'b2', 25);
pm.addProduct('Sommier', 'Cama sommier', 80000, 'No disponible', 'c3', 2);
pm.addProduct('Mesa', 'Mesa de Ping Pong', 50000, 'No disponible', 'd4', 7);

// Obtener productos
console.log(pm.getProducts());
console.log(pm.getProductById(2));