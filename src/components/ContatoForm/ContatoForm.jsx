import { useState, useEffect } from 'react';
import { X } from 'react-feather';

import Button from '../Button/Button';
import Label from '../Label/Label';
import Input from '../Input/Input';

function ContatoForm({ contato, onSave, onDelete, onClose }) {
  const [data, setData] = useState({ ...contato });

  useEffect(() => {
    if (contato) {
      setData({ ...contato });
    }
  }, [contato]);

  function handleOnChange(e, key) {
    const newValue = e.target.value;
    setData({ ...data, [key]: newValue });
  }

  return (
    <div className="modal-container" onClick={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(data.id, data);
        }}
        onClick={(e) => e.stopPropagation()}
        className="form"
      >
        <header className="form-header">
          <h3 className="form-heading">Detalhes do Contato</h3>
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
          <Button
            onClick={() => onDelete(data.id)}
            variant="delete"
            type="button"
          >
            Excluir Contato
          </Button>
          <Button variant="add" type="submit">
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ContatoForm;
