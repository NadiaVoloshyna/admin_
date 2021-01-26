import React from 'react';
import { bool, string, shape, object } from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import { Field } from 'react-final-form';

const DateInput = ({ name, disabled, date }) => {
  let formattedDate;

  if (date) {
    formattedDate = date.slice(0, 10);
  }

  return (
    <Field name={name}>
      { props => {
        const { input } = props;

        return (
          <FormControl
            {...input}
            disabled={disabled}
            type="date"
            value={!input.value ? formattedDate : input.value }
            placeholder="dd/MM/yyyy"
            autoComplete="off"
          />
        );
      }}
    </Field>
  );
};

DateInput.propTypes = {
  name: string.isRequired,
  disabled: bool,
  input: shape(object).isRequired,
  date: string,
};

DateInput.defaultProps = {
  disabled: false,
  date: string,
};

const PersonYears = ({ canEdit, born, died }) => {
  return (
    <Row>
      <Col>
        <div className="form-group">
          <label htmlFor="born">Born</label>
          <DateInput
            name="born"
            disabled={!canEdit}
            date={born}
          />
        </div>
      </Col>
      <Col>
        <div className="form-group">
          <label htmlFor="died">Died</label>
          <DateInput
            name="died"
            disabled={!canEdit}
            date={died}
          />
        </div>
      </Col>
    </Row>
  );
};

PersonYears.propTypes = {
  canEdit: bool.isRequired,
  born: string,
  died: string,
};

PersonYears.defaultProps = {
  born: '',
  died: '',
};

export default PersonYears;
