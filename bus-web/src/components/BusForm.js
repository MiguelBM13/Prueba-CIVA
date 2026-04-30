import React, { useState, useEffect } from 'react';

const BusForm = ({ onClose, onSave, getAuthHeader, initialData }) => {
  const [formData, setFormData] = useState({
    numeroBus: initialData?.numeroBus || '',
    placa: initialData?.placa || '',
    caracteristicas: initialData?.caracteristicas || '',
    marcaId: initialData?.marcaId || '', // Assuming initialData has marcaId, if not we have to match by name
    activo: initialData !== undefined ? initialData.activo : true
  });
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMarcas();
    
    // If initialData provides a marcaNombre but not marcaId, we need to map it after fetching marcas
  }, []);

  const fetchMarcas = async () => {
    try {
      const response = await fetch('http://localhost:8080/marcas', {
        headers: {
          'Authorization': getAuthHeader()
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMarcas(data);
        
        // Match marcaId if initialData has marcaNombre
        if (initialData && !initialData.marcaId && initialData.marcaNombre) {
          const foundMarca = data.find(m => m.nombre === initialData.marcaNombre);
          if (foundMarca) {
            setFormData(prev => ({ ...prev, marcaId: foundMarca.id }));
          }
        }
      }
    } catch (err) {
      console.error('Error fetching marcas:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const isEditing = !!initialData;
      const url = isEditing ? `http://localhost:8080/bus/${initialData.id}` : 'http://localhost:8080/bus';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthHeader()
        },
        body: JSON.stringify({
          ...formData,
          marcaId: Number(formData.marcaId)
        })
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || errData.message || 'Error al guardar el bus');
      }
      
      onSave(); // Refreshes list and closes modal
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialData ? 'Editar' : 'Registrar'} <span className="highlight-text">Bus</span></h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          {error && <div className="error-message" style={{marginBottom: '1rem'}}>{error}</div>}
          
          <div className="form-group">
            <label className="form-label">Número de Bus</label>
            <input
              type="text"
              name="numeroBus"
              className="form-input"
              value={formData.numeroBus}
              onChange={handleChange}
              required
              placeholder="Ej: 101"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Placa</label>
            <input
              type="text"
              name="placa"
              maxLength={6}
              className="form-input font-mono"
              value={formData.placa}
              onChange={handleChange}
              required
              placeholder="ABC-123"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Marca</label>
            <select
              name="marcaId"
              className="form-input"
              value={formData.marcaId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Seleccione una marca</option>
              {marcas.map((m) => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Características</label>
            <textarea
              name="caracteristicas"
              className="form-input"
              value={formData.caracteristicas}
              onChange={handleChange}
              rows="3"
              placeholder="Ej: 2 pisos, cama, wifi..."
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="form-label">
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
              />
              Bus Activo
            </label>
          </div>

          <div className="modal-footer" style={{borderTop: 'none', paddingBottom: 0}}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Bus'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusForm;
