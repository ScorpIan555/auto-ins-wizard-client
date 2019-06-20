import React from 'react';

export default props => {
  let {
    handleChange,
    id,
    labelName,
    childClassName,
    parentClassName,
    value,
    createTable
  } = props;

  return (
    <div className={parentClassName}>
      <label htmlFor={id}>{labelName}</label>
      <select
        multiple
        className={childClassName}
        id={id}
        value={value}
        onChange={handleChange}
      >
        {createTable}
      </select>
    </div>
  );
};
