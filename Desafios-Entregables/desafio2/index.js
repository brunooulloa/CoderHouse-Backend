const fs = require('fs');

class ProductManager {
    constructor() {

        this.products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));

    }

    getProducts() {

        return this.products;

    }

    getProductById (id) {

        try {

            return this.products.filter(product => product.id === id);

        } catch (error) {

            console.log('No se encontró el producto');
            console.log(error.message);

        }
    }

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
                    fs.writeFileSync('./products.json', JSON.stringify(this.products, null, 4));
                    return 'Producto agregado correctamente';
                }

            } else {

                console.error('Hay parametros vacíos, asegurate de completar todos')
                return;

            }
        } catch (error) {

            console.log(error.message);

        }
    }

    updateProduct (id, ...[title, description, price, thumbnail, code, stock]) {
        try {

            const product = {
                id: id,
                title: title !== undefined ? title : this.products[id].title,
                description: description !== undefined ? description : this.products[id].description,
                price: price !== undefined ? price : this.products[id].price,
                thumbnail: thumbnail !== undefined ? thumbnail : this.products[id].thumbnail,
                code: code !== undefined ? code : this.products[id].code,
                stock: stock !== undefined ? stock : this.products[id].stock
            };

            this.products[id] = product;
            fs.writeFileSync('./products.json', JSON.stringify(this.products, null, 4));

            return this.products;

        } catch (error) {

            console.log(error.message);

        }
    }

    deleteProduct (id) {
        try {

            if (id < 0) {

                throw new Error('El id no puede ser negativo');

            } else if (this.getProductById(id).length === 0) {

                throw new Error('El producto no existe');

            } else {

                this.products.splice(id, 1);
                fs.writeFileSync('./products.json', JSON.stringify(this.products, null, 4));

                return 'Producto eliminado correctamente';
            }
            
        } catch (error) {

            console.log(error.message);

        }
    }
}

const pm = new ProductManager();

console.log(pm.getProducts());
console.log(pm.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25));
console.log(pm.getProducts());
console.log(pm.getProductById(0));
console.log(pm.updateProduct(0, 'producto prueba 2', undefined, undefined, undefined, undefined, undefined));
console.log(pm.deleteProduct(0));