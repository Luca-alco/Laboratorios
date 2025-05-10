import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PubliNueva.css";
import "./users.css";

function PubliNueva() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    categoria: '',
    marca: '',
    talle: '',
    stock: '',
    estado: '',
    imagen: null,
    descripcion: ''
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (value) {
      switch (name) {
        case 'categoria':
          setStep(Math.max(step, 2));
          break;
        case 'marca':
          setStep(Math.max(step, 3));
          break;
        case 'talle':
          setStep(Math.max(step, 4));
          break;
        case 'stock':
          setStep(Math.max(step, 5));
          break;
        case 'estado':
          setStep(Math.max(step, 6));
          break;
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        imagen: e.target.files[0]
      }));
      setStep(Math.max(step, 7));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Obtener el usuario actual
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        alert('Debe iniciar sesión para publicar');
        navigate('/login');
        return;
      }

      // Crear el objeto del producto
      const newProduct = {
        id: Date.now().toString(), // ID único
        categoria: formData.categoria,
        marca: formData.marca,
        talle: formData.talle,
        stock: formData.stock,
        estado: formData.estado,
        imagen: formData.imagen ? URL.createObjectURL(formData.imagen) : null,
        descripcion: formData.descripcion,
        userId: currentUser.id,
        price: 0, // Puedes agregar el precio si lo necesitas
        brand: formData.marca,
        name: `${formData.marca} ${formData.categoria}`,
        category: formData.categoria
      };

      // Guardar en el servidor json-server
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

  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <form onSubmit={handleSubmit} className="producto-form">
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

        {step >= 2 && (
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
        )}

        {step >= 3 && (
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
        )}

        {step >= 4 && (
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
        )}

        {step >= 5 && (
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
        )}

        {step >= 6 && (
          <div className="form-section">
            <label>
              Imagen del producto:
              <input
                type="file"
                name="imagen"
                onChange={handleImageChange}
                accept="image/*"
                required
                className="input-field-compact"
              />
            </label>
          </div>
        )}

        {step >= 7 && (
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
              disabled={!formData.descripcion}
            >
              Publicar
            </button>
          </div>
        )}
      </form>
    </main>
  );
}

export default PubliNueva;



