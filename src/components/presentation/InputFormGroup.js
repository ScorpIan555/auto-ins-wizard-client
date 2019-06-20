import React from 'react';

export default props => {
  // let required = props.required ? 'required' : null;

  return (
    <div className="form-group">
      <label htmlFor={props.id}>
        {props.labelText}
        <span className="text-red">*</span>
      </label>
      <input
        className="form-control form-control-borderless form-control-lg"
        type={props.type}
        name={props.name}
        id={props.id}
        required
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};
