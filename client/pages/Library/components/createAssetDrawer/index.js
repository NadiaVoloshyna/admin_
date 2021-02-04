import React, { useState, useRef } from 'react';
import { func } from 'prop-types';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import BootstrapForm from 'react-bootstrap/Form';
import { Form, Field } from 'react-final-form';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import { ERROR_MESSAGES } from 'shared/constants';
import { ASSET_TYPES } from 'common/constants';
import Drawer from 'shared/components/drawer';
import Dropzone from 'shared/components/dropzone';

const TYPES_CONFIG = {
  [ASSET_TYPES.ALBUM]: [{
    type: 'text',
    name: 'author',
    placeholder: 'Author',
  }, {
    type: 'text',
    name: 'name',
    placeholder: 'Name',
  }, {
    type: 'text',
    name: 'year',
    placeholder: 'Year',
  }, {
    type: 'textarea',
    name: 'description',
    placeholder: 'Description',
  }],
  [ASSET_TYPES.FOLDER]: [{
    type: 'text',
    name: 'name',
    placeholder: 'Name',
  }],
  [ASSET_TYPES.IMAGE]: [{
    type: 'text',
    name: 'name',
    placeholder: 'Name',
  }],
};

const TYPES_WITH_IMAGE = [ASSET_TYPES.ALBUM, ASSET_TYPES.IMAGE];

const CreateAssetDrawer = ({ onSubmit }) => {
  const handleError = useErrorHandler();
  const childRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  let submitHandler;
  const hasImage = TYPES_WITH_IMAGE.includes(selectedType);

  const onAssetCreate = async (values) => {
    const payload = {
      ...values,
      type: selectedType,
    };

    if (hasImage) {
      try {
        const image = await childRef.current.upload();
        payload.url = image;
      } catch (error) {
        handleError(error, ERROR_MESSAGES.IMAGE_UPLOAD);
        setIsOpen(false);
        return;
      }
    }

    onSubmit(payload);
    setIsOpen(false);
  };

  const onTypeSelect = (type) => {
    setSelectedType(type);
    setIsOpen(true);
  };

  // eslint-disable-next-line react/prop-types
  const createTextField = ({ name, placeholder }) => {
    return (
      <Field
        name={name}
        component="input"
        type="text"
        placeholder={placeholder}
        className="form-control"
      />
    );
  };

  // eslint-disable-next-line react/prop-types
  const createTextarea = ({ name, placeholder }) => {
    return (
      <Field
        name={name}
        component="textarea"
        placeholder={placeholder}
        className="form-control"
        rows={9}
      />
    );
  };

  return (
    <div className="d-flex align-items-center">
      <Dropdown>
        <Dropdown.Toggle variant="success">
          Create
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onTypeSelect(ASSET_TYPES.FOLDER)}>Folder</Dropdown.Item>
          <Dropdown.Item onClick={() => onTypeSelect(ASSET_TYPES.IMAGE)}>Image</Dropdown.Item>
          <Dropdown.Item onClick={() => onTypeSelect(ASSET_TYPES.ALBUM)}>Album</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Drawer open={isOpen} onClose={setIsOpen}>
        <Drawer.Header>
          Create Album
        </Drawer.Header>

        <Drawer.Body>
          <Form
            onSubmit={onAssetCreate}
            render={({ handleSubmit }) => {
              submitHandler = handleSubmit;

              return (
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  {
                    TYPES_CONFIG[selectedType].map(item => (
                      <BootstrapForm.Group key={item.name}>
                        { item.type === 'text' && createTextField(item) }
                        { item.type === 'textarea' && createTextarea(item) }
                      </BootstrapForm.Group>
                    ))
                  }
                  { hasImage && <Dropzone ref={childRef} /> }
                </form>
              );
            }}
          />
        </Drawer.Body>

        <Drawer.Footer>
          <Button
            type="button"
            block
            onClick={(event) => submitHandler(event)}
          >
            Create
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

CreateAssetDrawer.propTypes = {
  onSubmit: func.isRequired,
};

export default CreateAssetDrawer;
