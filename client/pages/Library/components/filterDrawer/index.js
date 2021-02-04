import React, { useState } from 'react';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import BootstrapForm from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Form, Field } from 'react-final-form';
import Drawer from 'shared/components/drawer';
import { ASSET_TYPES } from 'common/constants';

const TYPES = {
  Folders: ASSET_TYPES.FOLDER,
  Albums:  ASSET_TYPES.ALBUM,
  Images:  ASSET_TYPES.IMAGE,
  Audio:   ASSET_TYPES.AUDIO,
  Video:   ASSET_TYPES.VIDEO,
};

const FilterDrawer = () => {
  const { addQueryParams, getQueryParams, removeQueryParam } = useListDataFetch();
  const [isOpen, setIsOpen] = useState(false);

  const creator = getQueryParams('creator');
  const type = getQueryParams('type');
  const selectedTypes = type ? type.split(',') : [];

  let submitHandler;

  const onFilterApply = async (values) => {
    const { type, creator } = values;

    if (type.length) {
      addQueryParams('type', type);
    } else {
      removeQueryParam('type');
    }

    addQueryParams('creator', creator);
    setIsOpen(false);
  };

  return (
    <div className="d-flex align-items-center">
      <div className="d-flex ml-4" onClick={() => setIsOpen(true)}>
        <i className="material-icons mr-2 cur-pointer">filter_list</i> Filter
      </div>

      <Drawer open={isOpen} onClose={setIsOpen}>
        <Drawer.Header>
          Filter
        </Drawer.Header>

        <Drawer.Body>
          <Form
            onSubmit={onFilterApply}
            initialValues={{ type: selectedTypes, creator }}
            render={({ handleSubmit }) => {
              submitHandler = handleSubmit;

              return (
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  <p className="mt-4">By type</p>
                  <ListGroup>
                    { Object.entries(TYPES).map(([text, value]) => {
                      return (
                        <ListGroup.Item key={`types_${value}`}>
                          <Field
                            name="type"
                            type="checkbox"
                            value={value}
                          >
                            {props => (
                              <BootstrapForm.Check
                                {...props.input} // eslint-disable-line react/prop-types
                                label={text}
                                id={`type-${value}`}
                              />
                            )}
                          </Field>
                        </ListGroup.Item>
                      );
                    }) }
                  </ListGroup>

                  <p className="mt-4">By creator</p>
                  <Field
                    name="creator"
                    type="text"
                  >
                    {props => (
                      // eslint-disable-next-line react/prop-types
                      <FormControl {...props.input} size="lg" />
                    )}
                  </Field>
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
            Apply Filter
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
