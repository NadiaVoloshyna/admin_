import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import { Field } from 'react-final-form';

// const clear = (string) => {
//   return string.replace(/\D/g, '');
// }

// const format = (string) => {
//   return string.split('').reduce((prev, next, index) => {
//     prev = prev + next;
//     if (index === 1 || index === 3) {
//       prev = prev + '/';
//     }
//     return prev;
//   }, '');
// }

const DateInput = ({ name }) => {
  return (
    <Field name={name}>
      { props => {
        const { input } = props;

        return (
          <FormControl
            {...input}
            type="date"
            placeholder="dd/MM/yyyy"
            autoComplete="off"
          />
        ) 
      }}
    </Field>
  )
}

const PersonYears = () => {
  return (
    <Row>
      <Col>
        <div className="form-group">
          <label htmlFor="born">Born</label>
          <DateInput name="born" />
        </div>
      </Col>
      <Col>
        <div className="form-group">
          <label htmlFor="died">Died</label>
          <DateInput name="died" />
        </div>
      </Col>
    </Row>
  )
}

export default PersonYears;
