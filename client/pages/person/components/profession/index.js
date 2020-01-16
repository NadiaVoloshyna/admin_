import React from 'react';
import Select from 'react-select'
import Card from 'react-bootstrap/Card';

const PersonProfession = ({ professions = [], onAdd, onRemove }) => {

  const onChange = (value, meta) => {
    if (meta.action === 'select-option') {
      onAdd('professions', {
        profession: meta.option.value, 
        active: false,
        media: []
      });
    }

    if (meta.action === 'remove-value') {
      onRemove('professions');
    }

    if (meta.action === 'clear') {
      console.log('Delete all professions');
    }
  }

  return (
    <div className="persons-profession">
      <Card className="mb-3">
        <Card.Header>
          Profession
        </Card.Header>
        <Card.Body>
          <Select 
            isMulti
            options={professions.map(item => ({value: item, label: item.name}))} 
            onChange={onChange}
          />
        </Card.Body>
      </Card>
    </div>
  )
}

export default PersonProfession;
