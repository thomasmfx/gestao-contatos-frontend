import './Table.css';

function Table({ data, columns }) {
  return (
    <table className="table">
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
          <tr className="tr" key={row.id}>
            {Object.entries(row).map(([key, value]) => (
              <td className="td" key={key}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
