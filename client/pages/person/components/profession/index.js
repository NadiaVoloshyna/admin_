import React, { useState } from 'react';
import { actions } from 'pages/person/actions';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Field } from 'react-final-form';

let defaultProfessions = ['Writer', 'Artist', 'Singer', 'Composer'];

const PersonProfession = ({ professions }) => {
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();

  const selectProfession = ({ target: { value } }) => {
    if (!value) return;

    const index = defaultProfessions.indexOf(value);
    if (index !== -1) defaultProfessions.splice(index, 1);

    dispatch(actions.selectProfession(value));
    setSelected('');
  }

  const deleteProfession = (value) => {
    dispatch(actions.deleteProfession(value));
    defaultProfessions = [...defaultProfessions, value];
  }

  const renderListItem = () => {
    return professions.map(profession => 
      <ListGroup.Item key={profession} className="d-flex justify-content-between">
        {profession}
        <span 
          onClick={() => deleteProfession(profession)}
          className="font-weight-bold" 
          aria-hidden="true"
        >&times;</span>
      </ListGroup.Item>
    );
  }

  return (
    <div className="persons-profession">
      <Card className="mb-3">
        <Card.Header>
          Profession
        </Card.Header>
        {/* <Field
          name="profession"
          className="form-control"
          component="textarea"
          validate={value => (value ? undefined : 'Required')}
        /> */}
        <ListGroup variant="flush">
          <ListGroup.Item className="p-2">
            <Form.Control 
              as="select"
              onChange={selectProfession}
              value={selected}
            >
              <option></option>
              { defaultProfessions.map((p, i) => <option key={i} value={p}>{p}</option>) }
            </Form.Control>
          </ListGroup.Item>
          { renderListItem() }
        </ListGroup>
      </Card>
    </div>
  )
}

export default PersonProfession;
