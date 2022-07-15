import DatePicker from 'react-widgets/DatePicker';
import React from 'react';

const DateTimePicker = ({ input, label, onChange }) => (
  <div className="form-group">
    {label && <label htmlFor={label}>{label}</label>}
    <DatePicker
      inputProps={{ readOnly: true }}
      {...input}
      onChange={onChange}
      containerClassName="form-control input-sm"
    />
  </div>
);

export default DateTimePicker;
