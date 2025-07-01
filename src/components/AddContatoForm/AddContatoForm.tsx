import { X } from 'react-feather';
import { ChangeEvent, FormEvent, useState } from 'react';

import tiposContato from '../../utils/tiposContato';
import Select from '../Select/Select';
import Button from '../Button/Button';
import Label from '../Label/Label';
import Input from '../Input/Input';
import { ContatoPayload } from '../../types/contato';

type AddContatoFormProps = {
  onSave: (data: ContatoPayload) => void;
  onClose: () => void;
}

const contatoInitialData: ContatoPayload = {
  clienteId: '',
  tipo: 'Telefone',
  valor: '',
  observacao: '',
};

function AddContatoForm({ onSave, onClose }: Readonly<AddContatoFormProps>) {
  const [data, setData] = useState<ContatoPayload>({...contatoInitialData});

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
    const newValue = e.target.value;
    setData({ ...data, [key]: newValue });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(data);
  }

  return (
    <div className="modal-container" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="form"
      >
        <header className="form-header">
          <h3 className="form-heading">Novo Contato</h3>
          <Button variant="transparent" onClick={onClose} isSquare>
            <X />
          </Button>
        </header>
        <div className="form-row">
          <div className="form-field">
            <Label htmlFor="clienteId">ID Cliente</Label>
            <Input
              onChange={(e) => handleOnChange(e, 'clienteId')}
              value={data.clienteId as string}
              id="clienteId"
              required
            />
          </div>
          <div className="form-field">
            <Label htmlFor="tipo">Tipo</Label>
            <Select
              onChange={(e) => handleOnChange(e, 'tipo')}
              options={[...tiposContato]}
              value={data.tipo}
              id="tipo"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <Label htmlFor="valor">Valor</Label>
            <Input
              onChange={(e) => handleOnChange(e, 'valor')}
              value={data.valor}
              id="valor"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <Label htmlFor="observacao">Observação</Label>
            <Input
              onChange={(e) => handleOnChange(e, 'observacao')}
              value={data.observacao}
              id="observacao"
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

export default AddContatoForm;
