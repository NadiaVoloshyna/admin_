import React, { useState } from 'react';
import { actions } from 'pages/person/actions';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Field } from 'react-final-form';

const PersonProfession = ({ professions: selectedProfessions }) => {
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();
  let { professions = [] } = useSelector(state => state.professions);

  const selectProfession = ({ target: { value } }) => {
    if (!value) return;

    const index = professions.findIndex(p => p._id === value);
    dispatch(actions.selectProfession(professions[index]));

    if (index !== -1) professions.splice(index, 1);
    setSelected('');
  }

  const deleteProfession = (value) => {
    dispatch(actions.deleteProfession(value));
    professions = [...professions, value];
  }

  const renderListItem = () => {
    return selectedProfessions.map(profession => 
      <ListGroup.Item key={profession._id} className="d-flex justify-content-between">
        {profession.name}
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
              { professions.map((p) => <option key={p._id} value={p._id}>{p.name}</option>) }
            </Form.Control>
          </ListGroup.Item>
          { renderListItem() }
        </ListGroup>
      </Card>
    </div>
  )
}

export default PersonProfession;
