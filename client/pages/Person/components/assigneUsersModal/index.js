import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const AssigneUsersModal = ({ role, as, onUsersGet, users = [], setPermission }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ selected, setSelected ] = useState([]);

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const getUsers = () => {
    onUsersGet(role);
  };

  const assignUsers = () => {
    toggleIsOpen();
    setPermission(selected);
  };

  const onUserSelect = ({ _id }) => {
    const selectedUser = users.find(item => item._id === _id);
    setSelected([...selected, selectedUser]);
  };

  return (
    <>
      { as
        && (
        <div onClick={toggleIsOpen}>
          { as }
        </div>
        )}

      { !as
        && (
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={toggleIsOpen}
        >
          Assign { role }
        </Button>
        )}

      <Modal
        show={isOpen}
        onHide={toggleIsOpen}
        onEntering={getUsers}
        size="lg"
      >
        <Modal.Body>
          <ListGroup>
            { users.map(item => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col> { item.fullName } </Col>
                  <Col className="text-right">
                    <Form.Check
                      type="checkbox"
                      id={`checkbox-${item._id}`}
                      onChange={() => onUserSelect(item)}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
            )) }
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={assignUsers}
          >Assign</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssigneUsersModal;
