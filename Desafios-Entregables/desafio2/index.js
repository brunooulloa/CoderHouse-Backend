const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = [fs.readFileSync('./products.json', 'utf-8')];
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
                    fs.writeFileSync('./products.json', JSON.stringify(this.products, null, '\t'));
                }

            } else {

                console.error('Hay parametros vacíos, asegurate de completar todos')
                return;

            }
        } catch (error) {

            console.log(error.message);

        }

        return this.products;
    }

    updateProduct (id, title, description, price, thumbnail, code, stock) {
        try {
            const product = {
                id: id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            };

            this.products[id] = product;
            fs.writeFileSync('./products.json', JSON.stringify(this.products, null, 4));

            return this.products;
        } catch (error) {
            console.log(error.message);
        }
    }
}

const pm = new ProductManager();

console.log(pm.addProduct('Maceta 10 lts', 'Maceta de 10 lts', 100, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercadolibre.com.ar%2Fmaceta-de-plastico-50-litros%2Fp%2FMCO15890191&psig=AOvVaw0QZ2Z3Z2Z2Z2Z2Z2Z2Z2Z2&ust=1629789840000000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjQ4ZqH9vICFQAAAAAdAAAAABAD', 'MAC50', 10));