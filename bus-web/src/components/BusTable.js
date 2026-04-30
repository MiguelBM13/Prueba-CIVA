import React from 'react';

const BusTable = ({ buses, loading, page, totalPages, onPageChange, onRowClick }) => {
  return (
    <div className="table-container glass-panel">
      <h2 className="section-title">Listado de Buses</h2>
      
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Cargando información...</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="bus-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Número</th>
                  <th>Placa</th>
                  <th>Marca</th>
                  <th>Características</th>
                  <th>Estado</th>
                  <th>Fecha de Creación</th>
                </tr>
              </thead>
              <tbody>
                {buses.length > 0 ? (
                  buses.map((bus) => (
                    <tr key={bus.id} onClick={() => onRowClick(bus.id)} className="clickable-row">
                      <td>{bus.id}</td>
                      <td><span className="badge-numero">{bus.numeroBus}</span></td>
                      <td className="font-mono">{bus.placa}</td>
                      <td className="font-bold">{bus.marcaNombre}</td>
                      <td className="truncate-text" title={bus.caracteristicas}>
                        {bus.caracteristicas}
                      </td>
                      <td>
                        <span className={`status-badge ${bus.activo ? 'active' : 'inactive'}`}>
                          {bus.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>{new Date(bus.fechaCreacion).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-state">No hay buses registrados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button 
              className="btn-page" 
              onClick={() => onPageChange(page - 1)}
              disabled={page === 0}
            >
              Anterior
            </button>
            <span className="page-info">
              Página <span className="highlight">{page + 1}</span> de <span className="highlight">{Math.max(1, totalPages)}</span>
            </span>
            <button 
              className="btn-page" 
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages - 1}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BusTable;
