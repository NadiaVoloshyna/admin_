import React from 'react';
import { string, func, oneOf, number } from 'prop-types';
import cx from 'classnames';
import { Field } from 'react-final-form';

const FIELD_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea'
};

const FormField = (props) => {
  const {
    name,
    validate,
    placeholder,
    type,
    rows
  } = props;

  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => {
        const inputClasses = cx('form-control', meta.error && meta.touched && 'is-invalid');

        return (
          <>
            { type !== FIELD_TYPES.TEXTAREA
              && (
              <input
                {...input}
                type={type}
                placeholder={placeholder}
                className={inputClasses}
              />
              )}

            { type === FIELD_TYPES.TEXTAREA
              && (
              <textarea
                {...input}
                type={type}
                placeholder={placeholder}
                className={inputClasses}
                rows={rows}
              />
              )}

            { meta.error && meta.touched
              && <span className="invalid-feedback">{meta.error}</span>}
          </>
        );
      }}
    </Field>
  );
};

FormField.propTypes = {
  name: string.isRequired,
  validate: func,
  placeholder: string,
  type: oneOf(Object.values(FIELD_TYPES)),
  rows: number
};

FormField.defaultProps = {
  validate: null,
  placeholder: '',
  type: FIELD_TYPES.TEXT,
  rows: 3
};

export default FormField;
