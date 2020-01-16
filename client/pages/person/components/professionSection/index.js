import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProfessionModal from '../professionModal';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

const ProfessionSection = ({ rootFolder }) => {
  const renderSectionItem = ({ input }) => {
    const { onChange, value: { profession: { name } } } = input;
    
    const onSelect = (asset => {
      onChange(asset.url);
    });

    return (
      <Card className="mb-3">
        <Card.Header>
          { name }
          <Form.Check 
            type="switch"
            label="on"
            checked
            id={`${name}-switch`}
            className="float-right"
          />
        </Card.Header>
        <Card.Body>
          <ProfessionModal rootFolder={rootFolder} />
        </Card.Body>
      </Card>
    )
  }

  return (
    <div className="profession-section">
      <FieldArray name="professions">
        {({ fields }) =>
          fields.map((name, index) => (
            <Field key={name} name={name}>
              {props => <> { renderSectionItem(props) } </>}
            </Field>
            )
          )
        }
      </FieldArray>
    </div>
  )
}

export default ProfessionSection;
