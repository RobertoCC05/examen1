import {useState} from "react";
import ProductTypes  from "./Product";
import ProductService from "./ProductService";

//Se pasan products y setProducts como props al componente ProductList
const ProductList = ({ products, setProducts }
  :
  { //Explicación de los props
    //products Arreglo de items que se va a mostrar en la lista.
    products: ProductTypes[], 
    //setProducts: Función para actualizar el estado de las items.
    // Se utiliza para agregar, eliminar o editar items.
    setProducts: React.Dispatch<React.SetStateAction<ProductTypes[]>> 
  }) =>{
    const [editingProductId, setEditProductId] = useState<number | null>(null);
    const [editedProductDescription, setEditedDescription] = useState<string>("")

    // Elimina una item, utilizando el servicio para borrar de localStorage.
    const handleDeleteProduct = (id: number) => {
      ProductService.deleteProduct(id);
      const updatedProducts = ProductService.getProducts();
      setProducts(updatedProducts);
    };

    const handleChecked = (id: number) => {  // Cambia el estado de completado de una item
      const updatedProduct = ProductService.checkProductOutOfStock(id); 
      if (updatedProduct) {
        setProducts((prev) => // actualiza la lista de items
          prev.map((product) => (product.id === id ? updatedProduct : product)) // Reemplaza la item editada por la actualizada
        );
      }
    };

    const sortedProducts = [...products].sort((a, b) => Number(a.outOfStock) - Number(b.outOfStock)); // Ordena los productos por estado de completado
    
    return (
        <div className="product-list-container">
          <h2>Inventory</h2>
          
          {products.length === 0 ? (
            <p>The Inventory is empty .</p>
          ) : (
            <ul className="product-list">
              {sortedProducts.map((product) => (
                <li key={product.id} className="product-item">
                  <input
                    type="checkbox"
                    checked={product.outOfStock}
                    onClick={() => handleChecked(product.id)}
                  />
                  <span style={{color:'grey'}}>Mark product out of Stock</span>                 
                  
                  {editingProductId === product.id ? (
                    <div className="edit-mode">
                      <input
                        type="text"
                        value={editedProductDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="edit-input"
                      />
                      <div className="edit-buttons">
                        <button >Guardar</button>
                        
                      </div>
                    </div>
                  ) : (
                      <div className="view-mode">
                        <span
                          className="product-description"
                          style={{
                            color: product.outOfStock ? 'red' : 'white',
                            textDecoration: product.outOfStock ? 'line-through' : 'none'
                          }}
                        >
                          {product.description}
                        </span>

                        {product.outOfStock && product.date && (
                          <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
                            Out of stock the date: {new Date(product.date).toLocaleString('es-CR')}
                          </div>
                        )}
                        <button
                          className="edit-button"
                        >
                          Editar
                        </button>
                      </div>
                  )}
                  <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{marginLeft: '10px', color: 'white', backgroundColor: 'red', border: 'none', padding: '10px', borderRadius: '5px'}}>
                  Eliminar
                </button>
                
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    };

export default ProductList;




/**  // Guarda los cambios de la item editada.
    const handleEditSave = (id:number) =>{
  // Si la descripción editada no está vacía, guarda los cambios.
   if(editedProductDescription.trim() !== ''){
       const updateProduct = ProductService.updateProduct({id,description:editedProductDescription,completed:false});
       //Se actualiza la lista de items, reemplanzado la editada
       setProducts((prevProducts) => prevProducts.map((product) => (product.id == id? updateProduct: product)));
       //Se cancela la edicion luego de guardar
       setEditProductId(null);
       setEditedDescription("");
   }
}
     
    
    
    <button  >Guardar</button>
    //onClick={() =>handleEditSave(product.id)}>
    //Inicia la edición de una item, estableciendo el ID y la descripción que se van a editar.
    const handleEditStart = (id:number, description:string) =>{
        setEditProductId(id);
        setEditedDescription(description);
    }
     // Cancela la edición, reseteando el estado
    const handleEditCancel =() =>{
        setEditProductId(null);
        setEditedDescription("");
    }


     */