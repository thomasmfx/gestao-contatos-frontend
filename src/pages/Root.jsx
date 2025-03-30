import './Root.css';

import { useEffect, useState } from 'react';

import AddClienteForm from '../components/AddClienteForm/AddClienteForm';
import { clienteColumns, contatoColumns } from '../utils/tableColumns';
import ClienteForm from '../components/ClienteForm/ClienteForm';
import SearchBar from '../components/SearchBar/Searchbar';
import Button from '../components/Button/Button';
import useContatos from '../hooks/useContatos';
import useClientes from '../hooks/useClientes';
import Table from '../components/Table/Table';
import Modal from '../components/Modal/Modal';

function Root() {
  const {
    clientesData,
    setClientes,
    getCliente,
    addCliente,
    updateCliente,
    deleteCliente,
  } = useClientes();
  const { contatosData, setContatos, getContatos } = useContatos();
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedClienteContatos, setSelectedClienteContatos] = useState(null);
  const [isAddingCliente, setIsAddingCliente] = useState(false);

  useEffect(() => {
    setClientes();
    setContatos();
  }, []);

  function handleSelectCliente(id) {
    getCliente(id).then((cliente) => {
      setSelectedCliente(cliente);
    });
    getContatos(id).then((contatos) => {
      setSelectedClienteContatos(contatos);
    });
  }

  function handleAddCliente(data) {
    addCliente(data).then(() => {
      setIsAddingCliente(false);
      setClientes();
    });
  }

  function handleUpdateCliente(id, newData) {
    updateCliente(id, newData).then(() => {
      setSelectedCliente(null);
      setClientes();
      setContatos();
    });
  }

  function handleDeleteCliente(id) {
    deleteCliente(id).then(() => {
      setSelectedCliente(null);
      setClientes();
      setContatos();
    });
  }

  return (
    <>
      {selectedCliente && selectedClienteContatos ? (
        <Modal onClose={() => setSelectedCliente(null)}>
          <ClienteForm
            onClose={() => setSelectedCliente(null)}
            contatos={selectedClienteContatos}
            onDelete={handleDeleteCliente}
            onSave={handleUpdateCliente}
            cliente={selectedCliente}
          />
        </Modal>
      ) : null}

      {isAddingCliente && (
        <Modal onClose={() => setIsAddingCliente(false)}>
          <AddClienteForm
            onClose={() => setIsAddingCliente(false)}
            onSave={handleAddCliente}
          />
        </Modal>
      )}

      <main className="main">
        <section className="section">
          <header className="header">
            <SearchBar
              placeholder="Buscar cliente por Nome ou CPF"
              onSearch={setClientes}
            />
            <Button onClick={() => setIsAddingCliente(true)} variant="add">
              <span>Novo cliente</span>
            </Button>
          </header>
          <h2>Lista de clientes</h2>
          <Table
            onRowClick={handleSelectCliente}
            columns={clienteColumns}
            data={clientesData}
          />
        </section>
        <section className="section">
          <header className="header">
            <SearchBar
              placeholder="Buscar contato por ID Cliente"
              onSearch={setContatos}
            />
            <Button variant="add">
              <span>Novo contato</span>
            </Button>
          </header>
          <h2>Lista de contatos</h2>
          <Table columns={contatoColumns} data={contatosData} />
        </section>
      </main>
    </>
  );
}

export default Root;
