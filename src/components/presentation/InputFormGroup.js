import React from 'react';

export default props => {
  // let required = props.required ? 'required' : null;

  return (
    <div className="form-group">
      <input
        className="form-control form-control-borderless form-control-lg"
        type={props.type}
        name={props.name}
        placeholder={props.labelText}
        id={props.id}
        required
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};
