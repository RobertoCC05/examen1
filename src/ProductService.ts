import ProductTypes from "./Product";

const LOCAL_STORAGE_KEY = 'products';

const ProductService = {


    getProducts: (): ProductTypes[] => {
        const productsStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        return productsStr ? JSON.parse(productsStr) : [];
    },

    addProduct: (description: string): ProductTypes => {
        const products = ProductService.getProducts();
        const newProduct: ProductTypes = {id: Date.now(),description, outOfStock : false}
        const updateProducts = [newProduct, ...products];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateProducts));
        return newProduct;
    },

    deleteProduct: (id: number) => {
        const products = ProductService.getProducts();
        const updatedProducts = products.filter((product) => product.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProducts));
    },

    checkProductOutOfStock: (id: number): ProductTypes | undefined => {
        const products = ProductService.getProducts();
        const updatedProducts = products.map(product => {
          if (product.id === id) {
            return {
              ...product,
              outOfStock: !product.outOfStock,
              // Guarda la fecha y hora al marcar como completada la tares
              date: !product.outOfStock ? new Date().toISOString() : undefined  
            };
          }
          return product;
        });
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return updatedProducts.find(product => product.id === id);
    }  

};

export default ProductService;