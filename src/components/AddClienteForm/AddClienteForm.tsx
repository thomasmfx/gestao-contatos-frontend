import { X } from 'react-feather';
import { ChangeEvent, useState } from 'react';

import Button from '../Button/Button';
import Label from '../Label/Label';
import Input from '../Input/Input';
import { ClientePayload } from '../../types/cliente';
import FormRowLegend from '../FormRowLegend/FormRowLegend';

type AddClienteFormProps = {
  onSave: (data: ClientePayload) => void;
  onClose: () => void;
}

const clienteInitialData: ClientePayload = {
  nome: '',
  cpf: '',
  dataNascimento: '',
  endereco: {
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    cep: '',
  },
};

function AddClienteForm({ onSave, onClose }: Readonly<AddClienteFormProps>) {
  const [data, setData] = useState<ClientePayload>({...clienteInitialData});

  function handleOnChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) {
    const newValue = e.target.value;
    if (key.includes('endereco')) {
      setData({...data, endereco: {...data.endereco, [key.split('.')[1].toString()]: newValue}});
      return;
    }
    setData({ ...data, [key]: newValue });
  }

  return (
    <div className="modal-container" onClick={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(data);
        }}
        onClick={(e) => e.stopPropagation()}
        className="form"
      >
        <header className="form-header">
          <h3 className="form-heading">Novo Cliente</h3>
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
              value={data.endereco.numero!}
              id="endereco"
            />
          </div>
        </div>
        <div className="form-actions">
          <Button onClick={onClose} variant="delete">
            Cancelar
          </Button>
          <Button variant="add" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddClienteForm;
