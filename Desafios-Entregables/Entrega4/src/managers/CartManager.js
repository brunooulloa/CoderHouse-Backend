import fs from 'fs';
import { default as pathc } from 'path';
import { __dirname } from '../utils.js';
import { v4 as uuidv4 } from 'uuid';

export class CartManager {

    constructor(path) {

        this.path = pathc.join(__dirname, 'src', path);
        this.loadCarts().then(() => console.log('Carts loaded.'));

    }

    existsFile() {

        return fs.existsSync(this.path);

    }

    async saveCarts() {

        try {

            const data = JSON.stringify(this.carts, null, 4);
            await fs.promises.writeFile(this.path, data);
            return 'Archivo de carritos guardado.';

        } catch(error) {

            throw new Error('No se pudo guardar el archivo de carritos.');
          
        }

    }

    async save() {

        try {

            if (this.existsFile()) {

                const newCart = {

                    id: this.generateId(),
                    products: []

                }

                this.carts.push(newCart);
                await this.saveCarts();
                return 'Archivo de carritos guardado.';
            } else {

                this.carts = [];
                await this.saveCarts();
                throw new Error('No se encontro el archivo de carritos, se guardara un arreglo vacío.');

            }

        } catch(error) {

            throw new Error('No se pudo guardar el archivo de carritos.');
          
        }

    }

    generateId() {

        return uuidv4();

    }

    async loadCarts() {

        try {

            if (this.existsFile()) {

                let data = await fs.promises.readFile(this.path, 'utf-8');
                this.carts = JSON.parse(data);
                return this.carts;

            } else {

                this.carts = [];
                throw new Error('No se encontro el archivo de carritos, se cargará un arreglo vacío.');

            }
            

        } catch(error) {

            throw new Error('No se pudo leer el archivo de carritos, se cargará un arreglo vacío.');

        }

    }

    getCarts() {

        return this.carts;

    }

    async getCartById(id) {

        try {

            await this.loadCarts();
            let cart = this.carts.find((cart) => cart.id == id);

            if (!cart) {

                console.error('Carrito no encontrado');
                return;

            }

            return cart;

        } catch(error) {

            throw new Error(error.message);

        }

    }

    async addCart(cart) {

        try {
        
            if (!cart || !cart.products) {

                throw new Error('Fields validation failed!');

            }
        
            const newCart = { id: this.generateId, ... cart };
            this.carts.push(newCart);
            await this.saveCarts();
            console.log('Carrito agregado:', newCart);
        
        } catch(error) {
            
            throw new Error(error.message);
        
        }

    }

    async updateCart(cid, pid) {

        try {

            let cart = await this.getCartById(cid);
            if (!cart) return;

            Object.keys(updatedFields).forEach((key) => {

                cart[key] = updatedFields[key];

            });

            await this.saveCarts();
            console.log('Carrito actualizado:', cart);
        
        } catch(error) {

            throw new Error(error.message);

        }

    }

    async deleteProduct(id) {

        try {

            let index = this.carts.findIndex((cart) => cart.id === id);
            if (index === -1) return;

            this.carts.splice(index, 1);
            await this.saveCarts();
            console.log(`Carrito con ID ${id} ha sido eliminado.`);

        } catch(error) {

            throw new Error(error.message);

        }

    }

}