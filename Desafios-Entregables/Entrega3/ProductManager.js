import fs from 'fs';

export class ProductManager {

    constructor(path) {

        this.path = path;
        this.loadProducts().then(() => {
            console.log('Archivo de productos cargado.');
        });

    }

    async saveProducts() {

        try {

            const data = JSON.stringify(this.products);
            await fs.promises.writeFile(this.path, data);
            return 'Archivo de productos guardado.'

        } catch(error) {

            throw new Error('No se pudo guardar el archivo de productos.');
          
        }

    }

    async loadProducts() {

        try {

            let data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            return this.products;

        } catch(error) {

            throw new Error('No se pudo leer el archivo de productos, se cargará un arreglo vacío.');

        }
    }

    getProducts() {

        return this.products;

    }

    async getProductById(id) {

        try {

            await this.loadProducts();
            let product = this.products.find((product) => product.id === id);

            if (!product) {

                console.error('Producto no encontrado');
                return;

            }

            return product;

        } catch(error) {

            throw new Error(error.message);

        }
    }

    async addProduct(product) {
        
        if (!product || !product.title || !product.description || !product.price) {
            console.error('Fields validation failed!');
            return;
        }
    
        
        let lastProd = this.products[this.products.length - 1];
        let nextId = 1;

        if (lastProd) {
          nextId = lastProduct.id + 1;
        }
    
        const newProduct = { id: nextId, ...product };
        this.products.push(newProduct);
        await this.saveProducts();
        console.log('Producto agregado:', newProduct);

    }

    async updateProduct(id, updatedFields) {

        let product = await this.getProductById(id);
        if (!product) return;

        Object.keys(updatedFields).forEach((key) => {

            product[key] = updatedFields[key];

        });

        await this.saveProducts();
        console.log('Producto actualizado:', product);

    }

    async deleteProduct(id) {
        let index = this.products.findIndex((product) => product.id === id);

        if (index === -1) {

          return;

        }

        this.products.splice(index, 1);
        await this.saveProducts();
        console.log(`Producto con ID ${id} ha sido eliminado.`);

    }

}