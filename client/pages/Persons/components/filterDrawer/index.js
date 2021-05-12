import React, { useState, useEffect } from 'react';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import BootstrapForm from 'react-bootstrap/Form';
import { Form, Field } from 'react-final-form';
import Drawer from 'shared/components/drawer';
import UsersApi from 'pages/Users/api';
import UserSelect from '../userSelect';

import styles from './index.module.scss';

const STATUSES = {
  NEW:          'New',
  IN_PROGRESS:  'In progress',
  IN_REVIEW:    'In review',
  READY:        'Ready',
  ON_HOLD:      'On Hold',
  PUBLISHED:    'Published',
};

const FilterDrawer = () => {
  let submitHandler;
  const { getQueryParams, toggleQueryParams } = useListDataFetch();

  const [isOpen, setIsOpen] = useState(false);
  const [ authors, setAuthors ] = useState([]);
  const [ reviewers, setReviewers ] = useState([]);

  const selectedStatus = getQueryParams('status', true);
  const selectedAuthors = getQueryParams('authors', true);
  const selectedReviewers = getQueryParams('reviewers', true);

  useEffect(() => {
    UsersApi.getUsers({ role: 'author,reviewer', pagination: false })
      .then(({ data }) => {
        const authors = [];
        const reviewers = [];

        data.users.forEach(({ id, fullName, image, role }) => {
          const miniUser = {
            value: id,
            label: fullName,
            image,
          };

          if (role === 'author') {
            authors.push(miniUser);
          }

          if (role === 'reviewer') {
            reviewers.push(miniUser);
          }
        });

        setAuthors(authors);
        setReviewers(reviewers);
      });
  }, []);

  const onFilterApply = (values) => {
    const { status, authors, reviewers } = values;

    toggleQueryParams({
      status,
      authors: (authors || []).map(({ value }) => value),
      reviewers: (reviewers || []).map(({ value }) => value),
    });

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
            initialValues={{
              status: selectedStatus,
              authors: authors.filter((item) => (selectedAuthors || []).includes(item.value)),
              reviewers: reviewers.filter((item) => (selectedReviewers || []).includes(item.value)),
            }}
            render={({ handleSubmit }) => {
              submitHandler = handleSubmit;

              return (
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  <p>By author</p>
                  <Field
                    name="authors"
                    type="text"
                  >
                    {(props) => (
                      <UserSelect
                        users={authors}
                        onChange={props.input.onChange} // eslint-disable-line react/prop-types
                        defaultValue={props.meta.initial} // eslint-disable-line react/prop-types
                      />
                    )}
                  </Field>

                  <p className="mt-4">By editor</p>
                  <Field
                    name="reviewers"
                    type="text"
                  >
                    {(props) => (
                      <UserSelect
                        users={reviewers}
                        onChange={props.input.onChange} // eslint-disable-line react/prop-types
                        defaultValue={props.meta.initial} // eslint-disable-line react/prop-types
                      />
                    )}
                  </Field>

                  <p className="mt-4">By status</p>
                  <ListGroup>
                    { Object.entries(STATUSES).map(([key, value]) => {
                      return (
                        <div className={styles.listGroupItem}>
                          <ListGroup.Item key={key}>
                            <Field
                              name="status"
                              type="checkbox"
                              value={key}
                            >
                              {props => (
                                <BootstrapForm.Check
                                  {...props.input} // eslint-disable-line react/prop-types
                                  label={value}
                                  id={key}
                                />
                              )}
                            </Field>
                          </ListGroup.Item>
                          <div className={`bg-${key.toLowerCase()}`} />
                        </div>
                      );
                    }) }
                  </ListGroup>
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
