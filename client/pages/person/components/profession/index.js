import React from 'react';
import Card from 'react-bootstrap/Card';
import { Field } from 'react-final-form';

const PersonProfession = () => {
  return (
    <div className="persons-profession">
      <Card className="mb-3">
        <Card.Header>
          Profession
        </Card.Header>
        <Card.Body>
          <div className="form-group">
              <Field
                name="profession"
                className="form-control"
                component="textarea"
                validate={value => (value ? undefined : 'Required')}
              />
          </div>
        </Card.Body>
      </Card>
      <style jsx global>{`
        .persons-profession .card-body {
          padding: 0;
        }

        .persons-profession .form-group {
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default PersonProfession;
