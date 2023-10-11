import './App.css';

import {useState, useEffect} from 'react';
import { useFetch } from './hooks/UseFetch';

const urlBase = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([]);

  /** Custom **/
  const { data : items } = useFetch(urlBase);

  const [name, setName] = useState("");
  const [price, setPrice]  = useState("");

  /** Consulta Async de Lista de Produtos **/
  useEffect(() => {
    async function buscaListaProdutos() {
      const res = await fetch(urlBase)
      const data = await res.json();
      setProducts(data);
    }
    buscaListaProdutos();
  }, []);

  /** Async Adiciona Produto **/
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name, 
      price,
    };

    const res = await fetch(urlBase, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product),
    })

      /** Carregamento Dinamico **/
      const produtoAdicionado = await res.json();
     setProducts((prevProducts) => [...prevProducts, produtoAdicionado]);
     setName("");
     setPrice("");
  }




  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>{product.name} - R${product.price}</li>
        ))}
      </ul>
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
            <input type='submit' value="Criar"></input>
          </form>
      </div>
    </div>
  );
}

export default App;
