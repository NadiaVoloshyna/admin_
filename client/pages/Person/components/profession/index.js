import React from 'react';
import { func, arrayOf, shape } from 'prop-types';
import Select from 'react-select';
import Card from 'react-bootstrap/Card';
import { ProfessionType } from 'shared/prop-types';

const PersonProfession = ({ professions, onAdd, onRemove }) => {
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
  };

  return (
    <div className="persons-profession">
      <Card className="mb-3">
        <Card.Header>
          Profession
        </Card.Header>
        <Card.Body className="p-0">
          <Select
            isMulti
            isClearable={false}
            options={professions.map(item => ({ value: item, label: item.name }))}
            onChange={onChange}
            styles={{
              control: styles => ({ ...styles, border: 'none' }),
            }}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

PersonProfession.propTypes = {
  professions: arrayOf(shape(ProfessionType)),
  onAdd: func,
  onRemove: func
};

PersonProfession.defaultProps = {
  professions: [],
  onAdd: () => {},
  onRemove: () => {}
};

export default PersonProfession;
