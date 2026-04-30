import React, { useState, useEffect } from 'react';
import BusTable from './components/BusTable';
import BusDetail from './components/BusDetail';
import BusForm from './components/BusForm';

function App() {
  const [buses, setBuses] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [busToEdit, setBusToEdit] = useState(null);

  // Authentication logic (Basic Auth for admin/admin)
  const getAuthHeader = () => {
    return 'Basic ' + btoa('admin:admin');
  };

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

  useEffect(() => {
    fetchBuses(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleRowClick = async (id) => {
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

  const handleEditBus = (bus) => {
    setBusToEdit(bus);
    setShowForm(true);
    setSelectedBus(null); // Close detail modal
  };

  const handleOpenNewForm = () => {
    setBusToEdit(null);
    setShowForm(true);
  };

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
