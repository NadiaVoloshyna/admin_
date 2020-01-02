import React from 'react';
import DatePicker from 'react-datepicker';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import format from 'date-fns/format'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from 'react-final-form';

import "react-datepicker/dist/react-datepicker.css";

const customInput = ({name, value}) => {
  const formattedDate = value ? format(new Date(value), 'dd/MM/yyyy') : '';

  return (
    <InputGroup>
      <FormControl 
        type="text" 
        name={name} 
        value={formattedDate}
        autoComplete="off"
      />
      <InputGroup.Append>
        <InputGroup.Text>
          <FontAwesomeIcon icon='calendar-alt' />
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  )
}

const PersonYears = () => {
  return (
    <Row>
      <Col>
        <div className="form-group">
          <label htmlFor="born">Born</label>
          <Field name="born">
            {props => (
              <DatePicker
                selected={props.input.value}
                onChange={(value) => props.input.onChange(value)}
                customInput={ customInput(props.input) }
                disabledKeyboardNavigation
              />
            )}
          </Field>
        </div>
      </Col>
      <Col>
        <div className="form-group">
          <label htmlFor="died">Died</label>
          <Field name="died">
            {props => (
              <DatePicker
                selected={props.input.value}
                onChange={(value) => props.input.onChange(value)}
                customInput={ customInput(props.input) }
              />
            )}
          </Field>
        </div>
      </Col>
    </Row>
  )
}

export default PersonYears;
