import React from 'react';

const BusDetail = ({ bus, onClose, onEdit }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalle del Bus <span className="highlight-text">#{bus.numeroBus}</span></h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">ID Sistema</span>
              <span className="detail-value">{bus.id}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Placa</span>
              <span className="detail-value font-mono highlight-plate">{bus.placa}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Marca</span>
              <span className="detail-value font-bold">{bus.marcaNombre}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Estado</span>
              <span className={`status-badge ${bus.activo ? 'active' : 'inactive'}`}>
                {bus.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            
            <div className="detail-item full-width">
              <span className="detail-label">Fecha de Registro</span>
              <span className="detail-value">{new Date(bus.fechaCreacion).toLocaleString()}</span>
            </div>
            
            <div className="detail-item full-width">
              <span className="detail-label">Características</span>
              <p className="detail-text">{bus.caracteristicas || 'No hay características registradas.'}</p>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          {onEdit && (
            <button className="btn-secondary" onClick={() => onEdit(bus)}>Editar Bus</button>
          )}
          <button className="btn-primary" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default BusDetail;
