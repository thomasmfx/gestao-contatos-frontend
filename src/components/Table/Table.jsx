import { formatarDocumento, formatarData } from '../../utils/formatData';
import './Table.css';

function Table({ data, columns, onRowClick, size = '' }) {
  return (
    <table className={`table ${size}`}>
      <thead className="thead">
        <tr className="tr">
          {columns.map((column, index) => (
            <th className="th" key={index}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="tbody">
        {data?.map((row) => (
          <tr onClick={() => onRowClick(row.id)} className="tr" key={row.id}>
            {Object.entries(row).map(([key, value]) => (
              <td className="td" key={key}>
                {key === 'cpf'
                  ? formatarDocumento(value)
                  : key === 'dataNascimento'
                    ? formatarData(value)
                    : value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
