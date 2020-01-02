import React from 'react';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ProfessionSection = ({ professions }) => {
  const dispatch = useDispatch();

  const renderSectionItem = () => {
    return professions.map(profession => {
      return (
        <Card className="mb-3">
          <Card.Header>
            { profession.name }
            <Form.Check 
              type="switch"
              label="on"
              checked
              id={`${profession.name}-switch`}
              className="float-right"
            />
          </Card.Header>
          <Card.Body>
            <Button variant="primary">Add content</Button>
          </Card.Body>
        </Card>
      )
    });
  }

  return (
    <div className="profession-section">
      { renderSectionItem() }
    </div>
  )
}

export default ProfessionSection;
