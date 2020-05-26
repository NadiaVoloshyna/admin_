import React from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import Body from './body';

const ProfessionSection = ({ rootFolder }) => {
  return (
    <div className="profession-section">
      <FieldArray name="professions">
        {({ fields }) =>
          fields.map((name, index) => (
            <Field key={name} name={name}>
              { props => (
                <Body 
                  {...props}
                  rootFolder={rootFolder}
                />
              )}
            </Field>
            )
          )
        }
      </FieldArray>
    </div>
  )
}

export default ProfessionSection;
