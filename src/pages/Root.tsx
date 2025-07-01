import './Root.css';

import { useEffect, useState } from 'react';

import AddContatoForm from '../components/AddContatoForm/AddContatoForm';
import AddClienteForm from '../components/AddClienteForm/AddClienteForm';
import UpdateContatoForm from '../components/UpdateContatoForm/UpdateContatoForm';
import UpdateClienteForm from '../components/UpdateClienteForm/UpdateClienteForm';
import SearchBar from '../components/SearchBar/Searchbar';
import Button from '../components/Button/Button';
import useContatos from '../hooks/useContatos';
import useClientes from '../hooks/useClientes';
import Table from '../components/Table/Table';
import Modal from '../components/Modal/Modal';
import { Cliente, ClientePayload, ClienteUpdatePayload } from '../types/cliente';
import { Contato, ContatoPayload, ContatoUpdatePayload } from '../types/contato';
import { ID } from '../types/id';

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

  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [selectedClienteContatos, setSelectedClienteContatos] = useState<Contato[] | null>(null);
  const [isAddingCliente, setIsAddingCliente] = useState<boolean>(false);

  const [selectedContato, setSelectedContato] = useState<Contato | null>(null);
  const [isAddingContato, setIsAddingContato] = useState<boolean>(false);

  useEffect(() => {
    setClientes();
    setContatos();
  }, []);

  // Funções para gerenciar clientes
  function handleSelectCliente(id: ID | string) {
    getSingleCliente(id).then((cliente) => {
      setSelectedCliente(cliente);
    });
    getContatos(id).then((contatos) => {
      setSelectedClienteContatos(contatos);
    });
  }

  function handleAddCliente(data: ClientePayload) {
    addCliente(data).then(() => {
      setIsAddingCliente(false);
      setClientes();
    });
  }

  function handleUpdateCliente(id: ID, newData: ClienteUpdatePayload) {
    updateCliente(newData, id).then(() => {
      setSelectedCliente(null);
      setClientes();
      setContatos();
    });
  }

  function handleDeleteCliente(id: ID) {
    deleteCliente(id).then(() => {
      setSelectedCliente(null);
      setClientes();
      setContatos();
    });
  }

  // Funções para gerenciar contatos
  function handleSelectContato(id: ID) {
    getSingleContato(id).then((contato) => {
      setSelectedContato(contato);
    });
  }

  function handleAddContato(data: ContatoPayload) {
    addContato(data).then(() => {
      setIsAddingContato(false);
      setContatos();
    });
  }

  function handleUpdateContato(id: ID, newData: ContatoUpdatePayload) {
    updateContato(id, newData).then(() => {
      setSelectedContato(null);
      setContatos();
    });
  }

  function handleDeleteContato(id: ID) {
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
          <UpdateClienteForm
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
          <UpdateContatoForm
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
            tableType='cliente'
            onRowClick={handleSelectCliente}
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
            tableType='contato'
            onRowClick={handleSelectContato}
            data={contatosData}
          />
        </section>
      </main>
    </>
  );
}

export default Root;
