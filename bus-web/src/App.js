import React, { useState, useEffect } from 'react';
import BusTable from './components/BusTable';
import BusDetail from './components/BusDetail';
import BusForm from './components/BusForm';

/**
 * Componente principal de la aplicación.
 * Gestiona el estado global de la vista de buses, la paginación y los modales (Formulario y Detalle).
 */
function App() {
  // Estados para la lista de buses y la paginación
  const [buses, setBuses] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // Estados de carga y error global
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para la gestión de modales (Detalle y Formulario)
  const [selectedBus, setSelectedBus] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [busToEdit, setBusToEdit] = useState(null);
  
  // Estado para la barra de búsqueda por ID
  const [searchId, setSearchId] = useState('');

  // Authentication logic (Basic Auth for admin/admin)
  // En un entorno real, aquí se obtendría el JWT desde el localStorage.
  const getAuthHeader = () => {
    return 'Basic ' + btoa('admin:admin');
  };

  /**
   * Consume la API para obtener la lista paginada de buses.
   * @param {number} pageNumber - El número de página a solicitar (0-indexed).
   */
  const fetchBuses = async (pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/bus?page=${pageNumber}&size=5`, {
        headers: {
          'Authorization': getAuthHeader()
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener la lista de buses');
      }
      const data = await response.json();
      setBuses(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Efecto que re-ejecuta la búsqueda de buses cada vez que cambia la página actual.
  useEffect(() => {
    fetchBuses(page);
  }, [page]);

  /**
   * Maneja el cambio de página desde el componente BusTable.
   */
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  /**
   * Obtiene el detalle completo de un bus al hacer clic en una fila.
   * Muestra un modal de detalle al finalizar.
   */
  const handleRowClick = async (id) => {
    if (!id) return;
    setDetailLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/bus/${id}`, {
        headers: {
          'Authorization': getAuthHeader()
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener el detalle del bus');
      }
      const data = await response.json();
      setSelectedBus(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setSelectedBus(null);
  };

  /**
   * Abre el formulario en modo "Edición" cargando los datos del bus seleccionado.
   */
  const handleEditBus = (bus) => {
    setBusToEdit(bus);
    setShowForm(true);
    setSelectedBus(null); // Close detail modal
  };

  /**
   * Abre el formulario en modo "Creación" con los campos vacíos.
   */
  const handleOpenNewForm = () => {
    setBusToEdit(null);
    setShowForm(true);
  };

  /**
   * Callback ejecutado cuando el formulario guarda exitosamente un bus.
   * Cierra el modal y refresca la lista de buses en la página actual.
   */
  const handleSaveBus = () => {
    setShowForm(false);
    setBusToEdit(null);
    fetchBuses(page); // Refresh current page
  };

  return (
    <div className="app-container">
      <header className="app-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Gestión de Flota - CIVA</h1>
        <button className="btn-primary" onClick={handleOpenNewForm}>+ Nuevo Bus</button>
      </header>

      <main className="app-content">
        {error && <div className="error-message">{error}</div>}

        <div className="search-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          <input 
            type="number" 
            className="form-input" 
            placeholder="Buscar bus por ID..." 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
          <button 
            className="btn-secondary" 
            onClick={() => { handleRowClick(searchId); setSearchId(''); }}
            disabled={!searchId}
          >
            Buscar
          </button>
        </div>

        <BusTable 
          buses={buses} 
          loading={loading} 
          page={page} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
          onRowClick={handleRowClick} 
        />

        {selectedBus && (
          <BusDetail bus={selectedBus} onClose={closeDetail} onEdit={handleEditBus} />
        )}

        {showForm && (
          <BusForm 
            onClose={() => {setShowForm(false); setBusToEdit(null);}} 
            onSave={handleSaveBus} 
            getAuthHeader={getAuthHeader} 
            initialData={busToEdit}
          />
        )}
        
        {detailLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
