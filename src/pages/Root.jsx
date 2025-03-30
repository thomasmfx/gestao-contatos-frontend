import './Root.css';

import { useEffect } from 'react';

import { clienteColumns, contatoColumns } from '../utils/tableColumns';
import SearchBar from '../components/SearchBar/Searchbar';
import Button from '../components/Button/Button';
import useContatos from '../hooks/useContatos';
import useClientes from '../hooks/useClientes';
import Table from '../components/Table/Table';

function Root() {
  const { clientesData, getClientes } = useClientes();
  const { contatosData, getContatos } = useContatos();

  useEffect(() => {
    getClientes();
    getContatos();
  }, []);

  return (
    <main className="main">
      <section className="section">
        <header className="header">
          <SearchBar
            placeholder="Buscar cliente por Nome ou CPF"
            inputName="buscar-cliente"
            onSearch={getClientes}
          />
          <Button variant="add">
            <span>Novo cliente</span>
          </Button>
        </header>
        <h2>Lista de clientes</h2>
        <Table columns={clienteColumns} data={clientesData} />
      </section>
      <section className="section">
        <header className="header">
          <SearchBar
            placeholder="Buscar contato por ID Cliente"
            inputName="buscar-contato"
            onSearch={getContatos}
          />
          <Button variant="add">
            <span>Novo contato</span>
          </Button>
        </header>
        <h2>Lista de contatos</h2>
        <Table columns={contatoColumns} data={contatosData} />
      </section>
    </main>
  );
}

export default Root;
