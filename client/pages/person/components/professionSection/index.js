import React from 'react';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//import MediaGallery from '';

const professionContentConfig = {
  'Writer': {
    title: 'Nothing here yet',
    text: 'You can open the media library and choose content for this author',
    buttonText: 'Add content',
    buttonLink: ''
  }
}

const ProfessionSection = ({ professions }) => {
  const dispatch = useDispatch();

  const renderSectionItem = () => {
    return professions.map(profession => {
      const content = professionContentConfig[profession];

      return (
        <Card className="mb-3">
          <Card.Header>
            { profession }
            <Form.Check 
              type="switch"
              label="on"
              checked
              id={`${profession}-switch`}
              className="float-right"
            />
          </Card.Header>
          <Card.Body>
            <Card.Title>{content.title}</Card.Title>
            <Card.Text>{content.text}</Card.Text>
            <Button variant="primary">{content.buttonText}</Button>
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
