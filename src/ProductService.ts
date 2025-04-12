import ProductTypes from "./Product";

const LOCAL_STORAGE_KEY = 'products';

const ProductService = {


    getProducts: (): ProductTypes[] => {
        const productsStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        return productsStr ? JSON.parse(productsStr) : [];
    },

    addProduct: (description: string): ProductTypes => {
        const products = ProductService.getProducts();
        const newProduct: ProductTypes = {id: Date.now(),description, stock : false}

        const updateProducts = [newProduct, ...products];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateProducts));
        return newProduct;
    },


};

export default ProductService;