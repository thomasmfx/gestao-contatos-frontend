import { ReactNode } from 'react';

function FormRowLegend({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="form-field-legend">
      <span className="form-field-legend-text">{children}</span>
    </div>
  );
}

export default FormRowLegend;