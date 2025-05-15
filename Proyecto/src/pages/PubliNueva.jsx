// Importación de dependencias necesarias
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PubliNueva.css";
import "./Users.css";

// Componente para crear una nueva publicación de producto
function PubliNueva() {
  // Hook de navegación
  const navigate = useNavigate();
  
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    categoria: '',
    marca: '',
    talle: '',
    stock: '',
    precio: '',
    estado: '',
    imagenes: [],
    descripcion: ''
  });

  // Función para manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para manejar la carga de imágenes
  const handleImageChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        imagenes: [...(prev.imagenes || []), ...newImages], // Mantener imágenes existentes y agregar nuevas
        imagen: prev.imagen || newImages[0] // Mantener la imagen principal si existe, sino usar la primera nueva
      }));
    }
  };

  // Función para eliminar una imagen
  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, index) => index !== indexToRemove),
      imagen: indexToRemove === 0 && prev.imagenes.length > 1 ? 
        prev.imagenes[1] : // Si se elimina la primera imagen y hay más, usar la segunda
        prev.imagen // Si no, mantener la imagen actual
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Verificar si hay un usuario autenticado
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        alert('Debe iniciar sesión para publicar');
        navigate('/login');
        return;
      }

      // Preparar datos del nuevo producto
      const newProduct = {
        id: Date.now().toString(),
        categoria: formData.categoria,
        marca: formData.marca,
        talle: formData.talle,
        stock: parseInt(formData.stock),
        estado: formData.estado,
        imagenes: formData.imagenes,
        imagen: formData.imagenes[0], // La primera imagen será la principal
        descripcion: formData.descripcion,
        userId: currentUser.id,
        price: parseFloat(formData.precio),
        brand: formData.marca,
        name: `${formData.marca} ${formData.categoria}`,
        category: formData.categoria
      };

      // Enviar petición al servidor para crear el producto
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        throw new Error('Error al guardar el producto');
      }

      alert('Producto publicado exitosamente');
      navigate('/productos');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al publicar el producto');
    }
  };

  // Renderizado del componente
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <form onSubmit={handleSubmit} className="producto-form">
        {/* Sección de categoría */}
        <div className="form-section">
          <label>
            Categoría del producto:
            <select 
              name="categoria" 
              value={formData.categoria}
              onChange={handleInputChange}
              className="categoria-select"
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="Remera">Remera</option>
              <option value="Pantalón">Pantalón</option>
              <option value="Campera">Campera</option>
              <option value="Bermuda">Bermuda</option>
              <option value="Camisa">Camisa</option>
              <option value="Buzo">Buzo</option>
              <option value="Shorts">Shorts</option>
            </select>
          </label>
        </div>

        {/* Sección de marca */}
        <div className="form-section">
          <label>
            Marca:
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
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
                    style={{width: '100px', height: '100px', objectFit: 'cover', margin: '5px'}}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="remove-image-button"
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
              required
            />
          </label>
          <button 
            type="submit" 
            className="checkout-button"
          >
            Publicar
          </button>
        </div>
      </form>
    </main>
  );
}

export default PubliNueva;



