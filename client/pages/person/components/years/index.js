import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import { Field } from 'react-final-form';

const DateInput = ({ name, disabled }) => {
  return (
    <Field name={name}>
      { props => {
        const { input } = props;

        return (
          <FormControl
            {...input}
            disabled={disabled}
            type="date"
            placeholder="dd/MM/yyyy"
            autoComplete="off"
          />
        ) 
      }}
    </Field>
  )
}

const PersonYears = ({ canEdit }) => {
  return (
    <Row>
      <Col>
        <div className="form-group">
          <label htmlFor="born">Born</label>
          <DateInput name="born" disabled={!canEdit} />
        </div>
      </Col>
      <Col>
        <div className="form-group">
          <label htmlFor="died">Died</label>
          <DateInput name="died" disabled={!canEdit} />
        </div>
      </Col>
    </Row>
  )
}

export default PersonYears;
