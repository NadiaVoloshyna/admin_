import React from 'react';
import { Field } from 'react-final-form';

const PersonsName = () => {
  return (
    <div className="form-group">
        <Field
          name="name"
          className="form-control"
          component="input"
          type="text"
          placeholder="Name"
          validate={value => (value ? undefined : 'Required')}
        />
    </div>
  )
}

export default PersonsName;
