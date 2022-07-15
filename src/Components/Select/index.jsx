import React from "react";

const Select = ({
  input,
  id,
  data,
  label,
  text,
  textKey,
  valueKey,
  required,
  disabled,
  placeholder,
  ...others
}) => {
  return (
    <div className="form-group">
      {(label || text) && <label htmlFor={id}>{label || text}</label>}
      <select
        {...input}
        id={id}
        className="form-control input-sm"
        disabled={disabled}
        {...others}
      >
        <option hidden={required}>{placeholder}</option>
        {data.map((el, idx) => (
          <option key={idx} value={el[valueKey]}>
            {el[textKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.defaultProps = {
  data: [],
  textKey: "text",
  valueKey: "value",
  disabled: false,
  required: false,
  placeholder: "Selecione"
};

export default Select;
