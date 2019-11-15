import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field } from 'react-final-form';

const PersonYears = () => {
  return (
    <Row>
      <Col>
        <div className="form-group">
          <Field
            name="born"
            className="form-control"
            component="input"
            type="number"
          />
        </div>
      </Col>
      <Col>
        <div className="form-group">
          <Field
            name="died"
            className="form-control"
            component="input"
            type="number"
          />
        </div>
      </Col>
    </Row>
  )
}

export default PersonYears;
