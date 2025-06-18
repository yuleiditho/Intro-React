import { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";

function ShoppingList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  //Función para agregar un nuevo producto a la lista
  const addProduct = () => {
    if (newProduct.trim() !== "") {
      setProducts([...products, { name: newProduct, checked: false }]);
      setNewProduct("");
    }
  };

  //Función para eliminar un producto de la lista
  const deleteProduct = (item) => {
    const confirmAlert = window.confirm(`¿Desea eliminar "${item.name}"?`);
    if (confirmAlert) {
      setProducts(
        products.filter(
          (product) => product.name.toLowerCase() !== item.name.toLowerCase()
        )
      );
      window.alert(`"${item.name}" fue eliminado`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addProduct();
    }
  };

  const toggleCheck = (item) => {
    setProducts(
      products.map((product) =>
        product.name === item.name
          ? { ...product, checked: !product.checked }
          : product
      )
    );
  };

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
          required
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
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item)}
                />
                <span className={item.checked ? "checked" : ""}>
                  {item.name}
                </span>

                <RiDeleteBin2Line
                  className="btn-delete"
                  onClick={() => deleteProduct(item)}
                />
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
