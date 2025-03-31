import { X } from 'react-feather';
import { useState } from 'react';

import Button from '../Button/Button';
import Label from '../Label/Label';
import Input from '../Input/Input';

function AddClienteForm({ onSave, onClose }) {
  const [data, setData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    endereco: '',
  });

  function handleOnChange(e, key) {
    const newValue = e.target.value;
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
