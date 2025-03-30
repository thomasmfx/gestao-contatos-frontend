import { X } from 'react-feather';
import { useState } from 'react';

import Button from '../Button/Button';
import Label from '../Label/Label';
import Input from '../Input/Input';

function AddContatoForm({ onSave, onClose }) {
  const [data, setData] = useState({
    tipo: '',
    clienteId: '',
    valor: '',
    observacao: '',
  });

  function handleOnChange(e, key) {
    const newValue = e.target.value;
    setData({ ...data, [key]: newValue });
  }

  function handleSubmit(e) {
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
              value={data.clienteId}
              id="clienteId"
              required
            />
          </div>
          <div className="form-field">
            <Label htmlFor="tipo">Tipo</Label>
            <Input
              onChange={(e) => handleOnChange(e, 'tipo')}
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
            Adicionar Contato
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddContatoForm;
