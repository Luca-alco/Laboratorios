// Importación de dependencias necesarias
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./publinueva.css";
import "./users.css";

// Componente para crear una nueva publicación de producto
function PubliNueva() {
  // Hook de navegación
  const navigate = useNavigate();
  const { currentUser, getAuthToken } = useAuth();

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    categoria: "",
    marca: "",
    talle: "",
    stock: "",
    precio: "",
    estado: "",
    imagenes: [],
    descripcion: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función para manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("");
  };

  // Función para manejar la carga de imágenes
  const handleImageChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prev) => ({
        ...prev,
        imagenes: [...(prev.imagenes || []), ...newImages], // Mantener imágenes existentes y agregar nuevas
        imagen: prev.imagen || newImages[0], // Mantener la imagen principal si existe, sino usar la primera nueva
      }));
    }
  };

  // Función para eliminar una imagen
  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, index) => index !== indexToRemove),
      imagen:
        indexToRemove === 0 && prev.imagenes.length > 1
          ? prev.imagenes[1] // Si se elimina la primera imagen y hay más, usar la segunda
          : prev.imagen, // Si no, mantener la imagen actual
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Verificar si hay un usuario autenticado
      if (!currentUser) {
        setError("Debe iniciar sesión para publicar");
        navigate("/login");
        return;
      }

      // Obtener el token de autenticación
      const token = getAuthToken();
      if (!token) {
        setError(
          "Token de autenticación no encontrado. Por favor, inicie sesión nuevamente."
        );
        navigate("/login");
        return;
      }

      // Preparar datos del nuevo producto con los campos correctos del backend
      const newProduct = {
        nombre: `${formData.marca}`,
        precio: parseFloat(formData.precio),
        descripcion: formData.descripcion,
        stock: parseInt(formData.stock),
        imagen: formData.imagenes[0] || "", // La primera imagen será la principal
        brand: formData.marca,
        marca: formData.marca,
        categoria: formData.categoria,
        talle: formData.talle,
        estado: formData.estado,
        categorias: [{ id: formData.categoria }],
        // usuario: { id: obtenerId() }, // <-- ELIMINADO, el backend lo asocia automáticamente
      };

      console.log("Enviando producto:", newProduct);

      // Enviar petición al servidor para crear el producto
      const response = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        console.log("Producto creado:", savedProduct);
        alert("Producto publicado exitosamente");
        navigate("/productos");
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);

        if (response.status === 401) {
          setError(
            "Su sesión ha expirado. Por favor, inicie sesión nuevamente."
          );
          navigate("/login");
        } else if (response.status === 403) {
          setError("No tiene permisos para crear productos.");
        } else {
          setError(`Error al guardar el producto: ${errorText}`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error de conexión. Verifique su conexión a internet.");
    } finally {
      setLoading(false);
    }
  };

  // Renderizado del componente
  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form onSubmit={handleSubmit} className="producto-form">
        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "1rem",
              padding: "0.5rem",
              border: "1px solid red",
              borderRadius: "4px",
              backgroundColor: "#ffebee",
            }}
          >
            {error}
          </div>
        )}

        {/* Sección de categoría */}
        <div className="form-section">
          <label>
            Categoría del producto:
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              className="categoria-select"
              disabled={loading}
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="1">Remera</option>
              <option value="2">Pantalón</option>
              <option value="3">Campera</option>
              <option value="4">Buzo</option>
              <option value="5">Shorts</option>
              <option value="6">Camisa</option>
            </select>
          </label>
        </div>

        {/* Sección de marca */}
        <div className="form-section">
          <label>
            Nombre:
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
              disabled={loading}
              required
              className="input-field-compact"
            />
          </label>
        </div>

        {/* Sección de talle */}
        <div className="form-section">
          <label>
            Talle:
            <select
              name="talle"
              value={formData.talle}
              onChange={handleInputChange}
              disabled={loading}
              required
              className="input-field-compact"
            >
              <option value="">Seleccione el talle</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </label>
        </div>

        {/* Sección de stock */}
        <div className="form-section">
          <label>
            Stock disponible:
            <input
              type="number"
              name="stock"
              min="1"
              value={formData.stock}
              onChange={handleInputChange}
              disabled={loading}
              required
              className="input-field-compact"
            />
          </label>
        </div>

        {/* Sección de precio */}
        <div className="form-section">
          <label>
            Precio:
            <input
              type="number"
              name="precio"
              min="0"
              step="0.01"
              value={formData.precio}
              onChange={handleInputChange}
              disabled={loading}
              required
              className="input-field-compact"
              placeholder="0.00"
            />
          </label>
        </div>

        {/* Sección de estado */}
        <div className="form-section">
          <label>
            Estado:
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              disabled={loading}
              required
              className="input-field-compact"
            >
              <option value="">Seleccione el estado</option>
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
            </select>
          </label>
        </div>

        {/* Sección de imágenes */}
        <div className="form-section">
          <label>
            Imágenes del producto:
            <input
              type="file"
              name="imagenes"
              onChange={handleImageChange}
              accept="image/*"
              required={formData.imagenes.length === 0}
              multiple
              disabled={loading}
              className="input-field-compact"
            />
          </label>
          {formData.imagenes.length > 0 && (
            <div className="preview-images">
              {formData.imagenes.map((url, index) => (
                <div key={index} className="image-preview-container">
                  <img
                    src={url}
                    alt={`Vista previa ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      margin: "5px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="remove-image-button"
                    disabled={loading}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sección de descripción */}
        <div className="form-section descripcion-container">
          <label>
            Descripción del producto:
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              className="input-descripcion"
              disabled={loading}
              required
            />
          </label>
          <button type="submit" className="checkout-button" disabled={loading}>
            {loading ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default PubliNueva;
