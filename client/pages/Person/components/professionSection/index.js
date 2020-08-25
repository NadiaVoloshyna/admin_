import React from 'react';
import { shape } from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { AssetType } from 'shared/prop-types';
import Body from './body';

const ProfessionSection = ({ rootFolder }) => {
  return (
    <div className="profession-section">
      <FieldArray name="professions">
        {({ fields }) => fields.map((name, idx) => (
          <Field key={name} name={name}>
            { props => (
              <Body
                {...props}
                rootFolder={rootFolder}
                professionIdx={idx}
                onRemove={idx => { fields.remove(idx); }}
              />
            )}
          </Field>
        ))}
      </FieldArray>
    </div>
  );
};

ProfessionSection.propTypes = {
  rootFolder: shape(AssetType).isRequired
};

export default ProfessionSection;
