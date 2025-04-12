import { useState, useEffect } from 'react'
import ProductList from './ProductList'
import ProductTypes from './Product'
import ProductService from './ProductService'
import './App.css'

function App() {
  const [productDescription, setProductDescription] = useState('')
  const [productsList, setProductList] = useState<ProductTypes[]>([])
    // Cargar products existentes
    useEffect(() => {
      const savedProducts = ProductService.getProducts()
      setProductList(savedProducts)
    }, [])
  
    const handleChange = (e: any) => {
      setProductDescription(e.target.value)  
    }
  
    // Agregar nueva tarea
    const handleClick = () => {
      if (productDescription.trim() === '') return;
  
      const newProduct = ProductService.addProduct(productDescription);
      // Actualizar el estado con la nueva tarea
      setProductList((prevProducts) => [newProduct, ...prevProducts]);
      setProductDescription('');
    };
    
  return (
    <>
    <div style={{border: '1px solid grey', padding: '20px'}}>
        
        <div>
          <input 
            type="text" 
            placeholder="Enter your task" 
            onChange={handleChange}
            value={productDescription} 
            style={{padding: '10px', width: '300px', marginRight: '10px'}}
          />
          <button onClick={handleClick}>Add product</button>
        </div>
        <br />
        <ProductList products={productsList} setProducts={setProductList}/>
    </div>
    
    </>
  )
}

export default App
