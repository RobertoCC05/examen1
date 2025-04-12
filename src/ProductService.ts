import ProductTypes from "./Product";

const LOCAL_STORAGE_KEY = 'products';

const getNextId = (): number => {
    const storedId = localStorage.getItem('product_id_counter');
    const nextId = storedId ? parseInt(storedId) + 1 : 1;
    localStorage.setItem('product_id_counter', nextId.toString());
    return nextId;
};
const ProductService = {


    getProducts: (): ProductTypes[] => {
        const productsStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        return productsStr ? JSON.parse(productsStr) : [];
    },

    addProduct: (description: string): ProductTypes => {
        const products = ProductService.getProducts();
        const newProduct: ProductTypes = {id: getNextId(),description, stock : false}

        const updateProducts = [newProduct, ...products];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateProducts));
        return newProduct;
    },


};

export default ProductService;