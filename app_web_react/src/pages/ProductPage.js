import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

export default function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => setSelectedProduct(product);
  const handleSaveComplete = () => setSelectedProduct(null);

  return (
    <div style={{ margin: "20px" }}>
      <h1>Gestión de Productos</h1>

      <ProductForm
        productToEdit={selectedProduct}
        onSaveComplete={handleSaveComplete}
      />

      <hr />

      <ProductList onEdit={handleEdit} />
    </div>
  );
}