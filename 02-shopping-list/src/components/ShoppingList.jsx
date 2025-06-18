import { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";

function ShoppingList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  //Función para agregar un nuevo producto a la lista
  const addProduct = () => {
    if (newProduct.trim() !== "") {
      setProducts([...products, newProduct]);
      setNewProduct("");
    }
  };

  //Función para eliminar un producto de la lista
  const deleteProduct = (item) => {
    setProducts(
      products.filter((product) => product.toLowerCase() !== item.toLowerCase())
    );
  };

  const handleKeyDown = (e) =>{
    if(e.key === "Enter"){
        addProduct();
    }
  }

  return (
    <section className="container">
      <h2>Lista de Compras</h2>

      <div className="input-container">
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-item"
          placeholder="Escribe un producto"

        />
        <button className="btn-added" onClick={addProduct}>
          Agregar
        </button>
      </div>

      <div className="list-container">
        <ul className="cnt-row">
          {products.length > 0 ? (
            products.map((item, index) => (
              <li key={index}>
                {item}
                <button className="btn-delete" onClick={() => deleteProduct(item)}><RiDeleteBin2Line /></button>
              </li>
            ))
          ) : (
            <p className="empty-message">No hay productos en la lista</p>
          )}
        </ul>
      </div>
    </section>
  );
}

export default ShoppingList;
