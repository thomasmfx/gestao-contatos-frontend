import './Root.css';

import { useEffect, useState } from 'react';

import AddContatoForm from '../components/AddContatoForm/AddContatoForm';
import AddClienteForm from '../components/AddClienteForm/AddClienteForm';
import { clienteColumns, contatoColumns } from '../utils/tableColumns';
import ContatoForm from '../components/ContatoForm/ContatoForm';
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
    getSingleCliente,
    addCliente,
    updateCliente,
    deleteCliente,
  } = useClientes();

  const {
    contatosData,
    setContatos,
    getContatos,
    getSingleContato,
    addContato,
    updateContato,
    deleteContato,
  } = useContatos();

  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedClienteContatos, setSelectedClienteContatos] = useState(null);
  const [isAddingCliente, setIsAddingCliente] = useState(false);

  const [selectedContato, setSelectedContato] = useState(null);
  const [isAddingContato, setIsAddingContato] = useState(false);

  useEffect(() => {
    setClientes();
    setContatos();
  }, []);

  // Funções para gerenciar clientes
  function handleSelectCliente(id) {
    getSingleCliente(id).then((cliente) => {
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

  // Funções para gerenciar contatos
  function handleSelectContato(id) {
    getSingleContato(id).then((contato) => {
      setSelectedContato(contato);
    });
  }

  function handleAddContato(data) {
    addContato(data).then(() => {
      setIsAddingContato(false);
      setContatos();
    });
  }

  function handleUpdateContato(id, newData) {
    updateContato(id, newData).then(() => {
      setSelectedContato(null);
      setContatos();
    });
  }

  function handleDeleteContato(id) {
    deleteContato(id).then(() => {
      setSelectedContato(null);
      setContatos();
    });
  }

  return (
    <>
      {/* Formulários de Cliente */}
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

      {/* Formulários de Contato */}
      {selectedContato && (
        <Modal onClose={() => setSelectedContato(null)}>
          <ContatoForm
            onClose={() => setSelectedContato(null)}
            onDelete={handleDeleteContato}
            onSave={handleUpdateContato}
            contato={selectedContato}
          />
        </Modal>
      )}

      {isAddingContato && (
        <Modal onClose={() => setIsAddingContato(false)}>
          <AddContatoForm
            onClose={() => setIsAddingContato(false)}
            onSave={handleAddContato}
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
          <h2>Clientes</h2>
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
            <Button onClick={() => setIsAddingContato(true)} variant="add">
              <span>Novo contato</span>
            </Button>
          </header>
          <h2>Contatos</h2>
          <Table
            onRowClick={handleSelectContato}
            columns={contatoColumns}
            data={contatosData}
          />
        </section>
      </main>
    </>
  );
}

export default Root;
