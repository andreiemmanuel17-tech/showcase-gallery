import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import GalleryPage from "./pages/GalleryPage";
import ManagePage from "./pages/ManagePage";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("gallery");
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);

      if (!response.ok) {
        throw new Error("Could not load products.");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async (data) => {
    const isEditing = Boolean(editingProduct);

    const url = isEditing
      ? `${API_URL}/api/products/${editingProduct._id}`
      : `${API_URL}/api/products`;

    const response = await fetch(url, {
      method: isEditing ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Could not save product.");
    }

    const savedProduct = await response.json();

    if (isEditing) {
      setProducts((prev) =>
        prev.map((product) =>
          product._id === savedProduct._id
            ? savedProduct
            : product
        )
      );
    } else {
      setProducts((prev) => [savedProduct, ...prev]);
    }

    setEditingProduct(null);
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Could not delete product.");
      }

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      if (editingProduct?._id === id) {
        setEditingProduct(null);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar view={view} onChangeView={setView} />

      {view === "gallery" ? (
        <GalleryPage
          products={products}
          loading={loading}
        />
      ) : (
        <ManagePage
          products={products}
          editingProduct={editingProduct}
          onSave={saveProduct}
          onCancel={() => setEditingProduct(null)}
          onEdit={startEdit}
          onDelete={deleteProduct}
        />
      )}

      <footer className="py-10 text-center text-sm text-slate-400">
        Made by Andrei Emmanuel Daroy · INF 238
      </footer>
    </div>
  );
}

export default App;