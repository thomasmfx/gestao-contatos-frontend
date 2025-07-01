import React from 'react';
import './Label.css';

type LabelProps = {
  children: React.ReactNode;
  htmlFor: string;
}

function Label({ children, htmlFor }: Readonly<LabelProps> ) {
  return (
    <label htmlFor={htmlFor} className="label">
      {children}
    </label>
  );
}

export default Label;
