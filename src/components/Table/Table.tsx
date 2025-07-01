import { formatarDocumento, formatarData } from '../../utils/formatData';
import './Table.css';
import { Cliente } from '../../types/cliente';
import { contatoColumns, clienteColumns } from '../../utils/tableColumns';
import { Contato } from '../../types/contato';
import { getEnderecoRuaAndNumero } from '../../utils/formatEndereco';

type TableProps = {
  tableType: 'cliente' | 'contato';
  data: (Cliente | Contato)[];
  onRowClick?: (id: number) => void;
  size?: string;
}

function inferClienteColumnValue(cliente: Cliente, currentKey: string, currentValue: string | number) {
  if (currentKey === 'cpf') return formatarDocumento(cliente.cpf);
  if (currentKey === 'dataNascimento') return formatarData(cliente.dataNascimento);
  if (currentKey === 'endereco' && cliente.endereco) return getEnderecoRuaAndNumero(cliente.endereco);

  return currentValue;
}

function Table({ tableType, data, onRowClick, size = '' }: Readonly<TableProps> ) {
  const columns = tableType === 'cliente' ? clienteColumns : contatoColumns;
  const isInteractive = onRowClick != null;

  return (
    <table className={`table ${size}`}>
      <thead className="thead">
        <tr className="tr">
          {columns.map((column) => (
            <th className="th" key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="tbody">
        {data?.map((row) => (
          <tr onClick={() => isInteractive && onRowClick(row.id)} className="tr" key={isInteractive ? row.id : crypto.randomUUID()} data-id={isInteractive && row.id}>
            {Object.entries(row).map(
              ([key, value]) =>
                <td className="td" key={key}>
                  {tableType === 'cliente' 
                    ? inferClienteColumnValue(row as Cliente, key, value)
                    : value // tableType === 'contato'
                  }
                </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
