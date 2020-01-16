import React from 'react';
import cx from 'classnames';
import { Field } from 'react-final-form';

const validate = value => (value ? undefined : 'Person\'s name is reuqired');

const PersonName = () => {
  return (
    <div className="form-group mb-4">
      <Field name="name" validate={validate}>
        {({ input, meta }) => {
          const inputClasses = cx('form-control', meta.error && meta.touched && 'is-invalid');

          return (
            <div>
              <input {...input} type="text" placeholder="Name" className={inputClasses} />
              {meta.error && meta.touched && <span className="invalid-feedback">{meta.error}</span>}
            </div>
          )
        }}
      </Field>
    </div>
  )
}

export default PersonName;
