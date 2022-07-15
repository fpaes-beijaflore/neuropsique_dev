import React from 'react';

const Input = ({ input, type, label, className, id, ...others }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} {...input} id={id} className="form-control input-sm" {...others} />
    </div>
  );
};

export default Input;
