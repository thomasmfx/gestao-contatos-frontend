import { X } from 'react-feather';
import { useState } from 'react';

import { contatoColumns } from '../../utils/tableColumns';
import Button from '../Button/Button';
import Table from '../Table/Table';
import Label from '../Label/Label';
import './ClienteForm.css';
import Input from '../Input/Input';

function ClienteForm({ cliente, contatos, onSave, onDelete, onClose }) {
  const [data, setData] = useState({ ...cliente });

  function handleOnChange(e, key) {
    const newValue = e.target.value;
    setData({ ...data, [key]: newValue });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(data.id, data);
      }}
      onClick={(e) => e.stopPropagation()}
      className="cliente-form"
    >
      <header className="cliente-form-header">
        <h3 className="form-heading">Detalhes do Cliente</h3>
        <Button variant="transparent" onClick={onClose} isSquare>
          <X />
        </Button>
      </header>
      <div className="form-row">
        <div className="form-field">
          <Label htmlFor="nome">Nome</Label>
          <Input
            onChange={(e) => handleOnChange(e, 'nome')}
            value={data.nome}
            id="nome"
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            onChange={(e) => handleOnChange(e, 'cpf')}
            value={data.cpf}
            required
            id="cpf"
          />
        </div>
        <div className="form-field">
          <Label htmlFor="data-nascimento">Data de Nascimento</Label>
          <Input
            onChange={(e) => handleOnChange(e, 'dataNascimento')}
            value={data.dataNascimento}
            id="data-nascimento"
            type="date"
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <Label htmlFor="endereco">Endereço</Label>
          <Input
            onChange={(e) => handleOnChange(e, 'endereco')}
            value={data.endereco}
            id="endereco"
          />
        </div>
      </div>
      <div className="contatos-cliente">
        <h4 className="contatos-heading">Contatos</h4>
        <Table columns={contatoColumns} data={contatos} size="small" />
      </div>
      <div className="actions">
        <Button onClick={() => onDelete(data.id)} variant="delete">
          Excluir Cliente
        </Button>
        <Button variant="add" type="submit">
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
}

export default ClienteForm;
