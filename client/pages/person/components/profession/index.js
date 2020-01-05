import React, { useState } from 'react';
import Select from 'react-select'
import { actions } from 'pages/person/actions';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Field } from 'react-final-form';

const PersonProfession = ({ professions: selectedProfessions }) => {
  const dispatch = useDispatch();
  let { professions = [] } = useSelector(state => state.professions);

  const onChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'select-option') {
      dispatch(actions.selectProfession(actionMeta.option.value));
    }

    if (actionMeta.action === 'remove-value') {
      dispatch(actions.deleteProfession(actionMeta.removedValue.value));
    }

    if (actionMeta.action === 'clear') {
      console.log('Delete all professions');
    }

    console.log(newValue);
    console.log(actionMeta);
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
