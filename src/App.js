import './App.css';

import {useState, useEffect} from 'react';
import { useFetch } from './hooks/UseFetch';

const urlBase = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice]  = useState("");
  const { data : items, httpConfig, loading } = useFetch(urlBase);


  /** Async Adiciona Produto **/
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name, 
      price,
    };

    httpConfig(product, "POST");

     setName("");
     setPrice("");
  }

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {loading && <p>Carregando dados...</p>}
      {!loading && (
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>{product.name} - R${product.price}</li>
        ))}
      </ul>
      )}
      <div className='add-product'>
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input value={name} name='name' type='text' onChange={(e) => setName(e.target.value)}></input>
            </label>
            <label>
              Preço:
              <input value={price} name='price' type='number' onChange={(e) => setPrice(e.target.value)}></input>
            </label>
            {loading && <input type='submit' disabled value="Aguarde"></input>}
            {!loading && <input type='submit' value="Criar"></input>}
          </form>
      </div>
    </div>
  );
}

export default App;
