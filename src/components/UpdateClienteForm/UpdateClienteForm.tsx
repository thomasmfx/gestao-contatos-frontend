import { X } from 'react-feather';
import { ChangeEvent, useState } from 'react';

import Button from '../Button/Button';
import Table from '../Table/Table';
import Label from '../Label/Label';
import Input from '../Input/Input';
import FormRowLegend from '../FormRowLegend/FormRowLegend';
import { Cliente, ClienteUpdatePayload } from '../../types/cliente';
import { Contato } from '../../types/contato';
import { ID } from '../../types/id';

type UpdateClienteFormProps = {
  cliente: Cliente;
  contatos: Contato[];
  onSave: (id: ID, data: ClienteUpdatePayload) => void;
  onDelete: (id: ID) => void;
  onClose: () => void;
}

function UpdateClienteForm({ cliente, contatos, onSave, onDelete, onClose }: Readonly<UpdateClienteFormProps>) {
  const [data, setData] = useState<Cliente>({ ...cliente });

  function handleOnChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) {
    const newValue = e.target.value;
    if (key.includes('endereco')) {
      setData({...data, endereco: {...data.endereco, [key.split('.')[1].toString()]: newValue}});
      return;
    }
    setData({ ...data, [key]: newValue });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(data.id, data);
      }}
      onClick={(e) => e.stopPropagation()}
      className="form"
    >
      <header className="form-header">
        <h3 className="form-heading">Detalhes do Cliente</h3>
        <Button variant="transparent" onClick={onClose} isSquare>
          <X />
        </Button>
      </header>
      <FormRowLegend>Dados Pessoais</FormRowLegend>
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
        <FormRowLegend>Informações de endereço</FormRowLegend>
        <div className="form-row">
          <div className="form-field">
            <Label htmlFor="endereco">Rua</Label>
            <Input
              onChange={(e) => handleOnChange(e, 'endereco.rua')}
              value={data.endereco.rua}
              id="endereco"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="endereco">Numero</Label>
            <Input
              onChange={(e) => handleOnChange(e, 'endereco.numero')}
              value={data.endereco?.numero ?? ''}
              id="endereco"
            />
          </div>
        </div>
      <div className="contatos-cliente">
        <h4 className="contatos-cliente-heading">Contatos</h4>
        <Table tableType={"contato"} data={contatos} size="small" />
      </div>
      <div className="form-actions">
        <Button onClick={() => onDelete(data.id)} variant="delete small">
          Excluir
        </Button>
        <Button variant="add small" type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
}

export default UpdateClienteForm;
