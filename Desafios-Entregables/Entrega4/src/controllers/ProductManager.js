import fs from 'fs';
import { __dirname } from '../utils.js'
import { default as pathc } from 'path';
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {

    constructor(path) {

        this.path = pathc.join(__dirname, 'data', path);
        this.loadProducts().then(() => console.log('Products loaded.'));

    }

    async saveProducts() {

        try {

            const data = JSON.stringify(this.products, null, 4);
            await fs.promises.writeFile(this.path, data);
            return 'Archivo de productos guardado.';

        } catch(error) {

            throw error('No se pudo guardar el archivo de productos.');
          
        }

    }

    generateId() {

        return uuidv4();

    }

    async loadProducts() {

        try {

            let data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            return this.products;

        } catch(error) {

            throw error('No se pudo leer el archivo de productos, se cargará un arreglo vacío.');

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

            throw error(error.message);

        }
        
    }

    async addProduct(product) {

        try {
        
            if (!product || !product.title || !product.description || !product.price) {
                console.error('Fields validation failed!');
                return;
            }
            
            const newProduct = { id: this.generateId(), ...product };
            this.products.push(newProduct);
            await this.saveProducts();
            console.log('Producto agregado:', newProduct);
        
        } catch(error) {
            
            throw error(error.message);
        
        }

    }

    async updateProduct(id, updatedFields) {

        try {

            let product = await this.getProductById(id);
            if (!product) return;

            Object.keys(updatedFields).forEach((key) => {

                product[key] = updatedFields[key];

            });

            JSON.stringify(this.products, null, 4)

            await this.saveProducts();
            console.log('Producto actualizado:', product);
        
        } catch(error) {

            throw error(error.message);

        }

    }

    async deleteProduct(id) {

        try {

            let index = this.products.findIndex((product) => product.id === id);
            if (index === -1) return;

            this.products.splice(index, 1);
            await this.saveProducts();
            console.log(`Producto con ID ${id} ha sido eliminado.`);

        } catch(error) {

            throw error(error.message);

        }

    }

}