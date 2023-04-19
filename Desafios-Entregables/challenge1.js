class productManager {
    constructor () {
        this.products = []
    }

    addProduct (title, description, price, thumbnail, code) {
        let newObj = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code
        }
        
        this.products.push(newObj);
        return this.products;
    }
    
    getProducts () {
        return this.products;
    }
    
    getProductById (code) {
        return this.products.filter(product => product.code === code);
    }
    
    updateProduct (code, title, description, price, thumbnail) {
        let product = this.products.filter(product => product.code === code)
        product.title = title
        product.description = description
        product.price = price
        product.thumbnail = thumbnail
        return product, this.products;
    }
    
    deleteProduct (code) {
        let product = this.products.filter(product => product.code === code)
        let index = this.products.indexOf(product)
        this.products.splice(index, 1)
        return this.products;
    }
}

let pm = new productManager;
pm.addProduct('Maceta', 'Maceta 50 litros', 3000, '', 'a1');
pm.addProduct('Mesa', 'Mesa de centro ratona de cafe', 50000, '', 'b2');
pm.addProduct('Sommier', 'Cama sommier', 80000, '', 'c3');
pm.addProduct('Mesa', 'Mesa de Ping Pong', 50000, '', 'd4');
console.log(pm.products);
console.log(Object.values(pm.getProducts()));
console.log(pm.getProductById('d4'));
console.log(pm.updateProduct('b2', 'Escritorio', 'Escritorio de madera', 100000, ''));
console.log(pm.getProducts());
console.log(pm.deleteProduct('d4'));